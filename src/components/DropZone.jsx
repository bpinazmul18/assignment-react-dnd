import React from 'react'
import classNames from 'classnames'
import { useDrop } from 'react-dnd'
import { COMPONENT, SIDEBAR_ITEM, ROW, COLUMN } from '../constants'

const ACCEPTS = [SIDEBAR_ITEM, COMPONENT, ROW, COLUMN]

const DropZone = ({ data, onDrop, isLast, className }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ACCEPTS,
    drop: (item, monitor) => {
      onDrop(data, item)
    },
    canDrop: (item, monitor) => {
      const dropZonePath = data.path
      const splitDropZonePath = dropZonePath.split('-')
      const itemPath = item.path

      if (!itemPath) {
        return true
      }

      const splitItemPath = itemPath.split('-')

      const dropZonePathRowIndex = splitDropZonePath[0]
      const itemPathRowIndex = splitItemPath[0]
      const diffRow = dropZonePathRowIndex !== itemPathRowIndex
      if (
        diffRow &&
        splitDropZonePath.length === 2 &&
        data.childrenCount >= 3
      ) {
        return false
      }

      const parentDropInChild = splitItemPath.length < splitDropZonePath.length
      if (parentDropInChild) return false

      if (itemPath === dropZonePath) return false

      if (splitItemPath.length === splitDropZonePath.length) {
        const pathToItem = splitItemPath.slice(0, -1).join('-')
        const currentItemIndex = Number(splitItemPath.slice(-1)[0])

        const pathToDropZone = splitDropZonePath.slice(0, -1).join('-')
        const currentDropZoneIndex = Number(splitDropZonePath.slice(-1)[0])

        if (pathToItem === pathToDropZone) {
          const nextDropZoneIndex = currentItemIndex + 1
          if (nextDropZoneIndex === currentDropZoneIndex) return false
        }
      }

      return true
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

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
