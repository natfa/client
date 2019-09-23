import config from '../config/default'

import QuestionRouteDispatcher from './QuestionRouteDispatcher'
import SubjectRouteDispatcher from './SubjectRouteDispatcher'
import ThemeRouteDispatcher from './ThemeRouteDispatcher'
import SessionRouteDispatcher from './SessionRouteDispatcher'

export default {
  questions: new QuestionRouteDispatcher(`${config.api}/api/question`),
  subjects: new SubjectRouteDispatcher(`${config.api}/api/subject`),
  themes: new ThemeRouteDispatcher(`${config.api}/api/theme`),
  session: new SessionRouteDispatcher(`${config.api}/api/auth`),
}
