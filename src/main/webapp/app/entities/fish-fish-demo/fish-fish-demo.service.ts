import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { FishFishDemo } from './fish-fish-demo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FishFishDemoService {

    private resourceUrl = SERVER_API_URL + 'api/fish';

    constructor(private http: Http) { }

    create(fish: FishFishDemo): Observable<FishFishDemo> {
        const copy = this.convert(fish);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(fish: FishFishDemo): Observable<FishFishDemo> {
        const copy = this.convert(fish);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FishFishDemo> {
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
     * Convert a returned JSON object to FishFishDemo.
     */
    private convertItemFromServer(json: any): FishFishDemo {
        const entity: FishFishDemo = Object.assign(new FishFishDemo(), json);
        return entity;
    }

    /**
     * Convert a FishFishDemo to a JSON which can be sent to the server.
     */
    private convert(fish: FishFishDemo): FishFishDemo {
        const copy: FishFishDemo = Object.assign({}, fish);
        return copy;
    }
}
