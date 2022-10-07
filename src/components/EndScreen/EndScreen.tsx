import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import * as Clipboard from 'expo-clipboard'

import { colors, colorsToEmoji } from '../../constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PersistentDataProps } from '../Game/Game'
import Animated, { SlideInLeft } from 'react-native-reanimated'

interface NumberProps {
  number: number
  label: string
}

const Number = ({ number, label }: NumberProps) => {
  return (
    <View style={{ alignItems: 'center', margin: 10 }}>
      <Text style={{ color: colors.lightgrey, fontSize: 30, fontWeight: 'bold' }}>
        {number}
      </Text>
      <Text style={{ color: colors.lightgrey, fontSize: 16 }}>
        {label}
      </Text>
    </View>
  )
}

interface GuessDistributionProps {
  distribution: number[]
}

const GuessDistribution = ({ distribution }: GuessDistributionProps) => {
  if (!distribution) {
    return null
  }
  const sum = distribution.reduce((total, dist) => dist + total, 0)

  return (
    <>
      <Text style={styles.subTitle}>Guess distribution</Text>
      <View style={{ width: '100%', padding: 20 }}>
        {
          distribution.map((dist: number, index: number) => (
            <GuessDistributionLine 
              key={index + 'dist'} 
              position={index + 1} 
              amount={dist} 
              percentage={(100 * dist) / sum}/>
          ))
        }
      </View>
    </>
  )
}

interface GuessDistributionLineProps {
  position: number
  amount: number
  percentage: number
}

const GuessDistributionLine = ({ position, amount, percentage }: GuessDistributionLineProps) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
      <Text style={{ color: colors.lightgrey }}>{position}</Text>
      <View 
        style={{ 
          width: `${percentage}%`,
          minWidth: 20,
          alignSelf: 'stretch',
          backgroundColor: colors.grey, 
          margin: 5, 
          padding: 5,
        }}
      >
        <Text style={{ color: colors.lightgrey }}>{amount}</Text>
      </View>
    </View>
  )
}

interface EndScreenProps {
  won: boolean
  rows: string[][]
  getCellBGColor:  (row: number, col: number) => "#538D4E" | "#B59F3B" | "#3A3A3D" | "#121214"
}

interface DataProps {
  [dayYearKey: string]: PersistentDataProps
}

export default function EndScreen({ won = false, rows, getCellBGColor }: EndScreenProps) {
  const [secondsTillTomorrow, setSecondsTillTomorrow] = useState(0)
  const [played, setPlayed] = useState(0)
  const [winRate, setWinRate] = useState(0)
  const [curStreak, setCurStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [distribution, setDistribution] = useState<number[]>(null)

  const readState = async () => {
    const dataString = await AsyncStorage.getItem('@gameStates')
    let data: DataProps
    try {
      data = JSON.parse(dataString)
    } catch (err) {
      console.log("Couldn't parse the state data")
    }

    const keys = Object.keys(data) //["day-280-2022"]
    const values: PersistentDataProps[] = Object.values(data)

    setPlayed(keys.length)

    const numberOfWins = values.filter(game => game.gameState === 'won').length

    setWinRate(Math.floor((100 * numberOfWins) / keys.length))

    let prevDay = 0
    let _curStreak = 0
    let _maxStreak = 0

    keys.forEach(key => {
      const day = parseInt(key.split('-')[1])

      if (data[key].gameState === 'won' && _curStreak === 0) {
        _curStreak += 1
      } else if (data[key].gameState === 'won' && prevDay + 1 === day) {
        _curStreak += 1
      } else {
        if (_curStreak > _maxStreak) {
          _maxStreak = _curStreak
        }
        _curStreak = data[key].gameState === 'won' ? 1 : 0
      }
      prevDay = day
    })

    setCurStreak(_curStreak)
    setMaxStreak(_maxStreak)

    // guess distribution

    const dist = [0, 0, 0, 0, 0, 0]

    values.map((game) => {
      if (game.gameState === 'won') {
        const tries = game.rows.filter(row => row[0]).length
        
        dist[tries] = dist[tries] + 1
      }
    })
    
    setDistribution(dist)
    
  }

  const share = async () => {
    const textMap = rows.map(
      (row: string[], indexY: number) => 
        row.map((cell: string, indexX: number) => 
          colorsToEmoji[getCellBGColor(indexY, indexX)]
        )
        .join("")
      )
      .filter((row: string) => row)
      .join('\n')
    
    const textToShare =  `WORDLE \n${textMap}`
    await Clipboard.setStringAsync(textToShare)
    Alert.alert('Copied successfully', 'Share your score on social media')
  }

  useEffect(() => {
    readState()
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      )

      setSecondsTillTomorrow((+tomorrow - +now) / 1000)
    }
  
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatSeconds = () => {
    const hours =  Math.floor(secondsTillTomorrow / (60 * 60))
    const minutes = Math.floor((secondsTillTomorrow % (60 * 60)) / 60)
    const seconds = Math.floor(secondsTillTomorrow % 60)
    
    return `${hours}:${minutes}:${seconds}`
  }
  
  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <Animated.Text entering={SlideInLeft.springify().mass(0.5)} style={styles.title}>
        {won ? 'Congratulations!' : 'Meh, try again tomorrow'}
      </Animated.Text>

      <Animated.View entering={SlideInLeft.delay(100).springify().mass(0.5)}>
        <Text style={styles.subTitle}>Statistics</Text>
        <View style={{ flexDirection: 'row', margin: 20 }}>
          <Number number={played} label={"Played"} />
          <Number number={winRate} label={"Win %"} />
          <Number number={curStreak} label={"Cur streak"} />
          <Number number={maxStreak} label={"Max streak"} />
        </View>    
      </Animated.View>

      <Animated.View 
        entering={SlideInLeft.delay(200).springify().mass(0.5)} 
        style={{ width: '100%'}}
      >
        <GuessDistribution distribution={distribution} />

      </Animated.View>

      <Animated.View 
        entering={SlideInLeft.delay(200).springify().mass(0.5)} 
        style={{ flexDirection: 'row', padding: 10 }}
      >
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ color: colors.lightgrey }}>Next Wordle</Text>
          <Text
            style={{ color: colors.lightgrey, fontSize: 24, fontWeight: 'bold' }}
          >
            {formatSeconds()}
          </Text>
        </View>

        <Pressable 
          onPress={share}
          style={{ 
            flex: 1, 
            backgroundColor: colors.primary, 
            borderRadius: 25, 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Text
            style={{ color: colors.lightgrey, fontWeight: 'bold' }}
          >
            Share
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30, 
    color: 'white',
    textAlign: 'center',
    marginVertical: 20
  },
  subTitle: {
    fontSize: 20, 
    color: colors.lightgrey,
    textAlign: 'center',
    marginVertical: 15,
    textTransform: 'uppercase'
  }
})