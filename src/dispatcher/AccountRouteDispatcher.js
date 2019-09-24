class AccountRouteDispatcher {
  constructor(route) {
    this.route = route
  }

  async createOne(email, password, isAdmin) {
    const data = { email, password, isAdmin }

    const response = await fetch(`${this.route}/create`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      console.log(await response.text())
      return false
    }

    return true
  }
}

export default AccountRouteDispatcher