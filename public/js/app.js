$(function(){
	getHour();

	var today = moment().dayOfYear();
	console.log(today);
});

var moodNow;

function getHour(){

	var rightNow = moment().hour();
	if (rightNow > 0 && rightNow < 12){
		$('#time').append('<h1>Good morning!</h1>');
		getColor();
	} else if (rightNow >= 12 && rightNow < 17) {
		$('#time').append('<h1>Good afternoon!</h1>');
		getColor();
	} else if (rightNow >= 17) {
		$('#time').append('<h1>Good evening!</h1>');
		getColor();
	}
};

function getColor(){
	var clicks = 0;
	$('div.mood').click(function(){
		if (clicks < 1){
			moodNow = $(this).attr('class');
			console.log(moodNow);
			$('.todayMood').append('<div class="mood ' + moodNow + '"></div>');
		}
		clicks++;
	});
}


 