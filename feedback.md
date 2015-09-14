Fantastic job! This project does a nice job of exibiting what we've done so far. I'm impressed that you were able to synthesize your skills to create something simple and fun to use!
##Creativity

* Great idea for you first project, I love it. Its fun, unique, and simple. I was impressed at how much time you spent thoughtfully thinking through concepts before you started building. I was even more impress at your ability to not be married to your ideas and make changes as new problems arose.

##Planning

* Awesome readme! It illustrates that this was a well thought out project with a good amount of self reflection. I believe you had made some user stories to help guide you through the execution phase, add them to the readme as well!

* I know there was some trouble with redesigning your models, but it seems like you overcame that obstacle by a bit of a mid-build redesign. Try to avoid that (but that that's in an ideal world). Overall, really great job in having the discipline and ability to rework the origin plans in order to better suit a solid MVP!

##Execution

* Great job going out working with dates. It can be confusing and you managed to figure out how the Date object works and learn a library to help you do that. It shows proactiveness, curiosity, and resourcefulness.
* Nice job defining functions outside of page load and executing functions after page load in the `app.js`
* Avoid styling with classes that have names like `.welcome` or `.wrapper`, names that have a lot of ambiguity. Instead the classes with names like `.red` or `.date` are much more clear and semantic. Remember class-based CSS!
* Currently the views are confusing as both ejs and static html are being used. Either use EJS or serve static files with `res.sendFile`, but avoid doing both. May as well use EJS as it's already setup. In that case remove all the `.html` view files that are not being used and abstract repetitive html code to partials!

##Next Steps

* Add user stories to the readme.
* Try adding EJS to all views.
* Consider adding a seed file.
