import angular from 'angular';

import '../style/app.css';
import '../../node_modules/leaflet/dist/leaflet.css';

// Dependent components
import MapComponent from './map/map.component'

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor() {
    this.url = 'https://github.com/preboot/angular-webpack';
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['app-map'])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;