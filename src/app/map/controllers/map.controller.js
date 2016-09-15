import leaflet from 'leaflet';
import leafletKnn from 'leaflet-knn';
import SearchService from '../../search/services/search.service';
import PointsModel from '../services/pointsModel.service';
L.Icon.Default.imagePath = 'img/leaflet';

class MapController {
    constructor($resource) {
        this.markers = [];
        this.pointsModel = new PointsModel($resource);
        this.pointsModel.query(result => {
            this.markers = result;
            let geoJSONPoints = this.markers.map(marker => {
                return {
                    type: "Point",
                    coordinates: [marker.lon, marker.lat],
                    properties: {
                        _id: marker._id,
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
        console.log(e);
        let latLng = e ? e.latlng : {lat: 50.45, lng: 30.52};
        let nearestPoint = leafletKnn(this.geoJSON).nearest(L.latLng(latLng), 1)[0];

        this.searchService.addPoint(nearestPoint);
    }

    selectPoint(marker) {
        // TODO: fix this method
        let json = {
            type: "Point",
            coordinates: [marker.lon, marker.lat],
            properties: {
                _id: marker._id,
                title: marker.title
            },
        };
        let result = leafletKnn(L.geoJson(json)).nearest(L.latLng([marker.lon, marker.lat]), 1)[0];

        this.searchService.addPoint(result);
        delete this.selectedPoint1;
        delete this.selectedPoint2;
    }
}

export default MapController;