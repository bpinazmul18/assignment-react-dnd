import shortid from 'shortid'
import { ROW, COLUMN, COMPONENT } from './constants'

export const remove = (arr, index) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // part of the array after the specified index
  ...arr.slice(index + 1),
]

export const insert = (arr, index, newItem) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
]

export const handleAddColumDataToRow = (layout) => {
  const layoutCopy = [...layout]
  const COLUMN_STRUCTURE = {
    type: COLUMN,
    id: shortid.generate(),
    children: [],
  }

  return layoutCopy.map((row) => {
    if (!row.children.length) {
      row.children = [COLUMN_STRUCTURE]
    }
    return row
  })
}

export const addChildToChildren = (children, splitDropZonePath, item) => {
  if (splitDropZonePath.length === 1) {
    const dropZoneIndex = Number(splitDropZonePath[0])
    return insert(children, dropZoneIndex, item)
  }

  const updatedChildren = [...children]

  const curIndex = Number(splitDropZonePath.slice(0, 1))

  // Update the specific node's children
  const splitItemChildrenPath = splitDropZonePath.slice(1)
  const nodeChildren = updatedChildren[curIndex]
  updatedChildren[curIndex] = {
    ...nodeChildren,
    children: addChildToChildren(
      nodeChildren.children,
      splitItemChildrenPath,
      item
    ),
  }

  return updatedChildren
}

export const removeChildFromChildren = (children, splitItemPath) => {
  console.log('check children: ', children)
  console.log('check splitItemPath: ', splitItemPath)

  if (splitItemPath.length === 1) {
    const itemIndex = Number(splitItemPath[0])
    return remove(children, itemIndex)
  }

  const updatedChildren = [...children]
  const curIndex = Number(splitItemPath.slice(0, 1))
  // Update the specific node's children
  const splitItemChildrenPath = splitItemPath.slice(1)
  const nodeChildren = updatedChildren[curIndex]
  updatedChildren[curIndex] = {
    ...nodeChildren,
    children: removeChildFromChildren(
      nodeChildren.children,
      splitItemChildrenPath
    ),
  }
  return updatedChildren
}

export const handleMoveToDifferentParent = (
  layout,
  splitDropZonePath,
  splitItemPath,
  item
) => {
  let newLayoutStructure

  const ROW_STRUCTURE = {
    type: ROW,
    id: shortid.generate(),
  }

  const COLUMN_STRUCTURE = {
    type: COLUMN,
    id: shortid.generate(),
    children: [item],
  }

  switch (splitDropZonePath.length) {
    case 1: {
      // moving column outside into new row made on the fly
      if (item.type === COLUMN) {
        newLayoutStructure = {
          ...ROW_STRUCTURE,
          children: [item],
        }
      } else {
        // moving component outside into new row made on the fly
        newLayoutStructure = {
          ...ROW_STRUCTURE,
          children: [],
        }
      }
      break
    }
    case 2: {
      // moving component outside into a row which creates column
      if (item.type === COMPONENT) {
        newLayoutStructure = COLUMN_STRUCTURE
      } else {
        // moving column into existing row
        newLayoutStructure = item
      }

      break
    }
    default: {
      newLayoutStructure = item
    }
  }

  let updatedLayout = layout
  updatedLayout = removeChildFromChildren(updatedLayout, splitItemPath)
  updatedLayout = handleAddColumDataToRow(updatedLayout)
  console.log('check updateLayout: ', updatedLayout)

  updatedLayout = addChildToChildren(
    updatedLayout,
    splitDropZonePath,
    newLayoutStructure
  )

  return updatedLayout
}
