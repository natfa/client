import React from 'react'

import QuestionPage from './pages/Question'
import TestsView from './pages/TestsView'
import TestEdit from './pages/TestEdit'

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      page: 'TESTS_VIEW',
    }

    this.handleFilesInput = this.handleFilesInput.bind(this);
  }

  changePage(newPage) {
    this.setState({ page: newPage })
  }

  handleFilesInput(fileList) {
    const input = document.getElementById('the-file-input');
    const selectedFile = input.files[0];

    fetch('http://localhost:3001/api/', {
      method: 'POST',
      data: selectedFile,
    }).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data);
    })
  }

  render() {
    let page;

    switch (this.state.page) {
      case 'QUESTION':
        page = <QuestionPage />
        break;
      case 'TESTS_VIEW':
        page = <TestsView />
        break;
      case 'TEST_EDIT':
        page = <TestEdit />
        break;
      default:
        page = <h1>Loading...</h1>
    }

    return (
      <div>
        {page}
      </div>
    );
  }
}

export default App;
