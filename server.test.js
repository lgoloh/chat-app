const mathmod = require("./mymodule");
const request = require("request");
const funcs = require("./server");

test("test double", () => {
	expect(mathmod.double(4)).toBe(8);
});

test("test square", () => {
	expect(mathmod.square(5)).toBe(25);
});

test("test max", () => {
	expect(mathmod.max(4, 2)).toBe(4);
});

test("get messages", (done) => {
	request.get("http://localhost:3000/messages", (err, res) => {
		console.log(res.body);
		expect(res.statusCode).toEqual(200);
		done();
	});
});

test("messages not empty", (done) => {
	request.get("http://localhost:3000/messages", (err, res) => {
		const data = JSON.parse(res.body.length);
		expect(data.length).toBeGreaterThan(0);
		done();
	});
});

/* test("bad word not added to DB", (done) => {
	const msg = { name: "Greg", message: "Fuck" };
	request.post(
		"http://localhost:3000/messages",
		JSON.stringify(msg),
		(err, res) => {
			console.log("Posted new messages");
			funcs.postRequestHandler(err, res);
			done();
		}
	);

	request.get("http://localhost:3000/messages", (err, res) => {
		const data = JSON.parse(res.body.length);
		expect(data.length).toEqual(5);
		done();
	});
}); */
