import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/constants'
import Keyboard from './src/components/Keyboard'

const NUMBER_OF_TRIES = 6;

export default function App() {
  const word = "hello"
  const letters = word.split('')

  const rows = new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill("a"))

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.title}>WORDLE</Text>

      <ScrollView style={styles.map}>
        {rows.map(row => (
          <View style={styles.row}>
            {row.map(cell => (
              <View style={styles.cell} > 
                <Text style={styles.cellText}>{cell.toUpperCase()}</Text>
              </View>
            ))}
          </View>

        ))}
      </ScrollView>
      <Keyboard/>
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
