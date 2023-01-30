import React from 'react'
import SideBarItem from './components/SideBarItem'
import { SIDEBAR_ITEMS } from './constants'

const App = () => {
  return (
    <div className="body">
      <div className="sideBar">
        {Object.values(SIDEBAR_ITEMS).map((sideBarItem) => (
          <SideBarItem key={sideBarItem.id} data={sideBarItem} />
        ))}
      </div>

      <div className="pageContainer">
        <div className="page"></div>
      </div>
    </div>
  )
}
export default App
