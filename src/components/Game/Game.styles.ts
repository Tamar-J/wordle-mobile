import { StyleSheet } from 'react-native'
import { colors } from '../../constants'

export default StyleSheet.create({
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
})