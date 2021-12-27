import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
	const padding = {
		paddingRight: 5,
	};
	return (
		<div>
			<div>
				<Link to={`/`} style={padding}>
					Blogs
				</Link>
				<Link to={`/users`} style={padding}>
					Users View
				</Link>
			</div>
		</div>
	);
};

export default Nav;
