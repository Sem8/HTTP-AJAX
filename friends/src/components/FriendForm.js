import React, { Component } from 'react'


export default class FriendForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newName: '',
            newAge: '',
            newEmail: '',            
        }               
    }

    handleChanges = e => {        
        this.setState({ [e.target.name]: e.target.value })
    }

    submitFriend = e => {        
        this.setState({newName: '', newAge: '', newEmail: ''});
        this.props.addAFriend(e, this.state.newName, this.state.newAge, this.state.newEmail);
        // window.location.reload();
    }      
    
  render() {
    return (
      <div>
          <form onSubmit={this.submitFriend}>
              <input
                type='text' 
                placeholder='New Lambda Friend'
                value={this.state.newName}
                onChange={this.handleChanges}
                name='newName'
                />
                <input
                type='number' 
                placeholder='New Lambda Friend Age'
                value={this.state.newAge}
                onChange={this.handleChanges}
                name='newAge'
                />
                <input
                type='text' 
                placeholder='New Lambda Friend email'
                value={this.state.newEmail}
                onChange={this.handleChanges}
                name='newEmail'
                />
                <button onClick={this.submitFriend}>Add Friend</button>

                {this.props.friendsArr.map(allFriends => (
                    <div key={allFriends.id} className='eachFriendCard'>
                        <h2>{allFriends.name}</h2>
                        <h3>{allFriends.age}</h3>
                        <p>{allFriends.email}</p>
                    </div>
                    ))}
          </form>        
      </div>
    )
  }
}
