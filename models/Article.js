var mongoose = require("mongoose");

// Save reference to the Schema constructor
var Schema = mongoose.Schema;

// Create a ArticleSchema object
var ArticleSchema = new Schema({
    // Title is required
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    // Link is required and unique so stories aren't posted multiple times
    link: {
        type: String,
        required: true,
        unique: true
    },

    // Image is required so that a story without an image doesn't break the design
    image: {
        type: String,
        required: true
    },

    // Saved stores whether the article has been saved by a user. The default is false
    saved: {
        type: Boolean,
        default: false
    },

    // Removed stores whether the reader doesn't want to see the article again. The default is false.
    removed: {
        type: Boolean,
        default: false
    },
    
    // Add date so the newest articles appear first.
    date: {
        type: Date, 
        default: Date.now
    },

    // Link to associated notes for the article
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
})

// Create Article model
var Article = mongoose.model("Article", ArticleSchema)

// Export Article model
module.exports = Article;