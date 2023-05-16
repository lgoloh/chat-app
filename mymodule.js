function double(num) {
	return num * 2;
}

function square(num) {
	return num * num;
}

function max(x, y) {
	if (x > y) {
		return x;
	}
	return y;
}

module.exports = {
	double,
	square,
	max,
};
