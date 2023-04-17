import { useState, useEffect } from 'react'
import { View, Text, Pressable, Alert, useWindowDimensions, ScrollView } from 'react-native'
import Animated, { SlideInLeft } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LottieView from  "lottie-react-native"
import * as Clipboard from 'expo-clipboard'

import { Number } from './Number'
import { GuessDistribution } from './GuessDistribution'
import { DigitalClock } from './DigitalClock'

import { PersistentDataProps } from '../Game/Game'
import { colorsToEmoji, NUMBER_OF_TRIES } from '../../constants'

import styles from './EndScreen.styles'
interface Props {
  won: boolean
  rows: string[][]
  getCellBGColor:  (row: number, col: number) => "#538D4E" | "#B59F3B" | "#3A3A3D" | "#121214"
}

interface DataProps {
  [dayYearKey: string]: PersistentDataProps
}

export default function EndScreen({ won = false, rows, getCellBGColor }: Props) {
  const [played, setPlayed] = useState(0)
  const [winRate, setWinRate] = useState(0)
  const [curStreak, setCurStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [distribution, setDistribution] = useState<number[]>(null)

  const { height } = useWindowDimensions()

  const readState = async () => {
    const dataString = await AsyncStorage.getItem('@gameStates')
    let data: DataProps
    try {
      data = JSON.parse(dataString)
    } catch (err) {
      //console.log("Couldn't parse the state data")
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

    const dist = Array(NUMBER_OF_TRIES).fill(0) //[0, 0, 0, 0, 0, 0]

    values.map((game) => {
      if (game.gameState === 'won') {
        const tries = game.rows.filter(row => row[0]).length - 1
        
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

    /* prevent crash by multiple requests */
    if (await Clipboard.getStringAsync() !== textToShare) {
      await Clipboard.setStringAsync(textToShare)
    }
    const showText =  await Clipboard.getStringAsync() + '\n\nShare your score on social media'
    Alert.alert('Copied successfully', showText)
  }

  useEffect(() => {
    /* prevent rendering too soon */
    setTimeout(async() => {
      await readState()
    }, 10)
  }, [])
  
  return (
    <>
      {
        won &&
        <LottieView
          autoPlay
          resizeMode='cover'
          loop
          style={[styles.confetti, { height: height + 50 }]}
          source={require('../../assets/confetti.json')}
        />
      }
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.container}>
          <Animated.Text entering={SlideInLeft.springify().mass(0.5)} style={styles.title}>
            {won ? 'Congratulations!' : 'Meh, try again tomorrow'}
          </Animated.Text>

          <Animated.View entering={SlideInLeft.delay(100).springify().mass(0.5)}>
            <Text style={styles.subTitle}>Statistics</Text>
            <View style={styles.distributionScore}>
              <Number number={played} label={"Played"} />
              <Number number={winRate} label={"Win %"} />
              <Number number={curStreak} label={"Cur streak"} />
              <Number number={maxStreak} label={"Max streak"} />
            </View>    
          </Animated.View>

          <Animated.View 
            entering={SlideInLeft.delay(200).springify().mass(0.5)} 
            style={styles.graphicalDistributionWrapper}
          >
            <GuessDistribution distribution={distribution} />

          </Animated.View>

          <Animated.View 
            entering={SlideInLeft.delay(200).springify().mass(0.5)} 
            style={styles.clockAndButtonWrapper}
          >
            <DigitalClock />

            <Pressable onPress={share} style={styles.shareButton} >
              <Text style={styles.shareButtonText} >
                Share
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>

    </>
  )
}
