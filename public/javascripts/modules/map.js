import axios from "axios";
import { $ } from "./bling";

const mapOptions = {
	center: {lat: 43.2, lng: -79.8},
	zoom: 10
};

function loadPlaces(map, lat = 43.2, lng = -79.8){
	axios.get(`/api/stores/near?lat=${lat}&lng=${lng}`)
		.then(res =>{
			const places = res.data;
			if(!places.length) return alert("No places found!");
			
			// creates a bounds (google map)
			const bounds = new google.maps.LatLngBounds();
			const infoWindow = new google.maps.InfoWindow();

			const markers = places.map((place) =>{
				const [_lng, _lat] = place.location.coordinates;
				const position = {lat: _lat, lng: _lng};
				bounds.extend(position);
				const marker = new google.maps.Marker({ map, position });
				marker.place = place;
				return marker;
			});
			// show info-window of location
			markers.forEach((marker) =>{
				return marker.addListener('click', function(){
					const html = `<div class="popup">
						<a href="/store/${this.place.slug}">
							<img src="/uploads/${this.place.photo || "store.png"}" alt="${this.place.name}" />
							<p>${this.place.name} - ${this.place.location.address}</p>
						</a>
					</div>`;

					infoWindow.setContent(html);
					infoWindow.open(map, this);
				});
			});
			// zoom the map to fit the markers position.
			map.setCenter(bounds.getCenter());
			map.fitBounds(bounds);
		}).catch(err => console.log(err));
};

function makeMap(mapDiv){
	if(!mapDiv) return;
	const map = new google.maps.Map(mapDiv, mapOptions);
	loadPlaces(map);

	const _input = $(" [name='geolocate'] ");
	const autocomplete = new google.maps.places.Autocomplete(_input);
	autocomplete.addListener('place_changed', () =>{
		const place = autocomplete.getPlace();
		loadPlaces(map, place.geometry.location.lat(), place.geometry.location.lng());
	})
};

export default makeMap;