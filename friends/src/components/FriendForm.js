import React, { Component } from 'react'


export default class FriendForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.activeItem || {
                name: '',
                age: '',
                email: '',
            }
            // item: {
            //     name: '',
            //     age: '',
            //     email: '',
            // }                        
        }               
    }

    componentDidUpdate(prevProps) {
        if(
            this.props.activeItem &&
            prevProps.activeItem !== this.props.activeItem
        ) {
            this.setState({
                item: this.props.activeItem
            })
        }
    }

    handleChanges = ev => {
        ev.persist();
        let value = ev.target.value;
        if(ev.target.name === 'price') {
            value = parseInt(value, 10);
        }        
        this.setState(prevState => ({ 
            item: {
                ...prevState.item,
                [ev.target.name]: value
            }
           }));
    };

    // submitFriend = e => { 
    //     this.props.addAFriend(e, this.state.item);       
    //     this.setState({
    //         item: {
    //             name: '', 
    //             age: '', 
    //             email: ''
    //         }
    //     });
    // }
    
    handleSubmit = e => {
        if (this.props.activeItem) {
            this.props.updateFriend(e, this.state.item)
        } else {
            this.props.addAFriend(e, this.state.item); 
        }              
        this.setState({
            item: {
                name: '', 
                age: '', 
                email: ''
            }
        });
    }
    
  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
          <h2>{`${this.props.activeItem ? 'Update' : 'Add new'} Friend`}</h2>
              <input
                type='text' 
                placeholder='New Lambda Friend'
                value={this.state.item.name}
                onChange={this.handleChanges}
                name='name'
                />
                <input
                type='number' 
                placeholder='New Lambda Friend Age'
                value={this.state.item.age}
                onChange={this.handleChanges}
                name='age'
                />
                <input
                type='text' 
                placeholder='New Lambda Friend email'
                value={this.state.item.email}
                onChange={this.handleChanges}
                name='email'
                />
                <button onClick={this.submitFriend}>{`${this.props.activeItem ? 'Update' : 'Add new'} Friend`}</button>

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
