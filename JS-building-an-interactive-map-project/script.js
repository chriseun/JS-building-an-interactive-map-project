var map = L.map("map", {
  center: [35.83719, -78.81413],
  zoom: 5,
  businesses: [],
  markers: {},
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//adding marker
function onLocationFound(e) {

  L.marker(e.latlng).addTo(map)
    .bindPopup("You Are Here").openPopup();
  L.circle(e.latlng).addTo(map);
}

map.on('locationfound', onLocationFound);
map.locate({setView: true, watch: true, maxZoom: 30});
const myMap = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},

addMarkers() {
		for (var i = 0; i < this.businesses.length; i++) {
		this.markers = L.marker([
			this.businesses[i].lat,
			this.businesses[i].long,
		])
			.bindPopup(`<p1>${this.businesses[i].name}</p1>`)
			.addTo(this.map)
		}
	},
}


const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: "fsq3MjY0JVfpk7e9/c5Oz9FOd+1UW1FgFWC9gCvf7FbLFM8=",
  },
};

const coffee = L.layerGroup([]).addTo(map);

fetch(
  "https://api.foursquare.com/v3/places/search?query=coffee&near&limit=7",
  options
)
  .then((response) => response.json())
  .then((response) => {
    if (response.results.length){

      // Iterate over each business retreived
      for (let i = 0; i < response.results.length; i++){

        // Get the lat, long, and name of each business from the result
        let { latitude, longitude } = response.results[i].geocodes.main;
        let { name } = response.results[i];
        console.log(`${latitude}, ${longitude}, ${name}`)

        // Create a marker for each business
        let coffeeMarker = L.marker([latitude, longitude]).bindPopup(name);

        // Add the marker to the coffee layerGroup
        coffee.addLayer(coffeeMarker);
      }


    }
  })
