import SearchController from './controllers/search.controller';

const COMPONENT_NAME = 'searchComponent';

const SearchComponent = {
    controller: SearchController,
    controllerAs: 'vm',
    template: require('./views/search.component.html'),
};

angular.module('app-search', []).component(COMPONENT_NAME, SearchComponent);

export default SearchComponent;