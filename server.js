// Require npm packages
var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes.js")(app);

// Database 

// Connect to Mongoose database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// Set up port
var PORT = process.env.PORT || 3000;

// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
  });