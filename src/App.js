import React from 'react';

import Question from './pages/Question';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      page: 'QUESTION'
    }
  }

  changePage(newPage) {
    this.setState({ page: newPage })
  }

  render() {
    return (
      <div>
        <Question />
      </div>
    );
  }
}

export default App;
