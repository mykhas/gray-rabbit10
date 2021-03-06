import Rx from 'rxjs/Rx';
import GraphFactory from './graphFactory.service';
import DijkstraService from './dijkstra.service';

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
        this._addMarker(point);
        this.subject.next(this.points);
    }
    
    clear() {
        this.points.map(point => {
            this.map.removeLayer(point.node);
        });
        this._clearOptymalPath();
        this.points = [];
        this.subject.next(this.points);        
    }

    processSearch(pointsModel) {
        pointsModel.query(points => {
            let graphFactory = new GraphFactory();
            let graph = graphFactory.processGraph(points);
            let dijkstra = new DijkstraService(graph);
            let path = dijkstra.getPath(
                this.points[0]._id,
                this.points[1]._id
            );

            points = path
                .map(point => points.find(element => element._id === point))
                .map(point => this._addMarker(point, true));

            this._addPath(points);
        });
    }

    _addMarker(marker, hidden = false) {
        this.points.push(marker);
        marker.node = L.marker({lat: marker.lat, lon: marker.lon}, {
            opacity: hidden ? 0.3 : 1
        }).addTo(this.map);
        marker.node.bindPopup(marker.title);
        return marker;
    }

    _addPath(points) {
        this._clearOptymalPath();
        this.optymalPath = L.polyline(points, {color: '#777777'}).addTo(this.map);
    }

    _clearOptymalPath() {
        if (this.optymalPath) {
            this.map.removeLayer(this.optymalPath);
        }
    }
}

export default SearchService;