import MapController from './controllers/map.controller';

const COMPONENT_NAME = 'mapComponent';

const MapComponent = {
    controller: MapController,
    controllerAs: 'vm',
    template: require('./views/map.component.html'),
};

angular.module('app-map', []).component(COMPONENT_NAME, MapComponent);

export default MapComponent;