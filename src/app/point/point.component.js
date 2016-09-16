import PointController from './controllers/point.controller';

const COMPONENT_NAME = 'pointComponent';

const PointComponent = {
    controller: PointController,
    controllerAs: 'pcvm',
    template: require('./views/point.component.html'),
};

angular.module('app-map')
    .component(COMPONENT_NAME, PointComponent);

export default PointComponent;