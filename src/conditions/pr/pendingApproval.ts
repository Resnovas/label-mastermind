import { PRProps } from '.'
import { log } from '..'

const TYPE = 'pendingApproval'

export interface ConditionPendingApproval {
  type: typeof TYPE
  value: boolean
}

const pendingApproval = (condition: ConditionPendingApproval, pr: PRProps) => {
  return pr.pendingApproval === condition.value
}

export default [TYPE, pendingApproval] as const
