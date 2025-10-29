/* eslint-disable @typescript-eslint/no-unused-vars */
import { withJsonFormsControlProps } from '@jsonforms/react'

import { uiTypeIs } from '@jsonforms/core'

import type { TextFieldProps } from '@mui/material'

import CustomTextField from '@/@core/components/mui/TextField'
import CustomAutocomplete from '@/@core/components/mui/Autocomplete'
import type { JsonFormControlProps } from '@/utils/json-forms/types'

const SelectControl = (args: TextFieldProps) => {
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
    <CustomAutocomplete
      value={data || null}
      onChange={(_, value) => handleChange(path, value)}
      options={schema.enum || []}
      getOptionLabel={(option: any) => option || ''}
      isOptionEqualToValue={(option, value) => option === value}
      renderInput={params => (
        <CustomTextField
          {...props}
          {...params}
          id={path}
          placeholder={description}
          error={!!errors}
          helperText={errors}
          fullWidth
        />
      )}
    />
  )
}

export default withJsonFormsControlProps(SelectControl)

export const selectControlTester = uiTypeIs('Select')
