import { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, CLEAR, ENTER } from './src/constants'
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

  const handleKeyPress = (key) => {
    if (key === CLEAR) {
      const prevColumn = currCol - 1

      if (prevColumn >= 0) {
        setRows(prevRows => {  
          prevRows[currRow][prevColumn] = ""
          return prevRows
        })
        setCurrCol(prevCol => prevCol - 1)
      }
      return
    }

    const wordLength = rows[0].length

    if (key === ENTER) {
      const currTry = currRow + 1

      if (currTry < NUMBER_OF_TRIES && currCol === wordLength) {
        setCurrRow(prevRow => prevRow + 1)
        setCurrCol(0)
      }
      return
    }

    if (currCol < wordLength) {
      setRows(prevRows => {  
        prevRows[currRow][currCol] = key
        return prevRows
      })
      setCurrCol(prevCol => prevCol + 1)
    }
  }

  const isCellActive = (row, col) => {
    return row === currRow && col === currCol
  }

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
                    : colors.darkgrey
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
      <Keyboard onKeyPressed={handleKeyPress}/>
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
    marginTop: 20,
    //height: 100
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
