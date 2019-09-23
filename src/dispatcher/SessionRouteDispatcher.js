class SessionRouteDispatcher {
  constructor(route) {
    this.route = route
  }

  async authenticate(email, password) {
    const data = { email, password }
    
    const response = await fetch(this.route, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok)
      return false
    return true
  }

  async getActiveSession() {
    const response = await fetch(this.route, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    })

    if (!response.ok)
      return null

    const account = await response.json()
    return account
  }
}

export default SessionRouteDispatcher