$(function(){
	getHour();
	getDay();
	$('.form-signin').on('submit', function(data) {
		data.preventDefault();
		console.log(data);
		var data = {email: data.target.email.value, passwordDigest: data.target.passwordDigest.value};
		$.post('/login', data)
			.success(function handleSuceess(endpoint) {
				console.log("SUCCESS", endpoint);
				window.location.href = endpoint; // receives sendFile from backend
			})
			.error(function handleError(err) {
				console.log("ERROR:", err);
				// alert(err.responseText);
				$('.form-control').css('background', 'pink');
			})

	});

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

