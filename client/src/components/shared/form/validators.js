export const required = value => (value ? undefined : 'This input is required')


export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const minLength8 = minLength(8)