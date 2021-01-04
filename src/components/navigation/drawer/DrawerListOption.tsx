import React from 'react'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { DrawerListOptionProps } from '../../../interfaces/components.interfaces'

export const DrawerListOption: React.FC<DrawerListOptionProps> = props => {
  const { label, to, icon } = props

  return (
    <ListItem button key={label} component={NavLink} to={to}>
      <Tooltip title={label}>
        <ListItemIcon>{icon}</ListItemIcon>
      </Tooltip>
      <ListItemText primary={label} />
    </ListItem>
  )
}
