import { View, Text, Pressable } from "react-native"
import Animated, { SlideInDown } from "react-native-reanimated"
import { keys, ENTER, CLEAR, colors, keysType } from "../../constants"
import styles, { keyWidth } from "./Keyboard.styles"

interface Props {
  onKeyPressed: (key: keysType) => void
  greenCaps: string[]
  yellowCaps: string[]
  greyCaps: string[]
}

const Keyboard = ({
  onKeyPressed = () => {},
  greenCaps = [],
  yellowCaps = [],
  greyCaps = [],
}: Props) => {

  const isLongButton = (key: keysType) => {
    return key === ENTER || key === CLEAR
  }

  const getKeyBGColor = (key: keysType) => {
    if (greenCaps.includes(key)) {
      return colors.primary
    }
    if (yellowCaps.includes(key)) {
      return colors.secondary
    }
    if (greyCaps.includes(key)) {
      return colors.darkgrey
    }
    return colors.grey
  };

  return (
    <Animated.View entering={SlideInDown.springify().mass(0.5)} style={styles.keyboard}>
      {keys.map((keyRow, i) => (
        <View style={styles.row} key={`row-${i}`}>
          {keyRow.map((key) => (
            <Pressable
              onPress={() => onKeyPressed(key)}
              disabled={greyCaps.includes(key)}
              key={key}
              style={[
                styles.key,
                isLongButton(key) ? { width: keyWidth * 1.4 } : {},
                { backgroundColor: getKeyBGColor(key) },
              ]}
            >
              <Text style={styles.keyText}>{key.toUpperCase()}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </Animated.View>
  );
};

export default Keyboard