import { Text, View } from "react-native"
import { GuessDistributionLine } from "./GuessDistributionLine"
import styles from './EndScreen.styles'

interface Props {
  distribution: number[]
}

export function GuessDistribution({ distribution }: Props) {
  if (!distribution) {
    return null
  }
  const sum = distribution.reduce((total, dist) => dist + total, 0)

  return (
    <>
      <Text style={styles.subTitle}>Guess distribution</Text>
      <View style={styles.graphicalDistributionContainer}>
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