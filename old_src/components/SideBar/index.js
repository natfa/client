import React from 'react'

import './styles.css'

import Link from '../../components/common/Link'

const SideBar = props => (
  <div className="SideBar">
    <div>
      <Link href="/">
        <h2>Logo</h2>
      </Link>
    </div>

    {/* [{pathname: ..., name: ...,}] */}
    {props.links.map(link => (
      <div key={link.pathname}>
        <Link href={link.pathname}>{link.name}</Link>
      </div>
    ))}

  </div>
)

export default SideBar
