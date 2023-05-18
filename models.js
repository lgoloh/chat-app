const mongoose = require("mongoose");

const Message = mongoose.model("Message", {
	name: String,
	message: String,
});

const Link = mongoose.model("Link", {
	name: String,
	href: String,
});

module.exports = {
	Message,
	Link,
};
