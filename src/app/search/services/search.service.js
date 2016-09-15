import Rx from 'rxjs/Rx';
import GraphFactory from './graphFactory.service';
import DijstraService from './dijkstra.service';

class SearchService {
    constructor(map) {
        this.map = map;
        this.points = [];
        this.subject = new Rx.Subject(); // primitive subscriber implementation
    }

    addPoint(point) {
        if (this.points.length >= 2) {
            return false;
        }
        this.points.push(point);
        this._addMarker(point);
        this.subject.next(this.points);
    }
    
    clear() {
        this.points.map(point => {
            this.map.removeLayer(point.node);
        });
        this.points = [];
        this.subject.next(this.points);        
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