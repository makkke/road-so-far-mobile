import { Navigator } from 'react-native'

export default {
  default: {
    ...Navigator.SceneConfigs.HorizontalSwipeJump,
    gestures: null,
  },
  modal: {
    ...Navigator.SceneConfigs.FloatFromBottom,
  },
}
