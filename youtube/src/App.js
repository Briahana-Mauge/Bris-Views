// import React from 'react';
// import './App.css';
// import { Link, Route, Switch } from 'react-router-dom';
import About from './Components/About';
import Search from './Components/Search';
// import Home from './Components/Home';
import Video from './Components/Video';
// // import ErrorNotFound

// class App extends React.Component {
//   render() {
//     return (
//       <div className="App">

//         <nav>
          
//         <Link to='/'> Youtube</Link> {' '}
//         <Link to='/search'> Search</Link> {' '}
//         <Link to='/about'>About</Link>{' '}

//         </nav>

//         <br></br>

//         <Switch>
//           <Route exact path='/' component={Home} />
          // <Route path='/search' component={Search} />
          // <Route path='/video' component={Video} />
          // <Route path='/about' component={About} />
//         </Switch>

//       </div>
//     );
//   }
// }

// export default App;

import React from 'react';
import './App.css';
import NavBar from './Components/NavBar'
import { Switch, Route, withRouter } from 'react-router-dom'
import AuthContainer from './Containers/AuthContainer';
import Home from './Components/Home'
// import Users from './Components/Users'
import PrivateRoute from './Components/PrivateRoute'

import axios from 'axios';

class App extends React.Component {
  state = {
    user: null,
    isUserLoggedIn: false,
    loadingUser: true
  }

  setUser = (user) => {
    console.log('setting user to app state')
    this.setState({
      user: user,
      isUserLoggedIn: true, // Since the first thing we do on componentDidMount is to check if the user is logged in in our backend
      loadingUser: false
    })
   
    // this.props.receiveUserStatus(userInfo)
  }

  componentDidMount () {
   this.checkUserLoggedIn()
  }

  checkUserLoggedIn = async () => {
    console.log('Checking if user logged in')
    try {
      let url = 'http://localhost:2591'
      const { data } = await axios.get(`/auth/isUserLoggedIn`, {withCredentials: true})
      this.setUser(data.payload)
      console.log('data',data, 'payload',data.payload)
      // this.props.receiveUserStatus(data.payload)
    } catch (err) {
      // User does not have an active session in the backend. User is logged out so set loadingUser to false.
      if (err.message.includes(401)) {
        this.setState({
          loadingUser: false
        })
      }
    }
  }

  logoutUser = async () => {
    console.log('logging out user')
    try {
      let url = 'http://localhost:2591'
      await axios.post(`/auth/logout`, {withCredentials: true,   headers: {
        'Content-Type': 'application/json',
      }})
      this.setState({
        user: null,
        isUserLoggedIn: false
      })
      this.props.history.push('/') // Redirect user to / (home)
    } catch (err) {
      console.log('ERROR', err)
    }
  }

  renderAuthContainer = (routeProps) => {
    return (
      <AuthContainer
        setUser={this.setUser}
        isUserLoggedIn={this.state.isUserLoggedIn}
        {...routeProps}
      />)
  }

  render() {
    const { isUserLoggedIn, loadingUser, user } = this.state;

    // if (loadingUser) { // If checking if user is authenticated has not completed display a loading animation otherwise render the app
    //   return <div>loading...</div>
    // }

    return (
      <div className="App">
        <NavBar
          logoutUser={this.logoutUser}
          isUserLoggedIn={isUserLoggedIn}
        />
        <Switch>
          <Route path="/login" render={this.renderAuthContainer} />
          <Route path="/signup" render={this.renderAuthContainer} />
          {/* <PrivateRoute path="/users" component={Users} isUserLoggedIn={isUserLoggedIn} /> */}
          <PrivateRoute path="/profile" render={() => <h1> Profile </h1>} isUserLoggedIn={isUserLoggedIn} />
           <Route path='/search' render = {()=><Search user = {user} isUserLoggedIn={isUserLoggedIn}/>} /*component={Search} isUserLoggedIn={isUserLoggedIn}*//>
           <Route path='/video' component={Video} />
           <Route path='/about' component={About} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}



export default withRouter(App);