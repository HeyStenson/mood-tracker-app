$(function(){
	getHour();
});

function getHour(){
	var rightNow = moment().hour();
	if (rightNow > 0 && rightNow < 12){
		$('#time').append('<h1>Good morning!</h1>');
	} else if (rightNow > 12 && rightNow < 6) {
		$('#time').append('<h1>Good afternoon!</h1>');
	} else {
		$('#time').append('<h1>Good evening!</h1>');
	}
};