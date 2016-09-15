import Graph from './graph.service';

class GraphFactory {
    constructor(pointsModel) {
        pointsModel.query(result => {
            this.processGraph(result);
        });
    }

    processGraph(points) {
        let graph = new Graph();

        points.map(point => {
            let neighbors = point.neighbors
                .map(neighbor => {
                    neighbor = points.find(point => point._id === neighbor);
                    neighbor.weight = this._calculateWeight(point, neighbor);
                    let result = {};
                    result[neighbor._id] = neighbor.weight;
                    return result;
                })
                .reduce((result, neighbor) => {
                    return Object.assign(result, neighbor);
                });
            graph.addNode(point._id, neighbors);
        });

        return graph;
    }

    _calculateWeight(point1, point2) {
        return Math.sqrt(Math.pow(point1.lat - point2.lat, 2) + Math.pow(point1.lon - point2.lon, 2));
    }
}

export default GraphFactory;