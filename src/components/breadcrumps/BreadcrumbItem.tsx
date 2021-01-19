import React from 'react'
import { Chip } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { BreadcrumpItemProps } from '../../interfaces/components.interfaces'

export const BreadcrumpItem: React.FC<BreadcrumpItemProps> = ({
  to,
  label,
  icon,
}) => <Chip component={NavLink} to={to} label={label} icon={icon} />
