import { PRProps } from '.'
import { utils } from '../../utils'

const TYPE = 'changesSize'

export interface ConditionChangesSize {
  type: typeof TYPE
  min: number
  max: number
}

const changesSize = (condition: ConditionChangesSize, pr: PRProps) => {
  if (condition.min <= pr.changes) {
    if (condition.max > pr.changes || !condition.max) return true
  }
  return false
}

export default [TYPE, changesSize] as const
