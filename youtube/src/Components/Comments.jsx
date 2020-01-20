import React from 'react';
const Comments = (props) => {
    const items = props.comments.reverse().map((comment)=> {
        return(
            <>
            <li><strong>{comment.name}</strong>: {comment.comment} </li>
            </>
        )
    })
    return (
        <div>
        {items}
        </div>
    )

}
export default Comments;