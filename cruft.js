app.post('/history', function(req, res){
  //find user?

  var moodNow = req.body.moodInput;
  console.log(moodNow);

  //match date. only add new mood to today's date

  // if morning day.morning = moodNow; -> user.days.push
  // if afternoon day.afternoon = moodNow;
  // if night day.night = moodNow;
    
  // user.days.push(moodNow);
  // user.day.save(function(err, moodNow){
  //       if (err){
  //         return console.log(err);
  //       } else {
  //         console.log(moodNow + " added successfully!");
  //         res.send(moodNow);
  //       }
  // });
});

//after login, check. if day is set, update day; else create a new day
//write function isDayToday -- returns boolean
// function setUserDay(user, next){

//   if(user.days.length === 0) {
//       var day = new db.Day;
//       day.date = today;
//       user.days.push(day);

//       user.save(function(err, newDay){
//       if (err){
//         console.log(err);
//         next(err, newDay);
//       } else {
//         console.log(newDay + " is the user's first day");
//         next(null, newDay);
//       }
//     })

//   } else {

//       if(user.days.date !== today) {
//         console.log('time to add a new day!');
//         var day = new db.Day;
//         day.date = today;
//         user.days.push(day);

//         user.save(function(err, newDay){
//         if (err){
//           console.log(err);
//           next(err, newDay);
//         } else {
//           console.log(newDay);
//           next(null, newDay);
//         }
//       })

//       } else {
//         var last_day = user.days[user.days.length-1];
//         var diff = last_day.date - today;
//         console.log(last_day.date + " was the last time you logged in");
//         if (last_day.date && diff === 0)  {
//           console.log(user.email + " already has a day!")
//           return next(null, last_day);
//       }
//     }
//   }
// };
