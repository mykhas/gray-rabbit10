import leaflet from 'leaflet';
import markers from '../../data/coordinates.js';
L.Icon.Default.imagePath = 'img/leaflet';

class MapController {
    constructor() {
        this.map = L.map('map').setView([50.45, 30.52], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            accessToken: 'pk.eyJ1Ijoia29iZXJueWsiLCJhIjoiY2l0MWpibXZzMDA5dTJ6bzMxMXpuazAzbCJ9.zZsFHtrmX06E80GKKoKHqg'
        }).addTo(this.map);

        this.addMarkersForAll();
    }

    addMarkersForAll() {
        markers.map(marker => {
            marker.onMap = L.marker([marker.lat, marker.lng]).addTo(this.map);
            return marker;
        });
    }
}

export default MapController;