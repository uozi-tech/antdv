import { cloneDeep } from 'lodash-es'
import { reactive, ref } from 'vue'
import { i18n } from '../i18n'
import { FCurdProps } from '../types'

export default function useCurd(props: FCurdProps, lang: string) {
  const mode = ref('add')
  const formData = ref({})
  const formVisible = ref(false)
  const data = ref([])

  const pagination = reactive({
    current: 1,
    showSizeChanger: true,
    showQuickJumper: true,
    hideOnSinglePage: true,
    showTotal: (total: number) => `${i18n[lang].total}: ${total} ${i18n[lang].items}`,
    onChange: getList,
    ...props.paginationConfig,
  })

  function getList(params?: Record<string, any>) {
    return props.api.getList({ page: pagination.current, pageSize: pagination?.pageSize ?? 10, ...params }).then((res: any) => {
      data.value = res.data
      const { total } = res.pagination
      pagination.total = total
    })
  }

  function handleRead(row: Record<string, any>) {
    formVisible.value = true
    mode.value = 'read'
    formData.value = cloneDeep(row)
  }

  function handleAdd() {
    formVisible.value = true
    mode.value = 'add'
    formData.value = {}
  }

  function handleEdit(row: Record<string, any>) {
    formVisible.value = true
    mode.value = 'edit'
    formData.value = cloneDeep(row)
  }

  function handleSave() {
    let saveFn = props.api.update

    if (mode.value === 'add') {
      saveFn = props.api.create
    }

    saveFn(formData.value).then(() => {
      getList()
      formVisible.value = false
    })
  }

  return {
    mode,
    data,
    formData,
    formVisible,
    pagination,
    getList,
    handleRead,
    handleAdd,
    handleEdit,
    handleSave,
  }
}
