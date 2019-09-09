class SubjectRouteDispatcher {
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
              data: null,
              message: 'Internal server error',
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
}

export default SubjectRouteDispatcher
