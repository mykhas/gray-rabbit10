import SearchService from '../services/search.service';

class SearchController {
    constructor($scope) {
        $scope.$watch(() => this.searchService, (newVal) => {
            newVal && newVal.subject.subscribe(points => {
                this.points = points;
                if (points.length) {
                    $scope.$apply();
                }
            })
        });
    }

    getPoints() {
        console.log('points: ', this.points);
    }

    clear() {
        this.searchService.clear();
        console.log('cleared');
    }
}

export default SearchController;