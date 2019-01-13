# News-Scraper
Web app that grabs sports headlines from The St. Louis Post-Dispatch for users to visit, save for later and attach notes.
https://nameless-anchorage-56532.herokuapp.com/

## Features
### Scraping articles
  * When the user visits the site, previously scraped articles that are in the database will load onto the page (excluding any articles previously saved or removed). If there are no previously scraped articles, the user will be prompted to hit the Scrape Articles button to get articles.
  * When the scrape button is pressed, the app goes to www.stltoday.com/sports and retrieves the headline, link and image of any article found there and stores them in an Articles collection in the database.
    * Before adding an article to the database, a check is run to make sure the article's title or link do not match. This keeps duplicate entries from being added to the database.
    * If an article does not have an image, it is not added to the database in order to give the user a more pleasing user experience.
  * Articles are displayed as mobile-responsive cards. The user can click the headline link to go to the article or click Save Article to add it to the Saved queue.
  * Currently every article in the database is displayed on the page.
  * Articles are sorted by most current date, so when a user comes back later and hits Scrape Articles, the most recently found articles will appear at the top.

### Saving articles
  * When the user clicks the Save Article button, the article is updated in the database with the value of saved: true. When the user goes to the Saved Articles page, only articles marked as saved: true are displayed.
  * When an article is saved, the article is removed from the page view. That article will also not appear anymore when the home page is reloaded.
  * On the saved articles page, the user sees a similar view to the home page, except only saved articles are shown.
  * The user has two options from the saved articles page. The Remove button will both remove the article from the saved page and keep it from being shown on the home page by adding removed:true to the article document in the database. The Article notes button allows the user to view previous comments (but theirs and from other users) as well as add an additional comment.

### Adding article notes
  * When the user clicks the article notes button, a modal pops up that displays the article's headline, any previous notes that have been added and an area to submit a new note.
  * When the user adds a new note, that note is stored as a document in the Notes collection, which is associated with that specific article. The note will now appear any time a user clicks Article notes on that article.
  * The user also has the option to delete any note from an article by clicking the red X button. When that button is clicked, the note is deleted from the database. 

## Technical info
  * This web app utilizes Javascript, Node, Express, Mongoose, MongoDB, Axios, Cheerio and Handlebars.
  
***
## Demonstration
![Demonstration](https://github.com/edcourtney74/News-Scraper/blob/master/public/images/demo.gif "Demonstration")

## Scraped Articles view
![Scraped view](https://github.com/edcourtney74/News-Scraper/blob/master/public/images/scraped.PNG "Scraped view")

## Article notes view
![Article notes view](https://github.com/edcourtney74/News-Scraper/blob/master/public/images/notes.PNG "Article notes view")

