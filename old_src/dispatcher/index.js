import config from '../config/default'

import questionRoute from './QuestionRouteDispatcher'
import subjectRoute from './SubjectRouteDispatcher'
import themeRoute from './ThemeRouteDispatcher'
import sessionRoute from './SessionRouteDispatcher'
import accountRoute from './AccountRouteDispatcher'

export default {
  questions: questionRoute(`${config.api}/api/question`),
  subjects: subjectRoute(`${config.api}/api/subject`),
  themes: themeRoute(`${config.api}/api/theme`),
  session: sessionRoute(`${config.api}/api/auth`),
  accounts: accountRoute(`${config.api}/api/auth`),
}
