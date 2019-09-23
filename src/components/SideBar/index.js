import React from 'react'
import './styles.css'

function SideBar(props) {
  const pages = props.pages.map((page) => {
    return (<div key={page.id} onClick={() => props.handlePageChange(page.id)}>
      {page.repr}
    </div>)
  })

  return (
    <div className="SideBar">
      <div><h2>Logo</h2></div>
      {pages}
    </div>
  )
}

export default SideBar
