import React, { Component } from 'react';
import './App.css';

import FriendList from './components/FriendList';
import FriendForm from './components/FriendForm';


import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: {
        name: '',
        age: '',
        email: '',
      },
      lambdaFriends: [], 
      error: ''
      
      
    };
  }

  componentDidMount() {
    console.log('CDM running');
    axios
    .get('http://localhost:5000/friends')
    .then(res => {
      // console.log(res);
      this.setState({ lambdaFriends: res.data });
    })
    .catch(err => {
      // console.log(err);
      this.setState({ error: err });
    });
  };
  
  addAFriend = (e, item) => {
    e.preventDefault();
    // const newFriend = {      
    //   name: newName,
    //   age: newAge,
    //   email: newEmail
    // }
    // this.setState({
    //   lambdaFriends: [...this.state.lambdaFriends, newFriend],      
    //   name: '',
    //   age: '',
    //   email: ''  
    // }); 
    axios
    .post('http://localhost:5000/friends', item)
    .then(res => {
      // console.log(res);
      this.setState({
        lambdaFriends: res.data
      });
      this.props.history.push('/friends');      
    })
    .catch(err => {
      console.log(err);
    })           
} 

deleteName = (e, id) => {
  e.preventDefault();
  axios.delete(`http://localhost:5000/friends/${id}`)
  .then(res => {
    // console.log(res);
    this.setState({
      lambdaFriends: res.data      
    })
    this.props.history.push('/friends')
  })
  .catch(err => {
    console.log(err);
  });
}

setUpdateForm = (e, item) => {
  e.preventDefault();
  this.setState({
    activeItem: item
  });
  this.props.history.push('/form');
};

updateFriend = (e, item) => {
  e.preventDefault();
  axios.put(`http://localhost:5000/friends/${item.id}`, item)
  .then(res => {
    // console.log(res);
    this.setState({
      activeItem: null,
      lambdaFriends: res.data      
    })
    this.props.history.push('/friends')
  })
  .catch(err => {
    console.log(err);
  });
}

  

  render() {
    return (
      <div className="App">
        <NavLink to='/friends'><button className='clickBtn'>Click to See Lambda Friends</button></NavLink>
        <NavLink to='/form'><button className='clickBtn'>Click to add Friend</button></NavLink>

        <Route path='/friends' exact
          render={
            props => <FriendList {...props} 
            friendsArr={this.state.lambdaFriends} 
            deleteName={this.deleteName} 
            setUpdateForm={this.setUpdateForm}/>
           }
        />

        <Route path='/form' exact
         render={
           props => <FriendForm {...props} 
           friendsArr={this.state.lambdaFriends} 
           addAFriend={this.addAFriend} 
           value={this.state.newFriend}
           activeItem={this.state.activeItem}
           /> 
         }
        />
        
      </div>
    );
  }
}

export default App;
