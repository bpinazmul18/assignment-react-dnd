import React, { useState, useCallback } from 'react'
import DropZone from './components/DropZone'
import SideBarItem from './components/SideBarItem'
import { handleMoveToDifferentParent } from './helpers'

import { SIDEBAR_ITEMS } from './constants'
import initialData from './initial-data'

const App = () => {
  const initialLayout = initialData.layout
  const initialComponents = initialData.components
  const [layout, setLayout] = useState(initialLayout)
  const [components, setComponents] = useState(initialComponents)

  // HandleDrop
  const handleDrop = useCallback(
    (dropZone, item) => {
      // console.log('dropZone', dropZone)
      // console.log('item', item)

      const splitDropZonePath = dropZone.path.split('-')
      const pathToDropZone = splitDropZonePath.slice(0, -1).join('-')

      const newItem = { id: item.id, type: item.type }

      // const splitItemPath = item.path.split('-')
      // const pathToItem = splitItemPath.slice(0, -1).join('-')

      setLayout(
        handleMoveToDifferentParent(
          layout,
          splitDropZonePath,
          pathToDropZone,
          newItem
        )
      )
    },
    [layout, components]
  )

  return (
    <div className="body">
      <div className="sideBar">
        {SIDEBAR_ITEMS.map((item) => (
          <SideBarItem key={item.id} data={item} />
        ))}
      </div>

      <div className="pageContainer">
        <div className="page">
          {layout.map((row, index) => {
            const currentPath = `${index}`

            return (
              <React.Fragment key={row.id}>
                <DropZone
                  data={{
                    path: currentPath,
                    childrenCount: layout.length,
                  }}
                  onDrop={handleDrop}
                  path={currentPath}
                />
                {/* {renderRow(row, currentPath)} */}
              </React.Fragment>
            )
          })}

          <DropZone
            data={{
              path: `${layout.length}`,
              childrenCount: layout.length,
            }}
            onDrop={handleDrop}
            isLast
          />
        </div>
      </div>
    </div>
  )
}
export default App
