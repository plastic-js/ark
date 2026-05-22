import { Field } from '../index.js'

export const ComponentUnderTest = (props) => (
  <Field.Root {...props}>
    <Field.Label>Email</Field.Label>
    <Field.Input type="email" />
    <Field.Item />
    <Field.HelperText>We only use this for receipts</Field.HelperText>
    <Field.ErrorText>Email is required</Field.ErrorText>
    <Field.RequiredIndicator>*</Field.RequiredIndicator>
  </Field.Root>
)
