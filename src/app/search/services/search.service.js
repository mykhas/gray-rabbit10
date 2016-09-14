class SearchService {
    constructor(map) {
        this.map = map;
        this.points = [];
    }

    addPoint(point) {
        if (this.points.length >= 2) {
            return false;
        }
        this.points.push(point);
        this._addMarker(point);
    }
    
    clear() {
        this.points.map(point => {
            this.map.removeLayer(point.node);
        })
    }

    processSearch() {
        console.log('Search processing');
    }

    _addMarker(marker) {
        marker.node = L.marker({lat: marker.lat, lon: marker.lon}).addTo(this.map);
        marker.node.bindPopup('Point #' + this.points.length);
        return marker;
    }
}

export default SearchService;