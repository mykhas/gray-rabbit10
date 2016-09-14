import angular from 'angular';

import '../style/normalize.css';
import '../style/skeleton.css';
import '../style/app.css';
import '../../node_modules/leaflet/dist/leaflet.css';

// Dependent components
import MapComponent from './map/map.component'
import SearchComponent from './search/search.component'

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor() {
    // app constructor
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['app-map', 'app-search'])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;