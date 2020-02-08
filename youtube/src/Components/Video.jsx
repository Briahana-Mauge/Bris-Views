import React from 'react'
import YouTube from 'react-youtube';
import CommentForm from './CommentForm'
import Comments from './Comments'
import { RECEIVE_HISTORY } from './store/actionTypes';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom'
import axios from 'axios';


class Video extends React.Component {
    constructor(props) {
        console.log(props)
        super()
        this.state = {
            id: props.location.pathname.replace(`/video/`, ``),
            comment: '',
            name: '',
            comments: [],

        }
    }
    ready = (event) => {
        event.target.pauseVideo()
    }
    componentDidMount = async()=> {
        const { id } = this.state
        console.log(this.state)
        // this.props.receiveHistory(id)
        let url = `http://localhost:2591/history/`
        
        try{
            // let video = await axios.post(url)
            // console.log(video)
        }catch(err){
            console.log(err)
        }

    }


    handleSubmit = (event) => {
        event.preventDefault();
        const { name, comment, comments } = this.state;
        let newComments = [...comments]
        newComments.unshift({
            name: name,
            comment: comment
        })

        this.setState({
            comments: newComments
        })
    }
    handleInput = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    render() {
        const opts = {
            height: `390`,
            width: `640`,
        }
        const { id, comments, name, comment } = this.state

        return (
            <>
            <Link to ='/'><button>Back</button></Link>
                <YouTube videoId={id}
                    opts={opts}
                    onReady={this.ready} />

                <br></br>
                <CommentForm
                    handleInput={this.handleInput}
                    handleSubmit={this.handleSubmit}
                    name={name}
                    comment={comment} />
                <br></br>
                <br></br>
                <Comments comments={comments} />
            </>
        )
    }
}
//export default Video;
const mapStateToProps = (state) => {
    return {
        historyState: state.historyState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        receiveHistory: (history) => {
            console.log(history)
            dispatch({
                type: RECEIVE_HISTORY,
                payload: history
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)