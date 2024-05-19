import FCurd from '../FCurd.vue'
import { curd } from '../../example/curd'
import { columns } from './columns'
import { expect, describe, it } from 'vitest'
import { mount } from '@vue/test-utils'

// interface SetupState {
//   data: any[]
// }

describe('<FCurd />', () => {
  const wrapper = mount(FCurd, { props: { api: curd, columns: columns, scrollX: 2400 } })
  // const state = (wrapper.getCurrentComponent() as unknown as { setupState: SetupState }).setupState

  it('card renders', () => {
    const title = wrapper.find('.ant-card-head-title').text()
    expect(title).toBe('List')
    const addButtonText = wrapper.find('.ant-card-extra').text()
    expect(addButtonText).toBe('Add')
  })

  it('form renders', () => {
    const labels = ['ID', 'School ID', 'Name', 'Name', 'Date', 'Date Time', 'Month', 'Week', 'Time']
    wrapper.findAll('ant-form-item-label > label').forEach((label, index) => {
      expect(label.text()).toBe(labels[index])
    })
    expect(wrapper.find('form > button').text()).toBe('Reset')
  })

  it('table renders', () => {
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

  it('column renders', () => {})

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
