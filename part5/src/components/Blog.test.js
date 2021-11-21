import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
	let component;
	beforeEach(() => {
		component = render(<Blog blog={blog} updateLike={mockHandlerUpdateLikes} />);
	});

	const blog = {
		title: 'Testing React app',
		author: 'yandere',
		url: 'https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16',
		likes: 0,
		user: {
			username: 'initUser',
			name: 'Matti Luukkainen',
			id: '6191b3ef1578d6895372da71',
		},
		id: '6191b80d90c61005b6d4089c',
	};
	const mockHandlerUpdateLikes = jest.fn();
	// const mockHandlerRemove = jest.fn();

	test('Renders blog title and author, but not url and number of likes by default', () => {
		const defaultBlogContent = component.getByTestId('blog-content');
		const defaultHiddenContent = component
			.getByTestId('hidden-content')
			.closest('.Togglable');
		//component.debug();
		expect(component.container).toHaveTextContent(new RegExp(blog.title));
		expect(defaultBlogContent).not.toHaveStyle('display: none');
		expect(defaultBlogContent).toBeVisible();
		expect(defaultHiddenContent).toHaveStyle('display: none');
	}); //5.13
	test('The url and number of likes are shown when the button controlling the shown details has been clicked', () => {
		const button = component.getByText(/View/i);
		const defaultHiddenContent = component
			.getByTestId('hidden-content')
			.closest('.Togglable');
		//component.debug();

		fireEvent.click(button);
		expect(defaultHiddenContent).toBeVisible();
	}); //5.14
	test('If the like button is clicked twice, the event handler the component received as props is called twice', () => {
		const button = component.getByText(/Likes/i);
		fireEvent.click(button);
		fireEvent.click(button);

		expect(mockHandlerUpdateLikes.mock.calls).toHaveLength(2);
	}); //5.15
});
