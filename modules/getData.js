export default async function(url) {
	const result = await fetch(url);
	const data = await result.json();
	
	return data; 
};