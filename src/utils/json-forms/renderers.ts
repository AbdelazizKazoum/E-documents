import { materialRenderers } from '@jsonforms/material-renderers'

import type { Renderer } from '@jsonforms/react'

import TextFieldControl, { textFieldControlTester } from '@/utils/json-forms/components/TextFieldControl'
import DateTimeControl, { dateTimePickerControlTester } from '@/utils/json-forms/components/DateTimeControl'
import SelectControl, { selectControlTester } from '@/utils/json-forms/components/SelectControl'

export default [
  ...materialRenderers,
  { renderer: TextFieldControl, tester: textFieldControlTester },
  { renderer: DateTimeControl, tester: dateTimePickerControlTester },
  { renderer: SelectControl, tester: selectControlTester }
] as Renderer[]
