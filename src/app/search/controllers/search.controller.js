import SearchService from '../services/search.service';

class SearchController {
    constructor() {
        this.searchService = {};
    }

    clear() {
        this.searchService.clear();
        console.log('cleared');
    }
}

export default SearchController;