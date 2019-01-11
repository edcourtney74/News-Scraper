$(document).ready(function () {

    // Get any articles from the database on page load
    $.getJSON("/", function (data) {        
    });

    // CLICK FUNCTIONS
    // Function to scrape on user press
    $("#scrape").on("click", function (event) {
        event.preventDefault();

        // Send scrape request
        $.get("/scrape", function (data) {
        })
    })

    // Function to clear articles
    $("#clear").on("click", function (event) {
        event.preventDefault();

        // Clear all items on page
        $("#results").empty();
    })
    
    // Function to save article on user press
    $(".save").on("click", function (event) {
        event.preventDefault();

        // Grab articleID from save button
        var articleID = $(this).attr("data-id");

        // Remove article from view
        $(this).closest(".card").fadeOut(500, function () {
            $(this).closest(".card").empty();
        });

        // Create object to send, updating saved value to true
        var Obj = {
            id: articleID,
            saved: true
        }

        // Send post request to update article value to saved in db
        $.post("/saved", Obj
        ).then(function (data) {
        })
    })

    // Function to remove article from saved list
    $(".remove").on("click", function (event) {
        event.preventDefault();

        console.log("save click worked")
        // Grab articleID from remove button
        var articleID = $(this).attr("data-id");
        console.log("userID: " + articleID);

        // Remove article from view
        $(this).closest(".card").fadeOut(500, function () {
            $(this).closest(".card").empty();
        });

        // Create object to send, updating saved value to true
        var Obj = {
            id: articleID,
            saved: false
        }

        // Send post request to update article value to saved in db
        $.post("/removed", Obj
        ).then(function (data) {
        })
    })

    // Function when user presses article notes button
    $(".notes").on("click", function (event) {
        event.preventDefault();

        // Grab articleID from notes button
        var articleID = $(this).attr("data-id");

        // Query for get request
        var query = "/articles/" + articleID

        // Get request for article notes
        $.get(query, function (data) {
            // Set variable for notes from data
            var notes = data.articles.notes

            // Use for loop to add individual notes to article modal
            for (let i = 0; i < notes.length; i++) {
                // Save note content to HTML with button
                var noteTextHTML = "<div class='border note p-2 mb-2'>" + notes[i].comment + "<button type='button' class='btn btn-danger btn-sm ml-3 delete-nt' data-id='" + notes[i]._id + "'>X</button></div>";
                $(".old-notes").append(noteTextHTML);
            }
        })
    })

    // Function when user saves an article note
    $(".save-note").on("click", function (event) {
        event.preventDefault();
        
        // Create object to send, creating note
        var Obj = {
            comment: $("#note-content").val()
        }

        // Grab articleID from submit button
        var articleID = $(this).attr("data-id");
        // Query for get request
        var query = "/articles/" + articleID

        // Send post request to add note to db
        $.post(query, Obj
        ).then(function (data) {
        })

        // Empty note input for next note
        $("#note-content").val("");
    })

    // Function when user click delete note button
    $(document).on("click", ".delete-nt", function(event) {
        event.preventDefault();
      
        // Grab articleID from delete button
        var articleID = $(this).attr("data-id");

        // Query for post request
        var query = "/delete/" + articleID

        // Send post request to delete note from db
        $.post(query).then(function (data) {
        })

        // Remove note from view
        $(this).closest(".note").fadeOut(500, function () {
            $(this).closest(".note").empty();
        });

    })

})