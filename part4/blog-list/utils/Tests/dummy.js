const lodashCol = require("lodash/collection");
const lodashObj = require("lodash/object");
const lodashMath = require("lodash/math")
const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	if (blogs.length > 0) {
		return blogs.length === 1
			? blogs[0].likes
			: lodashMath.sumBy(blogs, 'likes');
	}
	return 0;
};
const favoriteBlog = (blogs) => {
	let result = lodashCol.orderBy(blogs, ["likes"], ["desc"]);
	return {
		title: result[0].title,
		author: result[0].author,
		likes: result[0].likes,
	};
};
const mostBlogs = (blogs) => {
	return lodashObj.pick(lodashCol.orderBy(blogs, ["blogs"], ["desc"])[0], [
		"author",
		"blogs",
	]);
};
const mostLikes = (blogs) => {
	let result = lodashCol.orderBy(blogs, ["likes"], ["desc"]);
	return lodashObj.pick(result[0], ["author", "likes"]);
};
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
