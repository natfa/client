import config from '../config/default'

import QuestionRouteDispatcher from './QuestionRouteDispatcher'
import SubjectRouteDispatcher from './SubjectRouteDispatcher'

export default {
  questions: new QuestionRouteDispatcher(`${config.api}/api/question`),
  subjects: new SubjectRouteDispatcher(`${config.api}/api/subject`),
}
