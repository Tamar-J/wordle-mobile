import { PixelRatio, Text, View } from "react-native"

import styles from './EndScreen.styles'
interface Props {
  number: number
  label: string
}

export function Number({ number, label }: Props) {
  const fontScale = PixelRatio.getFontScale()

  return (
    <View style={{ alignItems: 'center', margin: 8 }}>
      <Text adjustsFontSizeToFit style={[styles.distributionScoreNumber, {fontSize: fontScale > 1 ? 26 : 30 }]}>
        {number}
      </Text>
      <Text adjustsFontSizeToFit style={[styles.distributionScoreLabel, {fontSize: fontScale > 1 ? 14 : 18 }]}>
        {label}
      </Text>
    </View>
  )
}