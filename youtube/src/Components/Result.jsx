import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Video from './Video';

class Result extends React.Component {
    constructor(props) {
        super();
        this.state = {
            results: props.results,
            isUserLoggedIn: props.isUserLoggedIn
        }
        console.log(props.isUserLoggedIn)
    }
    
    renderVideos = () => {
        let { results } = this.state
        return (
            results.map(result => {
                return (

                    <Link to={`/video/${result.id}`} key={result.id}>
                        {
                            <>
                                <div className='singleVid'>
                                    <img
                                        key={result.id}
                                        alt={result.title}
                                        src={result.thumbnail}
                                        width={result.width}
                                        height={result.height}
                                    >
                                    </img>
                                    <h3>{result.title}</h3>
                                </div>
                            </>
                        }
                    </Link>

                )
            })
        )
    }
    singleVideo = () => {
        const { results} = this.state
        // this.props.receiveHistory(results)
        return (
            <>
                <Video id={results} isUserLoggedIn = {this.props.isUserLoggedIn}/>
            </>
        )
    }
    render() {
        return (
            <>
            <div id='results'>
                <Switch>
                    <Route path='/' render={this.renderVideos} />
                    <Route path='/video/:id' render={this.singleVideo} />
                </Switch>
            </div>
            </>
        )
    }
}
export default Result;
