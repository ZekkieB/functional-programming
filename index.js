








const getHomePosition = function() {
	return new Promise(function(resolve , reject) { 
		navigator.geolocation.getCurrentPosition(function(currentPosition) {
			const cords = [currentPosition.coords.latitude, currentPosition.coords.longitude];
			resolve(cords);
		})
	});
};





(async function() {
	

	
	// const fetchingData = await fetch("https://opendata.rdw.nl/resource/9c54-cmfx.json");

	// const homePos = await getHomePosition();

	// const data = await fetchingData.json();

	// const yeet = data.map((data) => {
	// 	return {
	// 		naam:data.areadesc,
	// 		laadPunten: parseInt(data.aantal_laad_punten),
	// 		parkeerplaatsen: parseInt(data.aantal_parkeer_plaatsen),
	// 		coordinaten:[parseFloat(data.location.latitude), parseFloat(data.location.longitude)],
	// 		afstand_km: haversineDistance(homePos,[parseFloat(data.location.latitude),parseFloat(data.location.longitude)])
	// 	}		
	// })

	// console.log(yeet)


	const fetchedData = await fetch("http://localhost:4000/api");
	const data = await fetchedData.json();

	const lists = data.map((item) => {
		return {
			hobbies: item.hobbies.replace(/[ ]/g,""),
			socialmedia: item.welkeSocialMediaGebruikt.replace(/[ ]/g,""),
			talen: item.gesprokenTalen.replace(/[ ]/g,"")
		}
	})

	console.log(lists);

})();