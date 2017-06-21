export class CollectionConfiguration {
    static httpService: any;
}

export class CollectionConfigurationManager {
    static getHttpService<T>(): T {
        if (typeof CollectionConfiguration.httpService !== 'undefined') {
            return CollectionConfiguration.httpService as T;
        } else {
            throw new Error('You need to set the http service -> CollectionConfigurationManager.setHttpService<\T>(http)')
        }
    }

    static setHttpService<T>(httpService: T) {
        CollectionConfiguration.httpService = httpService;
    }
}
