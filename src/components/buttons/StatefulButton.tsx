import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { RunningStatus } from '../../interfaces/common.interfaces'
import { StatefulButtonProps } from '../../interfaces/components.interfaces'

export const StatefulButton: React.FC<StatefulButtonProps> = props => {
  const { onClick, children } = props

  const [status, setStatus] = useState<RunningStatus>(RunningStatus.Idle)

  const delay = 500
  const disabled =
    status === RunningStatus.Pending ||
    status === RunningStatus.Success ||
    status === RunningStatus.Error

  const onClickHandler = async () => {
    try {
      setStatus(RunningStatus.Pending)
      await onClick()
      setStatus(RunningStatus.Success)
    } catch (e) {
      setStatus(RunningStatus.Error)
    } finally {
      setTimeout(setStatus.bind(null, RunningStatus.Idle), delay)
    }
  }

  return (
    <Button
      {...props}
      onClick={onClickHandler}
      disabled={props.disabled || disabled}
    >
      {children}
    </Button>
  )
}
