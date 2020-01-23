import React from 'react'
import YouTube from 'react-youtube';
import CommentForm from './CommentForm'
import Comments from './Comments'
class Video extends React.Component {
    constructor(props) {
        console.log(props)
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
        newComments.unshift({
            name: name,
            comment: comment
        })

        this.setState({
            comments: newComments
        })
    }
    handleInput = (event) => {
        const{name, value} = event.target
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
                <YouTube videoId={id}
                    opts={opts}
                    onReady={this.ready} />

                <br></br>
                <CommentForm 
                handleInput = {this.handleInput}
                handleSubmit = {this.handleSubmit}
                name = {name}
                comment = {comment}/>
                <br></br>
                <br></br>
                <Comments comments = {comments}/>
            </>
        )
    }
}
export default Video;