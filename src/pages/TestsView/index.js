import React from 'react'

import './styles.css'

import NewTestModal from '../../components/NewTestModal'

class TestsView extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      tests: [
        {
          name: 'First test',
          start: new Date(2018, 11, 15),
          end: new Date(2019, 11, 14),
        },
        {
          name: 'Second test',
          start: new Date(2017, 12, 1),
          end: new Date(2017, 12, 2),
        }
      ],
      showModal: false,
    }

    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  showModal() {
    this.setState({ showModal: true })
  }

  hideModal() {
    this.setState({ showModal: false })
  }

  render () {
    const tests = this.state.tests.map((test, i) => {
      return (
        <tr key={i}>
          <td>{test.name}</td>
          <td>{test.start.toDateString()}</td>
          <td>{test.end.toDateString()}</td>
          <td>{10}</td>
        </tr>
      )
    })

    return (
      <div className="TestsView">
        <NewTestModal show={this.state.showModal} handleClose={this.hideModal} />
        <button onClick={this.showModal}>Compile new test</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Start</th>
              <th>Finish</th>
              <th>Questions</th>
            </tr>
          </thead>
          <tbody>{tests}</tbody>
        </table>
      </div>
    )
  }
}

export default TestsView
