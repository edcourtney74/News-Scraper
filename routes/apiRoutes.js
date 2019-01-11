var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("../models");

module.exports = function (app) {

    // GET ROUTES

    // Get route to grab all the articles in the db
    app.get("/", function (req, res) {
        // Grab everything in the Articles collection
        db.Article.find({})
            .then(function (dbArticles) {               
                res.render("index", {
                    articles: dbArticles
                })
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Get route for saved page
    app.get("/saved", function (req, res) {
        db.Article.find({ saved: true })
            .then(function (dbArticles) {
                res.render("saved", {
                    articles: dbArticles
                })
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Get route to scrape stltoday.com/sports
    app.get("/scrape", function (req, res) {
        axios.get("https://stltoday.com/sports").then(function (response) {

            // Load htmml body response into cheerio
            var $ = cheerio.load(response.data);

            $(".card-container").each(function (i, element) {

                // Create empty result object to send to db
                var result = {};

                // Save the text of every link
                result.title = $(element).find("h4").text().trim();

                // Save the href of every link
                result.link = "https://www.stltoday.com" + $(element).find("a").attr("href");

                // // Save the image of every link
                result.image = $(element).find("img").attr("data-srcset")

                // Make sure an image was found and then split to grab the right quality image
                if (result.image) {
                    result.image.split(" ")[2];
                }

                // Create a new Article from the result object
                db.Article.create(result)
                    .then(function (dbArticle) {
                    })
                    .catch(function (err) {
                        // If an error occurred, log it
                        console.log(err);
                    });
            });
        });
    });

    // Get route to populate chosen article with any notes associated with it
    app.get("/articles/:id", function (req, res) {
        // Query the db using the id parameter passed in
        db.Article.findOne({ _id: req.params.id })
            // Populate all of the notes associated with the article
            .populate("notes")
            .then(function (dbArticle) {
            // If an article exists, send data
                res.send({articles: dbArticle})
            }).catch(function (err) {
                // Send error if error received
                res.json(err);
            })
    })

    // POST ROUTES
    // Post route to mark article as saved in db
    app.post("/saved", function (req, res) {
        db.Article.updateOne(
            { _id: req.body.id },
            { $set: { saved: true } },
            function (error, data) {
                // show any errors
                if (error) {
                    console.log(error);
                }
            })
    })

    // Post route to mark article as not saved in db
    app.post("/removed", function (req, res) {
        db.Article.updateOne(
            { _id: req.body.id },
            { $set: { saved: false } },
            function (error, data) {
                // show any errors
                if (error) {
                    console.log(error);
                }
            })
    })

    // Post route to add note to the db and associate it with an Article
    app.post("/articles/:id", function (req, res) {
        // Create a new note in the db
        db.Note.create(req.body)
            .then(function (dbNote) {
                // Check to see if a note was created successfully. If so, associate the note with the article ID
                return db.Article.findOneAndUpdate(
                    { _id: req.params.id },
                    {
                        $push:
                            { notes: dbNote._id }
                    },
                    { new: true })
            })
            .then(function (dbArticle) {
                // If Article was updated, send the data back
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If error, send back error
                res.json(err);
            })
    })

    // Post route to delete note from the db
    app.post("/delete/:id", function (req, res) {
        // Create a new note in the db
        db.Note.deleteOne({ _id: req.params.id})
            .then(function (err) {
                if (err) throw (err);
            })
        })
}
