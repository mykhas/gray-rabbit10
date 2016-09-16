import PointsModel from '../../map/services/pointsModel.service';

class PointController {
    constructor($resource, $scope) {
        this.$scope = $scope;

        this.PointsModel = new PointsModel($resource);
        this.PointsModel.query(response => {
            this.potentialNeighbors = response;
        });

        this.newPoint = new this.PointsModel();

        this.map = L.map('newPointMap').setView([50.45, 30.52], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            accessToken: 'pk.eyJ1Ijoia29iZXJueWsiLCJhIjoiY2l0MWpibXZzMDA5dTJ6bzMxMXpuazAzbCJ9.zZsFHtrmX06E80GKKoKHqg'
        }).addTo(this.map);
        this.map.on('click', this.addNewPointCoordinates.bind(this));
    }

    addNeighbor(neighbor) {
        if (!this.newPoint.neighbors) {
            this.newPoint.neighbors = [];
        }

        this.newPoint.neighbors.push(neighbor);
        delete this.newNeighbor;
    }

    addNewPointCoordinates(e) {
        console.log('in addNewPointCoordinates', e);
        this.newPoint.lat = e.latlng.lat;
        this.newPoint.lon = e.latlng.lng;
        if (this.marker) {
            this.map.removeLayer(this.marker);
        }
        this.marker = L.marker({lat: this.newPoint.lat, lon: this.newPoint.lon}).addTo(this.map);

        this.$scope.$apply();
    }

    submitNewPoint() {
        this.newPoint.neighbors = this.newPoint.neighbors.map(neighbor => neighbor._id);
        this.newPoint.$save(response => {
            if (this.marker) {
                this.map.removeLayer(this.marker);
            }
            this.newPoint = new this.PointsModel;
            alert('Saved! Reload page to see new Point');
        })
    }
}

export default PointController;