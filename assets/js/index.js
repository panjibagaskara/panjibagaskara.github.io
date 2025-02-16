import * as config from './config.js';

class Index {
    constructor(){
        this.renderResults();
        this.docId = `1jtO8JPltc8gwbtkvzI5VWLW4Vlnd0SL8RVzu-nflsi4`;
        this.sheetName = `Item`;
        this.restrictedApiKey = config.GSHEET_API_KEY_DEV || `AIzaSyBehxX_a_DsMDSCGqgPeBkZnZa3zaWnqg0`;
        this.urlHash = {
            getItems: `https://sheets.googleapis.com/v4/spreadsheets/${this.docId}/values/${this.sheetName}?key=${this.restrictedApiKey}`
        }
    }

    renderResults() {
        this.toggleSearch();
        
    }

    toggleSearch(loading=true) {
        $('#search').attr('disabled', loading);
        $('#button-search').attr('disabled', loading);
    }
}

$(() => {
    const _ = new Index();
});