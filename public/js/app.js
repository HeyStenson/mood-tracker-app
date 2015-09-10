$(function(){
	getHour();
	getUsers();
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

// function getColor(){

// 	$('div.mood').click(function(){

// 			moodNow = $(this).attr('class');
// 			console.log(moodNow);
// 			$('.todayMood').append('<div class="mood ' + moodNow + '"></div>');


// 	});
// }

//can I render json to the page?
function getUsers(){
	$.get('/api/users', function(res){
		var users = res();
		$('body').append(users);
	})
}

// function renderMoods() 