import React from 'react';

import './styles.css';

class QuestionList extends React.Component {
  render() {
    const questions = this.props.questions.map((question, i) => {
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

    return (
      <div className="QuestionList">
        {questions}
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
