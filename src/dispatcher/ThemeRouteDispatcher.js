class ThemeRouteDispatcher {
  constructor(route) {
    this.route = route
  }

  getAll() {
    return new Promise((resolve, reject) => {
      fetch(this.route)
        .then((response) => {
          if (!response.ok)
            return resolve({
              success: false,
              data: response,
              message: 'Unknown error',
            })

          return response.json()
        })
        .then((data) => {
          if (!data)
            return

          return resolve({
            success: true,
            data: data,
            message: '',
          })
        })
        .catch((err) => {
          if (err instanceof TypeError)
            return reject({
              success: false,
              message: 'Server not responding',
              data: err,
            })
          else
            return reject({
              success: false,
              message: 'Unknown error',
              data: err,
            })
        })
    })
  }

  getAllBySubject(subject) {
    return new Promise((resolve, reject) => {
      fetch(`${this.route}/${subject}`)
        .then((response) => {
          if (!response.ok)
            return resolve({
              success: false,
              data: response,
              message: 'Unknown error',
            })

          return response.json()
        })
        .then((data) => {
          if (!data)
            return

          return resolve({
            success: true,
            message: '',
            data: data,
          })
        })
        .catch((err) => {
          if (err instanceof TypeError)
            return reject({
              success: false,
              message: 'Server not responding',
              data: err,
            })
          else
            return reject({
              success: false,
              message: 'Unknown error',
              data: err,
            })
        })
    })
  }
}

export default ThemeRouteDispatcher
