import React, { Component } from 'react';
import axios from '../../../axios';
// import { Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
	constructor(props) {
        super(props);

        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        axios.get('/posts')
            .then((response) => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map((post) => {
                    return {
                        ...post,
                        author: 'Max',
                    };
                });

                this.setState({
                   posts: updatedPosts, 
                   // error: false, 
                });
            })
            .catch((error) => {
                // this.setState({ 
                //    error: true, 
                // });
            });
    }

    postSelectedHandler = (id) => {
        this.props.history.push({
            pathname: '/' + id,
        });
    }

	render() {
		let posts;

        if (this.state.error) {
            posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        } else {
            posts = this.state.posts.map((post) => {
                return (
                	// <Link to={'/' + post.id}>
	                	<Post
                            key={post.id}
		                    title={post.title}
		                    author={post.author}
		                    clicked={() => {this.postSelectedHandler(post.id)}} />
					// </Link>
				);
            });
        }

		return (
			<section className="Posts">
                {posts}
            </section>
		);
	}
}

export default Posts;