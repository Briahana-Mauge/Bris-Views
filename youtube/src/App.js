import React from 'react';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import About from './Components/About';
import Home from './Components/Home';
import Video from './Components/Video';
// import ErrorNotFound

class App extends React.Component {
  render() {
    return (
      <div className="App">

        <nav>
          Youtube
        <Link to='/'> Home</Link> {' '}
          <Link to='/about'>About</Link>{' '}
          {/* <Link to='/video'>Video</Link> {' '} */}
        </nav>

        <br></br>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/video' component={Video} />
          <Route path='/about' component={About} />
        </Switch>

      </div>
    );
  }
}

export default App;
