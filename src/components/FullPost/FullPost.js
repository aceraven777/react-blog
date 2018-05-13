import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadedPost: null
        };
    }

    componentDidUpdate() {
        // Don't get post if post id is not passed
        if (! this.props.id) {
            return;
        }

        // If the current loaded post is already in the state
        if (this.state.loadedPost && this.state.loadedPost.id === this.props.id) {
            return;
        }

        axios.get('/posts/' + this.props.id)
            .then((response) => {
                this.setState({
                    loadedPost: response.data,
                });
            });
    }

    deletePostHandler = () => {
        if (! this.state.loadedPost) {
            return;
        }

        if (this.state.loadedPost.id !== this.props.id) {
            return;
        }

        axios.delete('/posts/' + this.props.id)
            .then((response) => {
                console.log(response);
            });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }

        if (this.state.loadedPost && this.state.loadedPost.id === this.props.id) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>

            );
        }

        return post;
    }
}

export default FullPost;