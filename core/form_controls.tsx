import {
  Upload,
  Transfer,
  TimePicker,
  Switch,
  Checkbox,
  Slider,
  Rate,
  Cascader,
  Radio,
  DatePicker,
  Input,
  InputNumber,
  Select,
} from 'ant-design-vue'
import { JSX } from 'vue/jsx-runtime'
import { FTableColumn, SelectOption } from './types'
import { Ref, ref } from 'vue'
import { get, isArray, set } from 'lodash-es'

export default function getFormItem(
  api: Record<string, (params: Record<string, any>) => Promise<unknown>>,
  formData: Ref<Record<string, any>>,
  form: FTableColumn['form'],
  dataIndex: FTableColumn['dataIndex'],
): JSX.Element | null {
  const selectOptions = ref<SelectOption[]>([])
  function search(query: string, key: string | string[], valueKey?: string) {
    if (isArray(key)) {
      key = key.join('.')
    }

    api.getList({ [key]: query }).then((res: unknown) => {
      selectOptions.value = (res as any).data.map((item: any) => ({ label: item[key], value: item[valueKey ?? key] }) as SelectOption)
    })
  }

  const key = form?.formItem?.name ?? dataIndex
  switch (form?.type) {
    case 'input':
      return <Input value={get(formData.value, key)} onInput={(v: string | number) => set(formData.value, key, v)} {...form?.input} />
    case 'input-number':
      return <InputNumber value={get(formData.value, key)} {...form?.inputNumber} onChange={(v: number) => set(formData.value, key, v)} />
    case 'select':
      return (
        <Select
          value={get(formData.value, key)}
          remote-method={(query: string) => search(query, dataIndex as string, form?.select?.valueKey)}
          {...form?.select}
        />
      )
    case 'cascader':
      return <Cascader value={get(formData.value, key)} {...form?.cascader} />
    case 'checkbox':
      return <Checkbox value={get(formData.value, key)} {...form?.checkbox} />
    case 'radio':
      return <Radio value={get(formData.value, key)} {...form?.radio} />
    case 'date-picker':
      return <DatePicker value={get(formData.value, key)} {...form?.datePicker} />
    case 'time-picker':
      return <TimePicker value={get(formData.value, key)} {...form?.timePicker} />
    case 'switch':
      return <Switch value={get(formData.value, key)} {...form?.switch} />
    case 'slider':
      return <Slider value={get(formData.value, key)} {...form?.slider} />
    case 'rate':
      return <Rate value={get(formData.value, key)} {...form?.rate} />
    case 'transfer':
      return <Transfer value={get(formData.value, key)} {...form?.transfer} />
    case 'upload':
      return <Upload value={get(formData.value, key)} {...form?.upload} />

    default:
      return null
  }
}
