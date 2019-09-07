import React from 'react'
import './styles.css'

function SideBar(props) {
  // page format { name: string, repr: string }
  const pages = props.pages.map((page, i) => {
    return (
      <div key={i} onClick={() => props.handlePageChange(page.name)}>
        {page.repr}
      </div>
    )
  })

  return (
    <div className="SideBar">
      <div><h2>Logo</h2></div>
      {pages}
    </div>
  )
}

export default SideBar
