import { describe, expectTypeOf, it } from 'vitest'
import { curd } from '../../example/curd'
import { ref } from 'vue'
import getFormItem from '../form_controls'
import {
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  MonthPicker,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  Upload,
  WeekPicker,
} from 'ant-design-vue'

describe('Form Controls', () => {
  it('should return correct form control', () => {
    expectTypeOf(getFormItem(curd, ref({}), { type: 'input' }, 'test', 'en')).toMatchTypeOf<typeof Input>()
    expectTypeOf(getFormItem(curd, ref({}), { type: 'cascader' }, 'test', 'en')).toMatchTypeOf<typeof Cascader>()
    expectTypeOf(getFormItem(curd, ref({}), { type: 'cascader' }, 'test', 'en')).toMatchTypeOf<typeof Select>()
    expectTypeOf(getFormItem(curd, ref({}), { type: 'checkbox' }, 'test', 'en')).toMatchTypeOf<typeof Checkbox>()
    expectTypeOf(getFormItem(curd, ref({}), { type: 'date' }, 'test', 'en')).toMatchTypeOf<typeof DatePicker>()
    expectTypeOf(getFormItem(curd, ref({}), { type: 'datetime' }, 'test', 'en')).toMatchTypeOf<typeof DatePicker>()
    expectTypeOf(getFormItem(curd, ref({}), { type: 'month' }, 'test', 'en')).toMatchTypeOf<typeof MonthPicker>()
    expectTypeOf(getFormItem(curd, ref({}), { type: 'week' }, 'test', 'en')).toMatchTypeOf<typeof WeekPicker>()
    expectTypeOf(getFormItem(curd, ref({}), { type: 'time' }, 'test', 'en')).toMatchTypeOf<typeof TimePicker>()
    expectTypeOf(getFormItem(curd, ref({}), { type: 'switch' }, 'test', 'en')).toMatchTypeOf<typeof Switch>()
    expectTypeOf(getFormItem(curd, ref({}), { type: 'rate' }, 'test', 'en')).toMatchTypeOf<typeof Rate>()
    expectTypeOf(getFormItem(curd, ref({}), { type: 'slider' }, 'test', 'en')).toMatchTypeOf<typeof Slider>()
    expectTypeOf(getFormItem(curd, ref({}), { type: 'upload' }, 'test', 'en')).toMatchTypeOf<typeof Upload>()
  })
})
