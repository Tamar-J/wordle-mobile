import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, colorsToEmoji, CLEAR, ENTER } from './src/constants'
import * as Clipboard from 'expo-clipboard'
import Keyboard from './src/components/Keyboard'

const NUMBER_OF_TRIES = 6;

export default function App() {
  const word = "hello"
  const letters = word.split('')

  const [rows, setRows] = useState(
    Array(NUMBER_OF_TRIES).fill("").map(e => Array(letters.length).fill(""))
  )

  const [currRow, setCurrRow] = useState(0)
  const [currCol, setCurrCol] = useState(0)
  const [gameState, setGameState] = useState("playing") //won, lost, playing

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

  const shareScore= () => {
    const textMap = rows
      .map((row, indexY) => 
        row.map((cell, indexX) => 
          colorsToEmoji[getCellBGColor(indexY, indexX)]).join("")
      )
      .filter(e => e).join('\n')
    
    const textToShare =  `WORDLE \n${textMap}`
    Clipboard.setStringAsync(textToShare)
    Alert.alert('Copied successfully', 'Share your score on social media')
  }

  const checkGameState = () => {
    if (checkIfWon()) {
      Alert.alert("Huraay!", "You Won!", [{text: 'Share', onPress: shareScore}])
      setGameState("won")
    } else if (checkIfLost()) {
      Alert.alert("Too bad!", "Try again tomorrow")
      setGameState("lost")
    }
  }
  const checkIfWon = () => {
    const row = rows[currRow - 1]

    return row.every((letter, index) => letter === letters[index])
  }
  const checkIfLost = () => {
    return currRow === rows.length
  }

  useEffect(() => {
    if (currRow > 0) {
      checkGameState()
    }
  }, [currRow])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.title}>WORDLE</Text>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
  },
  title: {
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 7
  },
  map: {
    alignSelf: 'stretch',
    marginTop: 20
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cell: {
    borderWidth: 3,
    borderColor: colors.darkgrey,
    maxWidth: 70,
    flex: 1,
    aspectRatio: 1,
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cellText: {
    color: colors.lightgrey,
    fontWeight: 'bold',
    fontSize: 28
  }
});
