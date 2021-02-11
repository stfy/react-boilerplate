import { injectable } from 'tsyringe';

export type RequestOptions = {
    method: string
    params?: { [key: string]: string }
    body?: any
}

const defaultOptions: RequestOptions = {
    method: 'GET'
}

export function encodeUrlParams(params: object): string {
    return Object.entries(params)
        .map(p => p.map(encodeURIComponent).join('='))
        .join('&');
}

@injectable()
export class RequestService {
    static prepareUrl(path: string, params: { [key: string]: string }): string {
        let uri = `${process.env.API_URL}${path}`;

        console.log(params)

        if (params) {
            uri += '?'
            uri += encodeUrlParams(params);
        }

        return uri;
    }


    public fetch(path: string, {params, body, ...options}: RequestOptions) {
        const url = RequestService.prepareUrl(path, params)

        if (options.method !== 'GET') {
            body = JSON.stringify({...body})
        }

        const config = {...defaultOptions, ...options, body}

        return fetch(url, config)
    }
}
