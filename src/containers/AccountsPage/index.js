import React from 'react'
import dispatcher from '../../dispatcher'

import Modal from '../../components/Modal'
import AccountCreationForm from '../../components/AccountCreationForm'

class AccountsPage extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isCreating: false,
    }
    
    this.openAccountCreationModal = this.openAccountCreationModal.bind(this)
    this.closeAccountCreationModal = this.closeAccountCreationModal.bind(this)
    this.createNewAccount = this.createNewAccount.bind(this)
  }

  async createNewAccount(email, password, isAdmin=false) {
    try {
      const success = await dispatcher.accounts.createOne(email, password, isAdmin)
      if (!success)
        return alert('Email already in use')
      
      alert('Success')
      this.closeAccountCreationModal()
    }
    catch(err) {
      alert('Implement proper user feedback')
      console.error(err)
    }
  }
  
  openAccountCreationModal() {
    this.setState({ isCreating: true })
  }
  
  closeAccountCreationModal() {
    this.setState({ isCreating: false })
  }
  
  renderAccountCreationModal() {
    if (!this.state.isCreating) { 
      return
    }
    
    return (
      <Modal
        show={true}
        handleClose={this.closeAccountCreationModal}
        header={'Създай нов акаунт'}
      >
        <AccountCreationForm handleSubmit={this.createNewAccount} />
      </Modal>
    )
  }
    
  render() {
    return (
      <div className="AccountsPage">
      
        {this.renderAccountCreationModal()}
      
        <button onClick={this.openAccountCreationModal}>Създай нов акаунт</button>
      </div>
    )
  }
}

export default AccountsPage