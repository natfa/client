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
              message: 'Server not responding'
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
          if (!response.ok)
            return reject(response)

          return response.json()
        })
        .then((data) => {
          if (!data)
            return
          return resolve(data)
        })
        .catch((err) => {
          return reject(err)
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
          if (!response.ok)
            return reject(response)
          return response.json()
        })
        .then((data) => {
          if (!data)
            return
          return resolve(data)
        })
        .catch((err) => {
          return reject(err)
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
            return reject(response)
          return resolve(true)
        })
        .catch((err) => {
          return reject(err)
        })
    })
  }
}

export default QuestionRouteDispatcher
