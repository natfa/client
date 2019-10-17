import React from 'react'
import './styles.css'

class Modal extends React.Component {
  render() {
    const display = this.props.show ? 'block' : 'none'

    return (
      <div className="Modal" style={{display: display }}>
        <div className="content">

          <div className="header">
            <span onClick={this.props.handleClose}>x</span>
            <h2>{this.props.header}</h2>
          </div>

          <div className="body">{this.props.children}</div>

        </div>
      </div>
    )
  }
}

export default Modal
