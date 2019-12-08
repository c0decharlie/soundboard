import axios from 'axios';

export default class FetchService {
    constructor(baseURL) {
        this.fetchClient = axios.create({
            baseURL
        });
    }

    get(url, options) {
        return this.fetchClient.get(url, options);
    }

    post(url, options) {
        return this.fetchClient.post(url, options);
    }

    delete(url, options) {
        return this.fetchClient.delete(url, options);
    }
}
