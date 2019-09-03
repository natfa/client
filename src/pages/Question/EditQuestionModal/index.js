import React from 'react'
import config from '../../../config/default'
import Modal from '../../../components/Modal'

class EditQuestionModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: props.questionId,
      text: '',
      subject: '',
      allSubjects: ['Math', 'Programming', 'Examination'],
    }
  }

  componentDidMount() {
    const url = `http://${config.api.hostname}:${config.api.port}/api/question/${this.props.questionId}`
    fetch(url)
      .then((response) => {
        console.log(response)
        if (!response.ok)
          throw new Error('Response NOT ok')

        return response.json()
      })
      .then((data) => {
        const question = data
        this.setState({ text: question.text, subject: question.subject })
      })
      .catch((err) => {
        alert(err)
      })
  }

  render () {

    return (
      <Modal
        show={this.props.show}
        header={this.props.header}
        handleClose={this.props.handleClose}
      >
        <div>
          <h1>PLEASE FINISH THIS!!!</h1>
          <textarea
            value={this.state.text}
          />
          <select>
            {this.state.allSubjects.map((subject) => {
              if (subject === this.state.subject)
                return <option selected>{subject}</option>
              else
                return <option>{subject}</option>
            })}
          </select>
        </div>
      </Modal>
    )
  }
}

export default EditQuestionModal
