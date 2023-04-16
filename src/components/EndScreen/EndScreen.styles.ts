import { StyleSheet } from 'react-native'
import { colors } from '../../constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 16,
  },
  title: {
    fontSize: 28, 
    color: 'white',
    textAlign: 'center',
    marginVertical: 20
  },
  subTitle: {
    fontSize: 20, 
    color: colors.lightgrey,
    textAlign: 'center',
    marginVertical: 15,
    textTransform: 'uppercase'
  },
  distributionScore: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row', 
    marginVertical: 18
  },
  distributionScoreNumber: {
    color: colors.lightgrey,
    fontWeight: 'bold'
  },
  distributionScoreLabel: {
    color: colors.lightgrey
  },
  graphicalDistributionWrapper: {
    width: '100%'
  },
  graphicalDistributionContainer: {
    width: '100%', 
    paddingVertical: 20,
    paddingLeft: 16,
    paddingRight: 36

  },
  graphicalDistributionLine: {
    minWidth: 20,
    alignSelf: 'stretch',
    backgroundColor: colors.grey, 
    margin: 8, 
    padding: 4
  },
  graphicalDistributionLineContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    width: '100%'
  },
  digitalClockContainer: {
    flex: 1, 
    alignItems: 'center'
  },
  text: {
    color: colors.lightgrey 
  },
  digitalClockText: {
    color: colors.lightgrey, 
    fontSize: 24, 
    fontWeight: 'bold'
  },
  shareButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: colors.primary, 
    borderRadius: 24, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  shareButtonText: {
    color: colors.lightgrey, 
    fontWeight: 'bold'
  },
  clockAndButtonWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginRight: 16
  },
  confetti: {
    position: 'absolute',
    left: 0,
    top: 0
  }
})