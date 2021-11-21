import React from 'react';

const Notification = ({ message }) => {
	//console.log(message);
	if (!message) {
		return <div></div>;
	}
	return (
		<div>
			<div className={message.type}>{message.message}</div>
		</div>
	);
};

export default Notification;
