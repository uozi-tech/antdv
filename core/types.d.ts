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
  TimePickerProps,
  TransferProps,
  UploadProps,
} from 'ant-design-vue'
import { cascaderProps } from 'ant-design-vue/es/cascader'
import { MonthPickerProps, WeekPickerProps } from 'ant-design-vue/es/date-picker'

export interface FTableColumn extends TableColumnType<any> {
  dataIndex: string | string[]
  customHeaderRender?: (data: { column: FTableColumn; title: string }) => VNode | JSX.Element
  search?: boolean
  form?: {
    type:
      | 'input'
      | 'input-number'
      | 'select'
      | 'date'
      | 'datetime'
      | 'month'
      | 'week'
      | 'time'
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
    select?: ExtractPublicPropTypes<SelectProps> & { valueKey?: string }
    cascader?: ExtractPublicPropTypes<typeof cascaderProps>
    colorPicker?: ExtractPublicPropTypes<ColorPickerProps>
    datePicker?: ExtractPublicPropTypes<DatePickerProps>
    week?: ExtractPublicPropTypes<WeekPickerProps>
    month?: ExtractPublicPropTypes<MonthPickerProps>
    time?: ExtractPublicPropTypes<TimePickerProps>
    radio?: ExtractPublicPropTypes<RadioProps>
    checkbox?: ExtractPublicPropTypes<CheckboxProps>
    rate?: ExtractPublicPropTypes<RateProps>
    slider?: ExtractPublicPropTypes<SliderProps>
    switch?: ExtractPublicPropTypes<SwitchProps>
    transfer?: ExtractPublicPropTypes<TransferProps>
    upload?: ExtractPublicPropTypes<UploadProps>

    formItem?: ExtractPublicPropTypes<FormItemProps> & { name?: string | string[] }
  }
  tags?: (string | number)[] | Record<string | number, string>
  customRender?: (data: CustomRenderOptions) => VNode | JSX.Element
  hiddenInTable?: boolean
  hiddenInEdit?: boolean
  hiddenInAdd?: boolean
  hiddenInDetail?: boolean
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
  scrollX?: number | string
  scrollY?: number | string
  modalWidth?: string | number
  disableSearch?: boolean
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

export type CustomRenderOptions = {
  column: FTableColumn
  record: Record<string, any>
  text: any
  value?: any
  index?: number
  renderIndex?: number
}
