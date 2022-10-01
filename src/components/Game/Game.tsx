import { useState, useEffect } from 'react'
import { Text, View, ScrollView, Alert, ActivityIndicator } from 'react-native'
import * as Clipboard from 'expo-clipboard'

import { colors, colorsToEmoji, CLEAR, ENTER, NUMBER_OF_TRIES } from '../../constants'
import Keyboard from '../../components/Keyboard'
import words from '../../words'
import { getDayOfTheYear, getDayYearKey } from '../../utils'

import styles from './Game.styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Game() {
  /* AsyncStorage.removeItem('@gameStates') */
  const word = words[getDayOfTheYear()]
  const letters = word.split('')

  const [rows, setRows] = useState(
    Array(NUMBER_OF_TRIES).fill("").map(e => Array(letters.length).fill(""))
  )

  const [currRow, setCurrRow] = useState(0)
  const [currCol, setCurrCol] = useState(0)
  const [gameState, setGameState] = useState("playing") //won, lost, playing
  const [loadedData, setLoadedData] = useState(false)

  const handleKeyPress = (key) => {
    if (gameState !== "playing") return
    if (key === CLEAR) {
      const prevColumn = currCol - 1

      if (prevColumn >= 0) {
        setRows(prevRows => {  
          prevRows[currRow][prevColumn] = ""
          return prevRows
        })
        setCurrCol(prevColumn)

        //causes rendering bugs if you type too fast:
        //setCurrCol(prevCol => prevCol - 1)
      }
      return
    }

    const wordLength = rows[0].length

    if (key === ENTER) {
      const nextRow = currRow + 1
      const currTry = nextRow
      
      if (currTry <= NUMBER_OF_TRIES && currCol === wordLength) {
        setCurrRow(nextRow) //if with a callback, it may cause rendering bugs
        setCurrCol(0)
      }
      return
    }

    if (currCol < wordLength) {
      const nextCol = currCol + 1

      setRows(prevRows => {  
        prevRows[currRow][currCol] = key
        return prevRows
      })
      setCurrCol(nextCol)

      //causes rendering bugs if you type too fast:
      //setCurrCol(prevCol => prevCol + 1)
    }
  }

  const isCellActive = (row, col) => {
    return row === currRow && col === currCol
  }

  const getCellBGColor = (row, col) => {
    const letter = rows[row][col]
    if (row >= currRow) return colors.black //normal
    else if (letter === letters[col]) return colors.primary //right letter and position
    else if (letters.includes(letter)) return colors.secondary //right letter
    return colors.darkgrey //wrong letter
  }

  const getAllLettersWithColor = (color) => {
    return rows.flatMap((row, indexY) => row.filter(
      (cell, indexX) => getCellBGColor(indexY, indexX) === color
    ))
  }
  const greenCaps = getAllLettersWithColor(colors.primary)
  const yellowCaps = getAllLettersWithColor(colors.secondary)
  const greyCaps = getAllLettersWithColor(colors.darkgrey)

  const shareScore = async () => {
    const textMap = rows
      .map((row, indexY) => 
        row.map((cell, indexX) => 
          colorsToEmoji[getCellBGColor(indexY, indexX)]).join("")
      )
      .filter(e => e).join('\n')
    
    const textToShare =  `WORDLE \n${textMap}`
    await Clipboard.setStringAsync(textToShare)
    Alert.alert('Copied successfully', 'Share your score on social media')
  }

  const checkGameState = () => {
    if (checkIfWon() && gameState !== "won") {
      Alert.alert("Huraay!", "You Won!", [{text: 'Share', onPress: shareScore}])
      setGameState("won")
    } else if (checkIfLost() && gameState !== "lost") {
      Alert.alert("Too bad!", "Try again tomorrow")
      setGameState("lost")
    }
  }
  const checkIfWon = () => {
    const row = rows[currRow - 1]

    return row.every((letter, index) => letter === letters[index])
  }
  const checkIfLost = () => {
    return !checkIfWon() && currRow === rows.length
  }

  const persistState = async () => {
    //write all the state variables in async storage
    const dataForToday = {
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
      /* console.log(dataString) */
      setRows(day.rows)
      setCurrCol(day.currCol)
      setCurrRow(day.currRow)
      setGameState(day.gameState)
    } catch (err) {
      console.log("Couldn't parse the state data", err)
      
    }

    setLoadedData(true)
    
  }

  useEffect(() => {
    readState()
  }, [])

  useEffect(() => {
    if (loadedData) {
      persistState()
    }
  }, [rows, currRow, currCol, gameState])

  useEffect(() => {
    if (currRow > 0) {
      checkGameState()
    }
  }, [currRow])

  if (!loadedData) {
    return <ActivityIndicator />
  }
  return (
    <>
      <ScrollView style={styles.map}>
        {rows.map((row, indexY) => (
          <View key={`row-${indexY}`} style={styles.row}>
            {row.map((cell, indexX) => (
              <View 
                key={`cell-${indexY}-${indexX}`}
                style={[
                  styles.cell,
                  { 
                    borderColor: isCellActive(indexY, indexX)
                    ? colors.grey
                    : colors.darkgrey,
                    backgroundColor: getCellBGColor(indexY, indexX)
                  }
                ]} 
              > 
                <Text style={styles.cellText}>
                {cell.toUpperCase()}</Text>
              </View>
            ))}
          </View>

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
