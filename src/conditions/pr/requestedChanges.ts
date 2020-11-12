import { PRProps } from '.'

const TYPE = 'requestedChanges'

export interface ConditionRequestedChanges {
  type: typeof TYPE
  value: boolean
}

const requestedChanges = (
  condition: ConditionRequestedChanges,
  pr: PRProps
) => {
  return pr.requestedChanges === condition.value
}

export default [TYPE, requestedChanges] as const
