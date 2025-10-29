export interface JsonFormControlProps {
  data: any
  path: string
  errors: string
  description: string
  enabled: boolean
  visible: boolean
  renderers: object[]
  rootSchema: any
  schema: any
  uischema: any
  cells: object[]
  config: object
  i18nKeyPrefix: string
  handleChange(path: string, value: any): void
}
