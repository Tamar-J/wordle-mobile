import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'

import { colors, CLEAR, ENTER, NUMBER_OF_TRIES, keysType } from '../../constants'
import Keyboard from '../../components/Keyboard'
import words from '../../words'
import { copyArray, getDayOfTheYear, getDayYearKey } from '../../utils'

import styles from './Game.styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EndScreen from '../EndScreen'
import Animated, { FlipInEasyY, SlideInLeft, ZoomIn } from 'react-native-reanimated'

export interface PersistentDataProps {
  rows: string[][]
  currRow: number
  currCol: number
  gameState: "won" | "lost" | "playing"
}

export default function Game() {
  //AsyncStorage.removeItem('@gameStates')
  const word = words[getDayOfTheYear()]
  const letters = word.split('')

  const [rows, setRows] = useState<string[][]>(
    Array(NUMBER_OF_TRIES).fill("").map(e => Array(letters.length).fill(""))
  )
  const [currRow, setCurrRow] = useState(0)
  const [currCol, setCurrCol] = useState(0)
  const [gameState, setGameState] = useState<'won'|'lost'|'playing'>("playing")
  const [loadedData, setLoadedData] = useState(false)

  const persistState = async () => {
    //write all the state variables in async storage
    const dataForToday: PersistentDataProps = {
      rows,
      currRow,
      currCol,
      gameState
    }

    try {
      const existingStateString = await AsyncStorage.getItem('@gameStates')
      const existingState = existingStateString
        ? JSON.parse(existingStateString)
        : {}
        
      existingState[getDayYearKey()] = dataForToday

      const dataString = JSON.stringify(existingState)
      /* console.log("saving", dataString) */
      await AsyncStorage.setItem('@gameStates', dataString)
    } catch (err) {
      console.log("Failed to persist data to async storage", err)
    }
  }

  const readState = async () => {
    const dataString = await AsyncStorage.getItem('@gameStates')
    try {
      const data = JSON.parse(dataString)
      const day = data[getDayYearKey()]

      setRows(day.rows)
      setCurrCol(day.currCol)
      setCurrRow(day.currRow)
      setGameState(day.gameState)
    } catch (err) {
      console.log("Couldn't parse the state data", err)
      
    }

    setLoadedData(true)
    
  }
  
  const checkGameState = () => {
    if (checkIfWon() && gameState !== "won") {
      setTimeout(() => {
        setGameState("won")
      }, 1200);
    } else if (checkIfLost() && gameState !== "lost") {
      setTimeout(() => {
        setGameState("lost")
      }, 1200);
    }
  }
  const checkIfWon = () => {
    const row = rows[currRow - 1]

    return row.every((letter: string, index) => letter === letters[index])
  }
  const checkIfLost = () => {
    return !checkIfWon() && currRow === rows.length
  }

  const handleKeyPress = (key: keysType) => {
    if (gameState !== "playing") return

    const updateRows = copyArray(rows)

    if (key === CLEAR) {
      const prevColumn = currCol - 1

      if (prevColumn >= 0) {
        updateRows[currRow][prevColumn] = ""

        setRows(updateRows)
        setCurrCol(prevColumn)
      }
      return
    }

    const wordLength = rows[0].length

    if (key === ENTER) {
      const nextRow = currRow + 1
      
      if (currCol === wordLength) {
        setCurrRow(nextRow)
        setCurrCol(0)
      }
      return
    }

    if (currCol < wordLength) {
      const nextCol = currCol + 1

      updateRows[currRow][currCol] = key

      setRows(updateRows)
      setCurrCol(nextCol)
    }
  }

  const isCellActive = (row: number, col: number) => {
    return row === currRow && col === currCol
  }

  const getCellBGColor = (row: number, col: number) => {
    const letter = rows[row][col]
    
    if (row >= currRow) return colors.black //normal
    else if (letter === letters[col]) return colors.primary //right letter and position
    else if (letters.includes(letter)) return colors.secondary //right letter
    return colors.darkgrey //wrong letter
  }

  const getAllLettersWithColor = (color: "#538D4E"|"#B59F3B"|"#3A3A3D") => {
    return rows.flatMap((row, indexY) => row.filter(
      (cell, indexX) => getCellBGColor(indexY, indexX) === color
    ))
  }
  const greenCaps = getAllLettersWithColor(colors.primary)
  const yellowCaps = getAllLettersWithColor(colors.secondary)
  const greyCaps = getAllLettersWithColor(colors.darkgrey)

  const getCellStyle = (indexY: number, indexX: number) => (
    [
      styles.cell,
      { 
        borderColor: isCellActive(indexY, indexX)
        ? colors.grey
        : colors.darkgrey,
        backgroundColor: getCellBGColor(indexY, indexX)
      }
    ]
  )

  useEffect(() => {
    if (currRow > 0) {
      checkGameState()
    }
  }, [currRow])

  useEffect(() => {
    if (loadedData) {
      persistState()
    }
  }, [rows, currRow, currCol, gameState])

  useEffect(() => {
    readState()
  }, [])


  if (!loadedData) {
    return <ActivityIndicator />
  }

  if (gameState !== 'playing') {
    return <EndScreen won={gameState === 'won'} rows={rows} getCellBGColor={getCellBGColor} />
  }

  return (
    <>
      <ScrollView style={styles.map}>
        {rows.map((row, indexY) => (
          <Animated.View entering={SlideInLeft.delay(indexY * 45)} key={`row-${indexY}`} style={styles.row}>
            {row.map((cell, indexX) => (
              <React.Fragment key={`cells-${indexY}-${indexX}`}>
                {indexY < currRow && (
                  <Animated.View
                    entering={FlipInEasyY.delay(indexX * 100)}
                    style={getCellStyle(indexY, indexX)} 
                  > 
                    <Text style={styles.cellText}>{cell.toUpperCase()}</Text>
                  </Animated.View>
                )}
                {indexY === currRow && !!cell && (
                  <Animated.View
                    entering={ZoomIn}
                    style={getCellStyle(indexY, indexX)} 
                  > 
                    <Text style={styles.cellText}>{cell.toUpperCase()}</Text>
                  </Animated.View>
                )}
                {!cell && (
                  <View style={getCellStyle(indexY, indexX)} > 
                    <Text style={styles.cellText}>{cell.toUpperCase()}</Text>
                  </View>
                )}
              </React.Fragment>
            ))}
          </Animated.View>

        ))}
      </ScrollView>
      <Keyboard 
        onKeyPressed={handleKeyPress}
        greyCaps={greyCaps}
        greenCaps={greenCaps}
        yellowCaps={yellowCaps}
      />
    </>

  );
}
