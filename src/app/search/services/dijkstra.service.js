import PriorityQueue from './priorityQueue.service';

const INFINITY = 1/0;

class DijkstraService {
    constructor(graph) {
        this.graph = graph;
        this.queue = new PriorityQueue();
        this.distances = {};
        this.path = [];
        this.parents = [];
    }

    getPath(a, b) {      
        // Initializing
        Object.keys(this.graph.nodes).forEach(key => {
            this.parents[key] = null;
            if (a === key) {
                this.distances[key] = 0;
                this.queue.enqueue(0, key);
            } else {
                this.distances[key] = INFINITY;
                this.queue.enqueue(INFINITY, key);
            }
        });

        // Processing
        let currentPoint, alt;
        while (!this.queue.isEmpty()) {
            currentPoint = this.queue.dequeue();

            if (currentPoint === b) {
                this._finishIteration(currentPoint);
                break;
            }

            if (!currentPoint || this.distances[currentPoint] === INFINITY) {
                continue;
            }

            for (let neighbor in this.graph.nodes[currentPoint]) {
                this._tryNewDistance(currentPoint, neighbor);
            }
        }

        this.path.push(a);
        return this.path;
    }

    _tryNewDistance(currentPoint, neighbor) {
        let alt = this.distances[currentPoint] + this.graph.nodes[currentPoint][neighbor];

        if (alt < this.distances[neighbor]) {
            this.distances[neighbor] = alt;
            this.parents[neighbor] = currentPoint;

            this.queue.enqueue(alt, neighbor);
        }
    }

    _finishIteration(currentPoint) {
        while (this.parents[currentPoint]) {
            this.path.push(currentPoint);
            currentPoint = this.parents[currentPoint];
        }
    }
}

export default DijkstraService;