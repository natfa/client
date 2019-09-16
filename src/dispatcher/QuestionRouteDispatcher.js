class QuestionRouteDispatcher {
  constructor(route) {
    this.route = route
  }

  getAll() {
    return new Promise((resolve, reject) => {
      fetch(this.route, {
        method: 'GET',
        mode: 'cors',
      })
        .then((response) => {
          if (!response.ok)
            return reject({
              success: false,
              message: 'Unknown error',
              data: response,
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

  getByFilters(subjectid, text) {
    return new Promise((resolve, reject) => {
      if (!subjectid)
        return reject({
          success: false,
          message: 'Filters must be applied',
          data: null,
        })

      let url = this.route + `/filter/${subjectid}`
      if (text)
        url += `/${text}`

      fetch(url, {
        method: 'GET',
        mode: 'cors',
      })
        .then((response) => {
          if (!response.ok)
            return resolve({
              success: false,
              message: 'Unknown error',
              data: response,
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
          return reject({
            success: false,
            message: 'Unknown error',
            data: err,
          })
        })
    })
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      fetch(`${this.route}/${id}`, {
        method: 'GET',
        mode: 'cors',
      })
        .then((response) => {
          if (response.status === 404)
            return resolve({
              success: false,
              message: `Question with id ${id} not found`,
              data: response,
            })

          if (!response.ok)
            return resolve({
              success: false,
              message: 'Unknown error',
              data: response,
            })

          return response.json()
            .then((data) => resolve({
              success: true,
              message: '',
              data: data,
            }))
        })
        .catch((err) => {
          if (err instanceof TypeError)
            return reject({
              success: false,
              message: 'Server not responding',
              data: err,
            })
          return reject({
            success: false,
            message: 'Unknown error',
            data: err,
          })
        })
    })
  }

  createOne(bodyData) {
    return new Promise((resolve, reject) => {
      fetch(this.route, {
        method: 'POST',
        mode: 'cors',
        body: bodyData,
      })
        .then((response) => {
          if (response.status === 400)
            return resolve({
              success: false,
              message: 'Invalid input',
              data: response,
            })

          if (!response.ok)
            return resolve({
              success: false,
              message: 'Unknown error',
              data: response,
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
          return reject({
            success: false,
            message: 'Unknown error',
            data: err,
          })
        })
    })
  }

  deleteById(id) {
    return new Promise((resolve, reject) => {
      fetch(`${this.route}/${id}`, {
        method: 'DELETE',
        mode: 'cors',
      })
        .then((response) => {
          if (!response.ok)
            return resolve({
              success: false,
              message: 'Unknown error',
              data: response,
            })

          return resolve({
            success: true,
            message: '',
            data: true,
          })
        })
        .catch((err) => {
          if (err instanceof TypeError)
            return reject({
              success: false,
              message: 'Server not responding',
              data: err,
            })
          return reject({
            success: false,
            message: 'Unknown error',
            data: err,
          })
        })
    })
  }
}

export default QuestionRouteDispatcher
