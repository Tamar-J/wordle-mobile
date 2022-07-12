import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/constants'
import Keyboard from './src/components/Keyboard'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Wordle</Text>
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
  }
});
