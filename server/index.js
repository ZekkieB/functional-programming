const express = require("express");
const fs = require("fs");
const cors = require("cors");



const app = express();
app.use(cors());

app.get("/api", (req, res) => {
	fs.readFile('./data/data.json', (err, data) => {
		if(err) throw err;
		res.send(data.toString());
	})
});


app.get("/world", (req, res) => {
	fs.readFile('./data/world.json', (err, data) => {
		if(err) throw err;
		res.send(data.toString());
	})
});



app.listen(4000, () => {

	console.log("RUNNING ON: 4000")
})