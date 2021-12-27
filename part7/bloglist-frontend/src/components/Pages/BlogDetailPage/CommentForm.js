import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { addComment } from '../../../reducers/blogReducer';
import { useDispatch } from 'react-redux';

const CommentForm = (props) => {
	const [comment, setComment] = useState('');
	const { blogStyle, comments, id } = props;
	const dispatch = useDispatch();

	const submitPrevent = async (e) => {
		e.preventDefault();

		let newComment = {
			comment,
		};
		await dispatch(addComment(id, newComment));
		setComment('');
	};
	return (
		<div style={blogStyle}>
			<div>
				<strong> Comments</strong>
			</div>
			<br />
			<form onSubmit={(e) => submitPrevent(e)}>
				<input
					type='text'
					value={comment}
					placeholder='Add your comment.....'
					onChange={(e) => setComment(e.target.value)}
				/>
				<button type='submit'>Add</button>
			</form>
			<ul>
				{comments.length > 0 ? (
					comments.map((comment) => <li key={nanoid()}>{comment}</li>)
				) : (
					<div>No comment for this blog</div>
				)}
			</ul>
		</div>
	);
};

export default CommentForm;
