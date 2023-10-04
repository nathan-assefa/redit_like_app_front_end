import { UsePost } from '../contexts/PostContext';
import { Link } from 'react-router-dom'

export const PostList = () => {
    const { post } = UsePost();
    return (
        <div>
            {post.map(p => (
                <div key={p.id}>
                    <div><span style={{ color: 'green' }}>Community name</span> {p.community.name}</div>
                    <div><span style={{ color: 'green' }}>Post author</span> {p.author.first_name.toUpperCase()}</div>
                    <div><span style={{ color: 'green' }}>Post title</span> {p.title}</div>
                    <div><span style={{ color: 'green' }}>Post content</span> {p.content}</div>
                    <div><Link to='/comments'><span style={{color: 'green'}}>Comment count</span> {p.comment_count}</Link></div>
                    <div><span style={{color: 'green'}}>Voted count</span> {p.voted_count}</div>
                    <div><span style={{color: 'green'}}>Like count</span> {p.like_count}</div>
                    <div><span style={{color: 'green'}}>Love count</span> {p.love_count}</div>
                    <hr />
                </div>
            ))}
        </div>
    );
};
