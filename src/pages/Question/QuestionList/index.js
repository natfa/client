import React from 'react';

import './styles.css';

class QuestionList extends React.Component {

  renderQuestionList() {
    return this.props.questions.map((question, i) => {
      return (
        <QuestionListItem
          text={question.text}
          numAnswers={question.incorrectAnswers.length + question.correctAnswers.length}
          points={question.points}
          subject={question.subject}
          media={question.media ? question.media : undefined}
          key={i}
        />
      );
    })
  }

  //TODO: This is the algorithm for parsing the media buffer into an image
  //Use it when drawing the images...
  unusedMethod() {
    const questionsWithMedia = this.props.questions.filter((question) => question.media.length > 0)
    let question
    if (questionsWithMedia[0]) {
      const bufferData = questionsWithMedia[1].media[0].data
      const b64 = btoa(String.fromCharCode.apply(null, bufferData))

      question = <img src={'data:image/jpeg;base64,' + b64} />
    }
    else {
      question = "Loading..."
    }
  }

  render() {

    return (
      <div className="QuestionList">
        {this.renderQuestionList()}
      </div>
    );
  }
}

function QuestionListItem(props) {
  return (
    <div className="QuestionListItem">
      <div className="text">{props.text}</div>
      <div className="info">
        <div className="answers">
          Answers: {props.numAnswers}
        </div>
        <div className="subject">
          Subject: {(props.subject) ? props.subject : 'None'}
        </div>
        <div className="points">
          Points: {props.points}
        </div>
        <div className="media">
          Media: {(props.media) ? props.media.length : 'None'}
        </div>
      </div>
    </div>
  );
}

export default QuestionList;
