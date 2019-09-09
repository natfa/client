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
          return reject(err)
        })
    })
  }
}

export default SubjectRouteDispatcher
