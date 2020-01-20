import React from 'react';

const CommentForm = (props) =>{
        return (
            <>
            <h3>Leave A Comment!</h3>
            <form onSubmit = {props.handleSubmit}>
                <input type='text' placeholder='name' onChange = {props.handleNameChange} required/>
                <input type='text' placeholder='comment' onChange = {props.handleCommentChange} required/>
                <input type='submit' value='Submit' />
            </form>
            </>
        )
}

export default CommentForm;