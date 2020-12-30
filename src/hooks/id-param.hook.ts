import { useParams } from 'react-router-dom'
import { IDType } from '../interfaces/entities.interfaces'

export function useIDParam() {
  const { id } = useParams<{ id: IDType }>()

  return id
}
