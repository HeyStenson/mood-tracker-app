$(function(){
	getHour();
});

var moodNow;

function getHour(){

	var rightNow = moment().hour();
	if (rightNow > 0 && rightNow < 12){
		$('#time').append('<h1>Good morning!</h1>');

	} else if (rightNow >= 12 && rightNow < 17) {
		$('#time').append('<h1>Good afternoon!</h1>');

	} else if (rightNow >= 17) {
		$('#time').append('<h1>Good evening!</h1>');

	}
};

//var foodTemplateURL = "/static/html/foodTemplate.html";
// function getFoods() {
//   $.get("/foods", function(res){ 
//     var foods = res;
//     // grab foods template
//     renderFoods(foods)
//   });
// }

// function renderFoods(foods) {
//   // get template through ajax
//   $.get(foodTemplateURL, function(templateHTML) {
//     var template = _.template(templateHTML);
//     // input foods into template and append to parent
//     var foodItems = foods.map(function(food) {
//       return template(food);
//     });
//     // clear content (for repeated use)
//     $("#food-ul").html("");
//     // append foods to ul
//     $("#food-ul").append(foodItems);
//   })
// }

// function renderFood(food) {
//   $.get(foodTemplateURL, function(templateHTML) {
//     var template = _.template(templateHTML);
//     // append foods to ul
//     $("#food-ul").append(template(food));
//   })
// }