import React from 'react';
import axios from 'axios';
import Result from './Result';
// import api from '../secret.js';
import { RECEIVE_USER} from './store/actionTypes';
import { connect } from 'react-redux';

class Search extends React.Component {
    constructor(props) {
        super()
        this.state = {
            search: '',
            loading: true,
            results: [],
        }
        // console.log(props)
    }
    async componentDidMount (props){
        // console.log(this.props.user.username)
        let userInfo = {
            username: this.props.user,
            isUserLoggedIn:this.props.isUserLoggedIn
        }
        if(this.props.user !== undefined){
            await this.props.receiveUser(userInfo)
            console.log('lol')
        }
    } 
    
    handleSubmit = async (event) => {
        event.preventDefault()
        const { search } = this.state;
        let videos = [];
        let newResults = []
        let api = process.env.API_KEY

        let searchAPI = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&order=relevance&key=${api}&q=${search}&type=video`
        try {
            let res = await axios.get(searchAPI)
            videos = res.data.items

            for (let i = 0; i < videos.length; i++) {
                newResults.push({
                    id: `${videos[i].id.videoId}`,
                    title: `${videos[i].snippet.title}`,
                    thumbnail: `${videos[i].snippet.thumbnails.medium.url}`,
                    width: `${videos[i].snippet.thumbnails.medium.width}`,
                    height: `${videos[i].snippet.thumbnails.medium.height}`
                })
            }
            
        } catch (error) {
            console.log(error)
        }
        this.setState({
            results: newResults,
            loading: false
        })
    }
    handleSearchInput = (event) => {
        this.setState({
            search: event.target.value,
            results: [],
            loading: true
        })

    }
    render = () => {
        const { results, loading, search } = this.state
        
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='Search for a video' onChange={this.handleSearchInput} value={search}></input>
                    <input type='submit' value='Search'></input>
                </form>
                {loading ?
                    <p>No Search Results. Search for videos above! </p> :
                    
                    <Result results={results}
                        search={search} 
                        isUserLoggedIn = {this.props.isUserLoggedIn}/>
                        }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        logInState: state.logInState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        receiveUser: (user) => {
            console.log(user)
            dispatch({
                type: RECEIVE_USER,
                payload: user
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);