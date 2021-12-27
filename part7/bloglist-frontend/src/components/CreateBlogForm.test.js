import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import CreateBlogForm from './CreateBlogForm';

describe('<CreateBlogForm />', () => {
	let component;
	let mockHandlerCreateBlog = jest.fn();

	let inputTitle;
	let inputAuthor;
	let inputUrl;
	let form;
	beforeEach(() => {
		component = render(<CreateBlogForm createBlog={mockHandlerCreateBlog} />);
		inputTitle = component.getByTitle('Title');
		inputAuthor = component.getByTitle('Author');
		inputUrl = component.getByTitle('Url');
		form = component.container.querySelector('form');
	});

	const title = 'Testing Create blog form';
	const author = 'CreateBlogForm.test';
	const url = '/src/component/CreateBlogForm.test.js';
	//const likes = 0;

	test('That the form calls the event handler it received as props with the right details when a new blog is created', () => {
		fireEvent.change(inputTitle, {
			target: { value: title },
		});
		fireEvent.change(inputAuthor, {
			target: { value: author },
		});
		fireEvent.change(inputUrl, {
			target: { value: url },
		});
		fireEvent.submit(form);
		console.log(mockHandlerCreateBlog.mock.calls);
		expect(mockHandlerCreateBlog.mock.calls).toHaveLength(1);
		expect(mockHandlerCreateBlog.mock.calls[0][0].title).toBe(title);
		expect(mockHandlerCreateBlog.mock.calls[0][0].author).toBe(author);
		expect(mockHandlerCreateBlog.mock.calls[0][0].url).toBe(url);
	}); //5.16
});
