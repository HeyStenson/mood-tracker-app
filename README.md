# moodhue
Use moodhue to track your moods. Select a color that best matches your current mood! Your moodhues will be saved to your history, so you can look at a beautiful visual representation of how you've been feeling.

### Built using:
**jQuery**   
**Node.js**   
**Express**  
**EJS**: Front-end templating.  
**Bootstrap**  
**Moment.js**: This library allows for easy manipulation of and display of time.   
**MongoDB**  

##### Deployed on Heroku at [https://moodhue.herokuapp.com](https://moodhue.herokuapp.com) 

### To run moodhue locally:
Clone this GitHub repo. Once it's downloaded, open your terminal and run `npm install` to get the correct dependencies. Start MongoDB and Node by running `mongod` and `nodemon` in two separate terminal tabs. Head to localhost:3000 to begin recording your moods!

#### To Do:
My original plan was much more ambitious: a user would only be able to choose moods at 3 times during the day (morning, noon, and night). I worried too much about some "extras" such as timing logic before making sure that I had the basic functionality down, and didn't actually have that working until the day before the project was due. If I'd started there and built on top of that, I would have been happier with the result when it was due. 

The only page taking advantage of EJS is the user history page. I had intended to move all of the header information into EJS partials as well, but ran out of time to do so.

I used Moment.js to show the time of day (morning, afternoon, or evening) and the day of the week on the index page. While I found Moment to be a great tool, I wasn't able to work out a way to implement it in the EJS template that renders the user moods. I am going to continue working on this and in v.2 will be adding a CSS hide/show that shows the date that the mood was added on mouseover.
 
I think this app has a lot of potential and I will continue working on it! 



