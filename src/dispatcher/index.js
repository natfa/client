import QuestionRouteDispatcher from './QuestionRouteDispatcher'

class Dispatcher {
  constructor(hostname, port) {
    if (!port)
      this.hostname = `http://${hostname}`
    else
      this.hostname = `http://${hostname}:${port}`

    this.questions = new QuestionRouteDispatcher(this.hostname + '/api/question')
  }
}

export default Dispatcher
