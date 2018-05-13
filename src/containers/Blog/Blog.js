import React, { Component } from 'react';
// import axios from 'axios';

// Another option to use axios defined
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            selectedPostId: null,
            error: false,
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
                   error: false, 
                });
            })
            .catch((error) => {
                this.setState({ 
                   error: true, 
                });
            });
    }

    postSelectedHandler = (id) => {
        this.setState({
            selectedPostId: id,
        });
    }

    render () {
        let posts;

        if (this.state.error) {
            posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        } else {
            posts = this.state.posts.map((post) => {
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => {this.postSelectedHandler(post.id)}} />;
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;