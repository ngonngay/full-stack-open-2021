import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
	//const notification = useSelector((state) => state.message);
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
	};
	return <>{notification.message && <div style={style}>{notification.message}</div>}</>;
};

const mapStateToProps = (state) => {
	return {
		notification: state.message,
	};
};
const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
