
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Video from './Video';
class Result extends React.Component {
    constructor(props) {
        super();
        this.state = {
            results: props.ids
        }
    }
    renderVideos = () => {
        let { results } = this.state
        return (

            results.map(result => {
                return (

                    <Link to={`/video/${result.id}`}>
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
        const { results } = this.state
        return (
            <>
                <Video props={results} />
            </>
        )
    }
    render() {
        return (
            <><div id='results'>
                <Switch>
                    <Route exact path='/' render={this.renderVideos} />
                    {/* <Route path='/video/:id' render = {(props) => <Video}/> */}
                    <Route path='/video/:id' component={this.singleVideo} />
                </Switch>
            </div>
            </>
        )
    }
}
export default Result;

