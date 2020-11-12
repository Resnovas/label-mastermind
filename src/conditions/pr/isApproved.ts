import { PRProps } from '.'

const TYPE = 'isApproved'

export interface ConditionisApproved {
  type: typeof TYPE
  value: boolean
  required?: number
}

const isApproved = (condition: ConditionisApproved, pr: PRProps) => {
  return (
    !pr.pendingReview &&
    pr.approved >= pr.reviews.length &&
    (condition.required ? pr.approved >= condition.required : true)
  )
}

export default [TYPE, isApproved] as const
