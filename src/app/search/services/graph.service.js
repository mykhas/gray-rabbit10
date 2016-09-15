class Graph {
    constructor() {
        this.nodes = {};
    }

    addNode(key, neighbors) {
        this.nodes[key] = neighbors;
    }
}

export default Graph;