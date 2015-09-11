$(function(){
	getHour();
	getDay();
});

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

function getDay(){
	var now = moment();
	var todayIs = moment(now).format('dddd');
	$('#day').append("<h3>It's " + todayIs + "</h3>");
}