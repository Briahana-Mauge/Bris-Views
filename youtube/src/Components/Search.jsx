import React from 'react';
import axios from 'axios';
import Result from './Result';
import api from '../secret.js'

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            search: '',
            loading: true,
            results: [],
        }
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        const { search } = this.state;
        let videos = [];
        let newResults = []

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
                        search={search} />
                        }
            </>
        )
    }
}

export default Search;