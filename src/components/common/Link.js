import React from 'react'

import router from '../../utils/router'

const Link = props => {
  const onClick = e => {
    e.preventDefault()
    router.push(props.href)
  }

  return (
    <a href={props.href} onClick={onClick}>
      {props.children}
    </a>
  )
}

export default Link