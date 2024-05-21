import { describe, expect, it } from 'vitest'
import useLocalStorage from '../../hook/useLocalStorage'

describe('useLocalStorage', () => {
  it('should react to change', () => {
    const cachedValue = useLocalStorage('test', 'test')
    expect(cachedValue.value).toBe('test')
    cachedValue.value = 'test2'
    expect(cachedValue.value).toBe('test2')
  })
  it.todo('should cache value in local storage')
})
