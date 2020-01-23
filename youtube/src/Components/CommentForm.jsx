import React from 'react';

const CommentForm = (props) =>{
    
        return (
            <>
            <h3>Leave A Comment!</h3>
            <form onSubmit = {props.handleSubmit}>
                <input type='text' name = 'name' placeholder='name' onChange = {props.handleInput} value = {props.name} required/>
                <input type='text' name = 'comment' placeholder='comment' onChange = {props.handleInput} value = {props.comment} required/>
                <input type='submit' value='Submit' />
            </form>
            </>
        )
}

export default CommentForm;