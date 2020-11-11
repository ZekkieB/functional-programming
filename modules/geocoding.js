//google geocoder api wrapped in a promise, for use in an async/await function
export default function (city) {
	const geocoder =  new google.maps.Geocoder();
	return new Promise((resolve, reject) => {
		geocoder.geocode({"address" : `${city},nl`}, (result,status) => {
			const lat = result[0].geometry.location.lat();
			const lng = result[0].geometry.location.lng();
			resolve([lat,lng]);
		});
	});
};