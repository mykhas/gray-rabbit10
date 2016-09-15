class PointsModel {
    constructor($resource) {
        this.model = $resource('http://localhost:8081/point/:id', {id: '@id'});
        return this.model;
    }
}

export default PointsModel;