$(function(){
	getHour();
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
	$('div.mood').click(function(){
		moodNow = $(this).attr('class');
		console.log(moodNow);
		$('.todayMood').append('<div class="mood ' + moodNow + '"></div>');
	});
}

