import React from 'react'
import YouTube from 'react-youtube';
import CommentForm from './CommentForm'
import Comments from './Comments'
class Video extends React.Component {
    constructor(props) {
        super()
        this.state = {
            id: props.location.pathname.replace(`/video/`, ``),
            comment: '',
            name: '',
            comments:[]

        }
    }
    ready = (event) => {
        event.target.pauseVideo()
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, comment, comments } = this.state;
        let newComments = [...comments]
        newComments.push({
            name: name,
            comment: comment
        })

        this.setState({
            comments: newComments
        })
    }
    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleCommentChange = (event) => {
        this.setState({
            comment: event.target.value
        })
    }
    render() {
        const opts = {
            height: `390`,
            width: `640`,
        }
        const { id, comments } = this.state
        return (
            <>
                <YouTube videoId={id}
                    opts={opts}
                    onReady={this.ready} />

                <br></br>
                <CommentForm 
                handleCommentChange = {this.handleCommentChange}
                handleNameChange = {this.handleNameChange}
                handleSubmit = {this.handleSubmit}/>
                <br></br>
                <br></br>
                <Comments comments = {comments}/>
            </>
        )
    }
}
export default Video;