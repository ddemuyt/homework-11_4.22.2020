const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json")

const app = express();
const port = process.env.PORT || 8080;

let counter = 0;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.json(db);
});

app.post("/api/notes", (req, res) => {
    req.body.id = counter;
    console.log(__dirname);
    db.push(req.body);
    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(db));
    res.json(db);
    counter++;
});

app.get("/public/assets/css/styles.css", function(req, res) {
    res.sendFile(path.resolve('.')+"/public/assets/css/styles.css");
});

app.get("/public/assets/js/index.js", function(req, res) {
    res.sendFile(path.resolve('.')+"/public/assets/js/index.js");
});

app.delete("/api/notes/:id", (req, res) => {
    db.splice(req.params.id, 1);
    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(db));
    res.json(db);
})

app.listen(port, () => {
    console.log(`Server listening on PORT: ${port}`);
});
