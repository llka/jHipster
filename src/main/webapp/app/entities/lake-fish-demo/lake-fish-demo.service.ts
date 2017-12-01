import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { LakeFishDemo } from './lake-fish-demo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LakeFishDemoService {

    private resourceUrl = SERVER_API_URL + 'api/lakes';

    constructor(private http: Http) { }

    create(lake: LakeFishDemo): Observable<LakeFishDemo> {
        const copy = this.convert(lake);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(lake: LakeFishDemo): Observable<LakeFishDemo> {
        const copy = this.convert(lake);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<LakeFishDemo> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to LakeFishDemo.
     */
    private convertItemFromServer(json: any): LakeFishDemo {
        const entity: LakeFishDemo = Object.assign(new LakeFishDemo(), json);
        return entity;
    }

    /**
     * Convert a LakeFishDemo to a JSON which can be sent to the server.
     */
    private convert(lake: LakeFishDemo): LakeFishDemo {
        const copy: LakeFishDemo = Object.assign({}, lake);
        return copy;
    }
}
