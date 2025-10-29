/* eslint-disable @typescript-eslint/no-unused-vars */
import { withJsonFormsControlProps } from '@jsonforms/react'

import { uiTypeIs } from '@jsonforms/core'

import type { TextFieldProps } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'
import type { JsonFormControlProps } from '@/utils/json-forms/types'
import TextFieldArabic from '@components/elements/TextFieldArabic'

const TextFieldControl = (args: TextFieldProps) => {
  const {
    data,
    path,
    handleChange,
    errors,
    description,

    enabled,
    visible,
    renderers,
    rootSchema,
    schema,
    uischema,
    cells,
    config,
    i18nKeyPrefix,
    ...props
  } = args as JsonFormControlProps & TextFieldProps

  const textFieldOptions = {
    id: path,
    value: data || '',
    onChange: (event: any) => handleChange(path, event.target.value),
    helperText: errors,
    error: !!errors,
    placeholder: description,
    fullWidth: true,
    ...uischema
  }

  if (uischema.type === 'TextFieldNumber') {
    return (
      <CustomTextField
        {...props}
        {...textFieldOptions}
        type='number'
        onChange={({ target: { value } }: any) => handleChange(path, value ? Number(value) : undefined)}
      />
    )
  } else if (uischema.type === 'TextFieldArea') {
    return <CustomTextField {...props} minRows={3} multiline {...textFieldOptions} />
  } else if (uischema.type === 'TextFieldArabic') {
    return <TextFieldArabic {...props} {...textFieldOptions} handleChange={handleChange} />
  } else {
    return <CustomTextField {...props} {...textFieldOptions} />
  }
}

export default withJsonFormsControlProps(TextFieldControl)

export const textFieldControlTester = uiTypeIs('TextField')
