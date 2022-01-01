const dummy = (blogs) => {
	return 1;
};
const totalLikes = (blogs) => {
	return blogs.reduce((total, blog) => total + blog.likes, 0);
};
const favoriteBlog = (blogs) => {
	let likes = blogs.map((blog) => blog.likes);
	let result = blogs.find((blog) => blog.likes === Math.max(...likes));
	return { title: result.title, author: result.author, likes: result.likes };
};
const mostBlogs = (blogs) => {
	let mostBloger = [
		{
			author: 'Robert C. Martin',
			blogs: 0,
		},
	];
	let authors = mostBloger.map((blog) => blog.author);
	blogs.forEach((blog) => {
		console.log(
			'!authors.includes(blog.author) : ',
			!authors.includes(blog.author),
			blog.author,
		);
		if (!authors.includes(blog.author)) {
			mostBloger = mostBloger.concat({ author: blog.author, blogs: 1 });
			authors.push(blog.author);
		} else {
			mostBloger.forEach((author) => {
				if (blog.author === author.author) {
					author.blogs += 1;
				}
			});
		}
	});
	return mostBloger.find(
		(author) => author.blogs === Math.max(...mostBloger.map((author) => author.blogs)),
	);
};
const mostLikes = (blogs) => {
	let mostLike = [
		{
			author: 'Robert C. Martin',
			likes: 0,
		},
	];
	let authors = mostLike.map((blogger) => blogger.author);
	blogs.forEach((blog) => {
		if (!authors.includes(blog.author)) {
			mostLike = mostLike.concat({ author: blog.author, likes: blog.likes });
			authors.push(blog.author);
		} else {
			mostLike.forEach((author) => {
				if (blog.author === author.author) {
					author.likes += blog.likes;
				}
			});
		}
	});
	return mostLike.find(
		(author) => author.likes === Math.max(...mostLike.map((author) => author.likes)),
	);
};
module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
