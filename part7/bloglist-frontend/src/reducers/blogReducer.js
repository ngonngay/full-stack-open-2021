import { blogService, loginService } from '../services';
const initialState = [];
const cachedUser = {
	name: '',
	access_token: '',
};
function getUser() {
	if (cachedUser.username && cachedUser.access_token) {
		return cachedUser;
	}
	const user = loginService.loadUserData();
	if (user && user.name && user.token) {
		cachedUser.name = user.name;
		cachedUser.access_token = user.token;
	}
	return cachedUser;
}
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INIT_BLOGS':
			return action.payload.blogs.sort((a, b) => -(a.likes - b.likes));
		case 'UPDATE_LIKE':
			if (action.payload.succeed) {
				//console.log(state);
				return state
					.map((blog) => {
						if (blog.id === action.payload.blogUpdated.id) {
							return {
								...blog,
								likes: action.payload.blogUpdated.likes,
							};
						} else {
							return blog;
						}
					})
					.sort((a, b) => -(a.likes - b.likes));
			} else {
				return state;
			}
		case 'DELETE':
			if (action.payload.succeed) {
				return state
					.filter((blog) => blog.id !== action.payload.blogRemoved.id)
					.sort((a, b) => -(a.likes - b.likes));
			} else {
				return state;
			}
		case 'CREATE':
			if (action.payload.succeed) {
				return state
					.concat(action.payload.newBlog)
					.sort((a, b) => -(a.likes - b.likes));
			} else {
				return state;
			}
		case 'ADD_COMMENT':
			let newBlog = action.payload.blog;
			if (action.payload.succeed) {
				return state.map((blog) => (blog.id === newBlog.id ? newBlog : blog));
			}
		default:
			break;
	}
	return state;
};
const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		dispatch({
			type: 'INIT_BLOGS',
			payload: { blogs: blogs },
		});
	};
};
const updateLike = (blog) => {
	console.log(blog);
	return async (dispatch) => {
		if (!blogService.token) {
			const user = getUser();
			blogService.setToken(user.access_token);
		}
		const response = await blogService.update(blog.id, blog);
		dispatch({
			type: 'UPDATE_LIKE',
			payload: {
				blogUpdated: response.result,
				succeed: response.succeed,
			},
		});
	};
};
const deleteBlog = (blog) => {
	return async (dispatch) => {
		if (!blogService.token) {
			const user = getUser();
			blogService.setToken(user.access_token);
		}
		const response = await blogService.deleteBlog(blog.id);
		//console.log(response);
		dispatch({
			type: 'DELETE',
			payload: {
				blogRemoved: blog,
				succeed: response.status === 204,
			},
		});
	};
};
const createBlog = (blog) => {
	return async (dispatch) => {
		if (!blogService.token) {
			const user = getUser();
			blogService.setToken(user.access_token);
		}
		const response = await blogService.create(blog);
		//console.log(response.savedblog);
		dispatch({
			type: 'CREATE',
			payload: {
				newBlog: response.savedblog,
				succeed: response.success,
			},
		});
	};
};
const addComment = (id, comment) => {
	return async (dispatch) => {
		if (!comment) {
			return;
		}
		const response = await blogService.addComment(id, comment);
		console.log(response.blog);
		dispatch({
			type: 'ADD_COMMENT',
			payload: {
				blog: response.blog,
				succeed: response.success,
			},
		});
	};
};
export { initializeBlogs, updateLike, deleteBlog, createBlog, addComment };
export default reducer;
