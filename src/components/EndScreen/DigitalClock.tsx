import React, { useState, useEffect} from 'react'
import { Text, View } from 'react-native'

import { digitalClockReverse } from '../../utils'

import styles from './EndScreen.styles'

export function DigitalClock() {
  const [secondsTillTomorrow, setSecondsTillTomorrow] = useState(0)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      )

      setSecondsTillTomorrow((+tomorrow - +now) / 1000)
    }
  
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <View style={styles.digitalClockContainer}>
      <Text style={styles.text}>Next Wordle</Text>
      <Text style={styles.digitalClockText} >
        {digitalClockReverse(secondsTillTomorrow)}
      </Text>
    </View>
  )
}

