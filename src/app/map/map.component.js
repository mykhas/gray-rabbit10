import MapController from './controllers/map.controller';

const COMPONENT_NAME = 'mapComponent';

const MapComponent = {
    controller: MapController,
    controllerAs: 'mpvc',
    template: require('./views/map.component.html'),
    bindings: {
        searchService: '=',
        pointsModel: '=',
    },
};

angular.module('app-map', ['ngResource']).component(COMPONENT_NAME, MapComponent);

export default MapComponent;