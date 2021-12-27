import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import Togglable from './Togglable';
const CreateBlogForm = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const dispatch = useDispatch();
	const blogTogglableRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createBlog({ title, author, url }));
		dispatch(
			setNotification(
				{ message: `The '${title}' was created`, type: 'success' },
				5,
				dispatch,
			),
		);
		setTitle('');
		setAuthor('');
		setUrl('');
		blogTogglableRef.current();
	};
	return (
		<Togglable buttonLabel='Create new blog' ref={blogTogglableRef}>
			<div>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div>
						title
						<input
							type='text'
							value={title}
							name='title'
							title='title'
							onChange={({ target }) => setTitle(target.value)}
							required
						/>
					</div>
					<div>
						author
						<input
							value={author}
							name='author'
							title='author'
							onChange={({ target }) => setAuthor(target.value)}
							required
						/>
					</div>
					<div>
						url
						<input
							value={url}
							name='url'
							title='url'
							onChange={({ target }) => setUrl(target.value)}
							required
						/>
					</div>
					<button type='submit'>Create</button>
				</form>
			</div>
		</Togglable>
	);
};

export default CreateBlogForm;
