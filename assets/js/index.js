import * as config from './config.js';

class Index {
    constructor(){
        this.docId = `1jtO8JPltc8gwbtkvzI5VWLW4Vlnd0SL8RVzu-nflsi4`;
        this.sheetName = `Item`;
        this.restrictedApiKey = config.GSHEET_API_KEY_DEV || `AIzaSyBehxX_a_DsMDSCGqgPeBkZnZa3zaWnqg0`;
        this.urlHash = {
            getItems: `https://sheets.googleapis.com/v4/spreadsheets/${this.docId}/values/${this.sheetName}?key=${this.restrictedApiKey}`
        }
        this.renderResults();
    }

    renderResults() {
        $('#items').html(``);
        this.toggleSearchAndLoading();
        const _ = $.ajax({
            url: this.urlHash.getItems,
            timeout: 10000
        });

        _.done((response) => {
            let data = response.values;
            if (!data.length) {
                this.toggleSearchAndLoading(false);
                return;
            }

            [, ...data] = data;
            this.makeCatalogs(data);
            this.toggleSearchAndLoading(false);
        });

        _.fail((xhr, textResponse) => {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            this.toggleSearchAndLoading(false);
        });
    }

    makeCatalog(d, idx) {
        let content = `
            <div id="${d[0]}" data-name="${d[1]}" data-index="${idx}">
                <a target="_blank" href="${d[2]}">
                    <button id="button-${d[0]}" class="btn btn-primary" type="button">
                        ${d[0]}. ${d[1]}
                    </button>
                </a>
            </div>
        `
        $('#items').append(content);
    }

    makeCatalogs(data) {
        data.forEach((d, idx) => {
            this.makeCatalog(d, idx);
        });
    }

    toggleSearchAndLoading(loading=true) {
        $('#search').attr('disabled', loading);
        $('#button-search').attr('disabled', loading);

        if (loading) {
            $('.loading').show();
        } else {
            $('.loading').hide();
        }
    }
}

$(() => {
    const _ = new Index();
});