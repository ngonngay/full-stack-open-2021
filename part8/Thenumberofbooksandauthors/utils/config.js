require('dotenv').config();

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;
module.exports = {
	MONGODB_URI,
	PORT,
	JWT_SECRET,
};
