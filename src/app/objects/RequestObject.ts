import {HttpParams} from '@angular/common/http';

export class RequestObject {
    url: string;
    offset: number = 0;
    limit: number;
    searchParams: any;
    data: any = {};
    options: any = {};

    showAlert = true;
    loader: boolean;
    loaderId;

    onSuccess = (resp, data?) => {};
    onMessage = (resp) => {};
    onFail = (resp) => {};
    onDone = (resp) => {};
    onProgress = (resp, percentage) => {};
    onStep = (resp) => {};

    headers: any;
    reportProgress: any;

    supressWarnings;
    saveInService = false;
    overwriteInService = true;
    hasErrorHandling = false;

    extraHeaders: any = {};

    constructor(data?) {
        if (!data) return;

        for (const prop in data) {
            if (data[prop]) {
                let value = data[prop];
                switch (prop) {
                    case 'loader':
                        if (value === true) {
                            value = {};
                        }
                        break;
                    case 'onFail':
                        this.hasErrorHandling = true;
                        break;
                    default:
                        // code...
                        break;
                }
                this[prop] = value;
            }
        }

        if (!this.options) this.options = {};

        if (!this.options.bodyType) this.options.bodyType = 'json';
    }

    getQueryParams(): HttpParams {
        let p: HttpParams = new HttpParams();

        for (var prop in this.extraHeaders) {
           p = p.set(prop, this.extraHeaders[prop])
        }

        if (this.offset) {
            p = p.set('offset', this.offset.toString());
        }

        if (this.limit != null) {
            p = p.set('limit', this.limit.toString())
        }

        if (this.searchParams) {
            p = p.set('q', JSON.stringify(this.searchParams))
        }
        return p;
    }

    /**
     * word volgens mij niet meer gebruikt. @deprecated
     */
    getSearchParams() {
        if (this.searchParams) {
            return {q: this.searchParams};
        }
    }

    getStringifiedBody() {
        let data = this.data;
        if (!data) data = {};

        if (this.offset) {
            data.offset = this.offset;
        }

        data.limit = this.limit;

        return JSON.stringify(data);
    }
}
