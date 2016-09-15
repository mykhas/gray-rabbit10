import leaflet from 'leaflet';
import leafletKnn from 'leaflet-knn';
import SearchService from '../../search/services/search.service';
import PointsModel from '../services/pointsModel.service';
L.Icon.Default.imagePath = 'img/leaflet';

let markers;

class MapController {
    constructor($resource) {
        this.pointsModel = new PointsModel($resource);
        this.pointsModel.query(result => {
            markers = result;
            let geoJSONPoints = markers.map(marker => {
                return {
                    type: "Point",
                    coordinates: [marker.lon, marker.lat],
                    properties: {
                        title: marker.title
                    },
                }
            });
            this.geoJSON = L.geoJson(geoJSONPoints);
        });

        this.map = L.map('map').setView([50.45, 30.52], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            accessToken: 'pk.eyJ1Ijoia29iZXJueWsiLCJhIjoiY2l0MWpibXZzMDA5dTJ6bzMxMXpuazAzbCJ9.zZsFHtrmX06E80GKKoKHqg'
        }).addTo(this.map);

        this.searchService = new SearchService(this.map);

        this.map.on('click', this.findClosestMarker.bind(this));
    }

    findClosestMarker(e) {
        let latLng = e ? e.latlng : {lat: 50.45, lon: 30.52};
        let nearestPoint = leafletKnn(this.geoJSON).nearest(L.latLng(latLng), 1)[0];

        this.searchService.addPoint(nearestPoint);
    }
}

export default MapController;