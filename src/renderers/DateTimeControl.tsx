/* eslint-disable @typescript-eslint/no-unused-vars */
import { withJsonFormsControlProps } from '@jsonforms/react'

import { uiTypeIs } from '@jsonforms/core'

import type { TextFieldProps } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'

import type { JsonFormControlProps } from '@/utils/json-forms/types'

import ReactDatePicker from '@/components/elements/ReactDatePicker'

const DateTimeControl = (args: TextFieldProps) => {
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

  return (
    <ReactDatePicker
      {...uischema}
      id={path}
      selected={data}
      onChange={(date: Date | null) => handleChange(path, date ? new Date(date).toISOString() : null)}
      placeholderText={description}
      customInput={<CustomTextField {...props} error={!!errors} helperText={errors} fullWidth />}
      locale='fr'
    />
  )
}

export default withJsonFormsControlProps(DateTimeControl)

export const dateTimePickerControlTester = uiTypeIs('DateTime')
