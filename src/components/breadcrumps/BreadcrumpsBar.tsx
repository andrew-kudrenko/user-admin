import React from 'react'
import { Breadcrumbs } from '@material-ui/core'
import { BreadcrumpItemProps } from '../../interfaces/components.interfaces'
import { BreadcrumpItem } from './BreadcrumbItem'

const routesMap: Array<BreadcrumpItemProps> = [
  { to: '/users/', label: 'Users' },
]

export const BreadcrumpsBar: React.FC = () => {
  return (
    <Breadcrumbs>
      {routesMap.map(r => (
        <BreadcrumpItem {...r} />
      ))}
    </Breadcrumbs>
  )
}
