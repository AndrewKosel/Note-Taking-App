var express = require("express");
var path = require("path");
var fs = require("fs");
var jsonNoteData = require("./db/db.json");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT ||3000;
const{ v4: uuidv4 } = require("uuid");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname+"/public"));



// var notes = [];


// Routes
// =============================================================

// Basic routes that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Displays Notes
app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});


// Create the app.Post function for the note taker
app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  var notesId = uuidv4();
  newNote.id = notesId
  jsonNoteData.push(newNote);

fs.writeFile("./db/db.json", JSON.stringify(jsonNoteData), function(err){
  if (err) throw err;
  res.json("Success")
});

});

// Create the app.delete to get rid of notes
app.delete("/api/notes/:id", function(req,res) {
  var jsonId = req.params.id
  
  for (var i = 0; i < jsonNoteData.length; i++) {
      if (jsonNoteData[i].id === jsonId) {
        jsonNoteData.splice(i,1);
      }
  }
  fs.writeFile("./db/db.json", JSON.stringify(jsonNoteData), function(err) {
      if (err) throw err;
      res.json("Success")
  })
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log(`App listening on PORT http://localhost:${PORT}`);
});