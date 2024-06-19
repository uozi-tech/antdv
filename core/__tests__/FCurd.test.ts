import FCurd from '../FCurd.vue'
import { curd } from './setup'
import { columns } from './columns'
import { expect, describe, it, expectTypeOf, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { FTableColumn } from '../types'
import { getListResult } from './mock/getList'
import { nextTick } from 'vue'

describe('Test FCurd Render', () => {
  const wrapper = mount(FCurd, { props: { api: curd, columns: columns, scrollX: 2400 } })
  // const state = (wrapper.getCurrentComponent() as unknown as { setupState: SetupState }).setupState
  vi.spyOn(curd, 'getList').mockResolvedValue(getListResult)

  it('should render card properly', () => {
    const title = wrapper.find('.ant-card-head-title').text()
    expect(title).toBe('List')
    const addButtonText = wrapper.find('.ant-card-extra').text()
    expect(addButtonText).toBe('Add')
  })

  it('should render search form properly', () => {
    const labels = ['ID', 'School ID', 'Name', 'Name', 'Date', 'Date Time', 'Month', 'Week', 'Time']
    wrapper.findAll('ant-form-item-label > label').forEach((label, index) => {
      expect(label.text()).toBe(labels[index])
    })
    expect(wrapper.find('form button').text()).toBe('Reset')
  })

  it('should reset serch form value', async () => {
    await wrapper.find('form input').setValue('test')
    await nextTick()
    expect((wrapper.find('form input').element as any)?.value).toBe('test')
    await wrapper.find('form button').trigger('click')
    await nextTick()
    expect((wrapper.find('form input').element as any)?.value).toBe('')
  })

  it('should render table properly', () => {
    const colsTitle = [
      '',
      'ID',
      'School ID',
      'Type',
      'Type',
      'Name',
      'Name',
      'Age',
      'Checkbox',
      'Date',
      'Date Time',
      'Month',
      'Week',
      'Time',
      'Switch',
      'Rate',
      'Slider',
      'FileList',
      'File',
      'Actions',
    ]
    const cols = wrapper.findAll('.ant-table-thead th')
    expect(cols.length).toBe(colsTitle.length)
    cols.forEach((col, index) => {
      expect(col.text()).toBe(colsTitle[index])
    })
  })

  it('should render custom header properly', () => {
    const selector = '.ant-table-thead .ant-table-cell[colstart="5"] span[style="color: red;"]'
    expect(wrapper.find(selector).text()).toBe('Name')
  })

  // it('pagination renders', async () => {
  //   try {
  //     const element = await vi.waitUntil(() => document.body.querySelector('.ant-pagination'), {
  //       timeout: 500, // default is 1000
  //       interval: 20, // default is 50
  //     })
  //     expect(element).toBeTruthy()
  //   } catch (e) {
  //     console.error(e)
  //   }
  // })
})

interface SetupState {
  data: any[]
  selectedRowKeys: (string | number)[]
  lang: 'en' | 'zh-CN'
  searchColumns: FTableColumn[]
  formColumns: FTableColumn[]
  tagMap: Map<string, Map<string | number, Record<string | number, string | number>>>
}

describe('Test FCurd Functions', () => {
  const wrapper = mount(FCurd, { props: { api: curd, columns: columns, scrollX: 2400 } })
  const state = (wrapper.getCurrentComponent() as unknown as { setupState: SetupState }).setupState

  it('should initialize data properly', async () => {
    expectTypeOf(state.data).toBeArray()
    expectTypeOf(state.selectedRowKeys).toBeArray()
    expect(state.lang).toBe('en')
    expect(state.searchColumns.length).toBe(9)
    expect(state.searchColumns).toEqual(columns.filter((item) => item.search))
    expect(state.formColumns.length).toBe(18)

    const typeMap = state.tagMap.get('type')
    expect(typeMap?.get(1)).toBe('pink')
    expect(typeMap?.get(2)).toBe('orange')
    expect(typeMap?.get(3)).toBe('green')
  })
})
