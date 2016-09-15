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
        this.points = [];
        this.subject.next(this.points);        
    }

    processSearch(pointsModel) {
        pointsModel.query(points => {
            let graphFactory = new GraphFactory();
            let graph = graphFactory.processGraph(points);
            let dijkstra = new DijkstraService(graph);
            let path = dijkstra.getPath(
                this.points[0].layer.feature.geometry.properties._id,
                this.points[1].layer.feature.geometry.properties._id
            );

            points
                .filter(point => path.includes(point._id))
                .map(point => this._addMarker(point));
        });
    }

    _addMarker(marker) {
        this.points.push(marker);
        marker.node = L.marker({lat: marker.lat, lon: marker.lon}).addTo(this.map);
        marker.node.bindPopup('Point #' + this.points.length);
        return marker;
    }
}

export default SearchService;