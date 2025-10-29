import { materialRenderers } from '@jsonforms/material-renderers'

import type { Renderer } from '@jsonforms/react'

import TextFieldControl, { textFieldControlTester } from './TextFieldControl'
import DateTimeControl, { dateTimePickerControlTester } from './DateTimeControl'
import SelectControl, { selectControlTester } from './SelectControl'

export default [
  ...materialRenderers,
  { renderer: TextFieldControl, tester: textFieldControlTester },
  { renderer: DateTimeControl, tester: dateTimePickerControlTester },
  { renderer: SelectControl, tester: selectControlTester }
] as Renderer[]
