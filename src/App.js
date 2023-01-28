import React from 'react'
import SideBarItem from './components/SideBarITem'
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
        <div className="page">page</div>
        trashdropzone
      </div>
    </div>
  )
}
export default App
