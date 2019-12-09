import { Dimensions } from 'react-native'
import { COLORS, SPACING } from './styles'

const { height, width } = Dimensions.get('screen')
const DEVICE = Object.freeze({
   height,
   width,
})

export { COLORS, SPACING, DEVICE }
