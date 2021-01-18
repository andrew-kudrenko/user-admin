import { useCallback, useState } from 'react'

export type FilteringState<T> = [
  Array<T>,
  (predicate: (value: T) => boolean) => void
]

export function useFilteringState<T>(dependency: Array<T>): FilteringState<T> {
  const [filterable, setFilterable] = useState<Array<T>>(dependency)

  const updateFilterable = useCallback(
    (predicate: (item: T) => boolean) => {
      setFilterable(dependency.filter(predicate))
    },
    [dependency]
  )

  return [filterable, updateFilterable]
}
