import { merge } from 'lodash'

const mixins = [
  require('./generators').default,
]

export default merge(...mixins)
