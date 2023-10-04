import { UseComment } from '../contexts/CommentContext'

export const CommentList = () => {
    const { commment } = UseComment();
    return (
      <div>
        {commment.map(c => (
          <div key={c.id}>
            {/* <div>Posted by {c.author.first_name.toUpperCase()}</div> */}
            <div>{c.post.title}</div>
            <div>{c.post.content}</div>
            <div>{c.content}</div>
            <hr />
          </div>
        ))}
      </div>
    )
  }