var mongoose = require("mongoose");

// Save reference to Schema constructor
var Schema = mongoose.Schema;

// Create a NoteSchema object
var NoteSchema = new Schema({
    // Save note comment
    comment: {
        type: String,
        required: true
    }
})

// Create Note model
var Note = mongoose.model("Note", NoteSchema);

// Export Note model
module.exports = Note;