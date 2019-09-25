import React from 'react'

import './styles.css'

function TestDefinition(props) {
  return (
    <div className="TestDefinition">
      <label id="name-label" htmlFor="name">Име</label>
      <input
        value={props.name}
        onChange={(e) => props.onNameChange(e.target.value)}
        name="name"
        id="name"
        type="text"
        placeholder="Име на теста"
      />

      <label id="start-label" htmlFor="start">Начало</label>
      <input name="start" id="start" type="date" />
      
      <label id="end-label" htmlFor="end">Край</label>
      <input name="end" id="end" type="date" />

      <label id="duration-label" htmlFor="duration">Продължителност</label>
      <input name="duration" id="duration" type="time" />

      <button onClick={props.onProceed} id="proceed">Продължи</button>
    </div>
  )
}

export default TestDefinition