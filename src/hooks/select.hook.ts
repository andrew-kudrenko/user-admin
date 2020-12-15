import { useEffect, useState } from 'react'
import { ID, IDType } from '../interfaces/entities.interfaces'

export function useSelect<T extends object>(observable: Array<ID<T>>) {
  const [selected, setSelected] = useState<Array<IDType>>([])

  function select(id: IDType | Array<IDType>) {
    if (Array.isArray(id)) {
      setSelected([...selected, ...id.filter(s => !selected.includes(s))])
    } else {
      const includes: boolean = selected.includes(id)

      if (!includes) {
        setSelected([...selected, id])
      }
    }
  }

  function unselect(id: IDType | Array<IDType>): void {
    setSelected(
      selected.filter(s => (Array.isArray(id) ? !id.includes(s) : s !== id))
    )
  }

  function includes(id: IDType): boolean {
    return selected.includes(id)
  }

  function allIsSelected(list: Array<IDType>): boolean {
    return list.length === selected.length
  }

  function onToggleAll(list: Array<IDType>): void {
    if (!allIsSelected(list)) {
      select(list)
    } else {
      unselect(list)
    }
  }

  function onToggle(id: IDType): void {
    if (selected.includes(id)) {
      unselect(id)
    } else {
      select(id)
    }
  }

  function unselectAll(): void {
    setSelected([])
  }

  useEffect(() => {
    setSelected(selected.filter(s => observable.find(o => o.id === s)))
  }, [observable])

  return {
    selected,
    includes,
    onToggle,
    allIsSelected,
    onToggleAll,
    unselectAll,
  }
}
