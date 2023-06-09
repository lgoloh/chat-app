const express = require("express");
const parser = require("body-parser");
const app = express(); //creates an express application
const routes = express.Router();

/*
 * http is a server that will listen for incoming client requests from the express app
 * io is a server that takes an http server
 */
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");
const { post } = require("request");
const { Message, Link } = require("./models");
const { type } = require("os");

const uri =
	"mongodb+srv://tykki:TiffJess05@learning-node.nbzxthb.mongodb.net/?retryWrites=true&w=majority";

app.use(express.static(__dirname));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

async function addLinks(route) {
	const link = new Link(route);
	link.save().then(() => {
		console.log(`saved new link: ${link}`);
	});
}

app.get("/messages", async (req, res) => {
	const messages = await Message.find({});
	res.send(messages);
});

app.get("/messages/:name", async (req, res) => {
	console.log(`request is ${req.params.name}`);
	const messages = await Message.find({ name: req.params.name });
	res.send(messages);
});

app.get("/links", async (req, res) => {
	const links = await Link.find({});
	res.send(links);
});

async function postRequestHandler(req, res) {
	try {
		console.log(req.body);
		const msg = new Message(req.body);

		const saveddDoc = await msg.save();
		console.log("message saved");

		const doc = await Message.findOne({ message: "Fuck" });
		if (doc) {
			console.log(`deleting message with bad word: ${doc}`);
			await Message.deleteOne({ _id: doc._id });
		} else {
			io.emit("message", req.body);
		}

		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	} finally {
		console.log("Tesing finally");
	}
}

app.post("/messages", postRequestHandler);

/* app.post("/messages", (req, res) => {
	console.log(req.body);
	const msg = new Message(req.body); //create a new document (Model instance) for the message
	msg
		.save() // save the document to the MongoDB. Returns a promise
		.then(() => {
			console.log("message saved");
			return Message.deleteMany({ message: "Fuck" });
		})
		.then((count) => {
			console.log(`Deleted ${count.deletedCount} documents with bad word`);
			io.emit("message", req.body);
			res.sendStatus(200);
		})
		.catch((err) => {
			//error handler
			console.log(`Saving message failed with error ${err}`);
			res.sendStatus(500);
		});
}); */

io.on("connection", (socket) => {
	console.log("a client connected");

	socket.on("greeting", (arg) => {
		console.log(arg);
	});
});

mongoose
	.connect(uri)
	.then(async () => {
		console.log("connected to mongodb");
		const r = {
			name: "messages",
			href: "localhost:3000/messages",
		};
		const l = await Link.findOne({ name: "messages" });
		if (!l) {
			addLinks(r);
		}
	})
	.catch((err) => {
		console.log(`Error connecting to db: ${err}`);
		res.sendStatus(500);
	});

const server = http.listen(3000, () => {
	//creates an express server that can listen for requests from a client
	console.log(`Express server is listening on ${server.address().port}`);
});

module.exports = postRequestHandler;
