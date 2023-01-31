import React from 'react'
import { useDrop } from 'react-dnd'
import classNames from 'classnames'

import { COMPONENT, SIDEBAR_ITEM, ROW, COLUMN } from '../constants'

const ACCEPTS = [COMPONENT, SIDEBAR_ITEM, ROW, COLUMN]

const DropZone = ({ data, onDrop, isLast, className }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ACCEPTS,
    drop: (item, monitor) => {
      onDrop(data, item)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = isOver && canDrop
  return (
    <div
      className={classNames(
        'dropZone',
        { active: isActive, isLast },
        className
      )}
      ref={drop}
    />
  )
}
export default DropZone
