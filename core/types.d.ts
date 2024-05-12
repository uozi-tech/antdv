import { ComponentInstance, VNode } from 'vue'
import type { ExtractPublicPropTypes } from 'vue'
import {
  CheckboxProps,
  DatePickerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  RadioProps,
  RateProps,
  SelectProps,
  SliderProps,
  SwitchProps,
  TableColumnType,
  TransferProps,
  UploadProps,
} from 'ant-design-vue'
import { cascaderProps } from 'ant-design-vue/es/cascader'

export interface FTableColumn extends TableColumnType<any> {
  dataIndex: string | string[]
  customHeaderRender?: (data: { column: FTableColumn; title: string }) => VNode | JSX.Element
  search?: boolean
  form?: {
    type:
      | 'input'
      | 'input-number'
      | 'select'
      | 'date-picker'
      | 'time-picker'
      | 'number'
      | 'textarea'
      | 'radio'
      | 'checkbox'
      | 'switch'
      | 'rate'
      | 'slider'
      | 'upload'
      | 'cascader'
      | 'transfer'
      | ((column: FTableColumn<any>) => VNode | JSX.Element)
      | ComponentInstance<any>
    input?: ExtractPublicPropTypes<InputProps>
    inputNumber?: ExtractPublicPropTypes<InputNumberProps>
    select?: ExtractPublicPropTypes<SelectProps> & { valueKey: string }
    cascader?: ExtractPublicPropTypes<typeof cascaderProps>
    colorPicker?: ExtractPublicPropTypes<ColorPickerProps>
    datePicker?: ExtractPublicPropTypes<DatePickerProps>
    radio?: ExtractPublicPropTypes<RadioProps>
    checkbox?: ExtractPublicPropTypes<CheckboxProps>
    rate?: ExtractPublicPropTypes<RateProps>
    slider?: ExtractPublicPropTypes<SliderProps>
    switch?: ExtractPublicPropTypes<SwitchProps>
    timePicker?: ExtractPublicPropTypes<TimePickerDefaultProps>
    transfer?: ExtractPublicPropTypes<TransferProps>
    upload?: ExtractPublicPropTypes<UploadProps>

    formItem?: ExtractPublicPropTypes<FormItemProps> & { name?: string | string[] }
  }
  [key: string]: any
}

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export type FCurdProps = {
  title?: string
  api: Record<string, (params: Record<string, any>) => Promise<unknown>>
  formLabelPosition?: 'left' | 'right' | 'top'
  columns: FTableColumn[]
  tableConfig?: any
  paginationConfig?: any
  modalWidth?: string | number
  disableAdd?: boolean
  disableEdit?: boolean
  disableDelete?: boolean
}

export type FTableHeaderScope = {
  title: string
  column: any
}

export type FTableBodyScope = {
  text: any
  value: any
  record: Record<string, any>
  index: number
  column: any
}
