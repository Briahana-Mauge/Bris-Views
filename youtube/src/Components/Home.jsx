import React from 'react';
import axios from 'axios';
import Result from './Result';
import api from '../secret.js'

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            search: '',
            loading: true,
            results: [],
            ids: []
        }
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        const { search } = this.state;
        let videoIDs = [];
        let newId = []

        let searchAPI = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&order=relevance&key=${api}&q=${search}&type=video`
        try {
            let res = await axios.get(searchAPI)
            videoIDs = res.data.items

            for (let i = 0; i < videoIDs.length; i++) {
                newId.push({
                    id: `${videoIDs[i].id.videoId}`,
                    title: `${videoIDs[i].snippet.title}`,
                    thumbnail: `${videoIDs[i].snippet.thumbnails.medium.url}`,
                    width: `${videoIDs[i].snippet.thumbnails.medium.width}`,
                    height: `${videoIDs[i].snippet.thumbnails.medium.height}`
                })
            }
        } catch (error) {
            console.log(error)
        }
        this.setState({
            ids: newId,
            loading: false
        })
    }
    handleSearchInput = (event) => {
        this.setState({
            search: event.target.value,
            ids: [],
            loading: true
        })

    }
    render = () => {
        const { ids, loading, search } = this.state
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='Search for a video' onChange={this.handleSearchInput} value={search}></input>
                    <input type='submit' value='Search'></input>
                </form>
                {loading ?
                    <p>No Search Results. Search for videos above! </p> :
                    <Result ids={ids}
                        search={search} />}




            </>
        )
    }
}

export default Home;