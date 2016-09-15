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

    calculateRoute() {
        console.log('points: ', this.points);
        this.searchService.processSearch(this.pointsModel)
    }

    clear() {
        this.searchService.clear();
        console.log('cleared');
    }
}

export default SearchController;