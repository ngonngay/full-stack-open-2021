import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
	const message = useSelector((state) => state.message);
	return (
		<div>
			<div className={message.type}>{message.message}</div>
		</div>
	);
};

export default Notification;
