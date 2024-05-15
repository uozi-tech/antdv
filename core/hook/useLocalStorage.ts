import { ref, watchEffect, type Ref } from 'vue'
import { debounce } from 'lodash-es'

export default function useLocalStorage<T>(key: string, defaultValue?: T): Ref<T> {
  const type = typeof defaultValue
  const localCacheValue = getLocalCachedValue()

  function getLocalCachedValue() {
    const value = localStorage.getItem(key)
    if (value) {
      switch (type) {
        case 'string':
          return value
        case 'number':
          return Number(value)
        case 'boolean':
          return value === 'true'
        case 'object':
          return JSON.parse(value)
        default:
          return value
      }
    }
    return defaultValue
  }

  const setLocalCachedValue = debounce((key: string, value: string) => localStorage.setItem(key, value), 400)

  const cachedValue = ref(localCacheValue ?? defaultValue) as Ref<T>
  watchEffect(() => setLocalCachedValue(key, JSON.stringify(cachedValue.value)))

  return cachedValue
}
