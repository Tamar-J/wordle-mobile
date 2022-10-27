import { Text, View } from "react-native"
import styles from './EndScreen.styles'

interface Props {
  position: number
  amount: number
  percentage: number
}

export function GuessDistributionLine({ position, amount, percentage }: Props) {
  return (
    <View style={styles.graphicalDistributionLineContainer}>
      <Text style={styles.text}>{position}</Text>
      <View style={[styles.graphicalDistributionLine, { width: `${percentage}%` }]} >
        <Text style={styles.text}>{amount}</Text>
      </View>
    </View>
  )
}