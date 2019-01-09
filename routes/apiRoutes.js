// Database configuration
var databaseUrl = "mongoHeadlines";
var collections = ["scrapeddata"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl, collections);

// Log any mongojs errors to console
db.on("error", function(error) {
  console.log("Database Error:", error);
});

