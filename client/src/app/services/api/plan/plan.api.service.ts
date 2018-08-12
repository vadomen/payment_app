import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
const { BASE_URL, PLAN } = environment.API;

@Injectable({
  providedIn: 'root'
})
export class PlanApiService {
    private url: string = BASE_URL;

    constructor(private http: HttpClient) { }

    public getAllPlans(): Observable<any> {
        return this.http.get(`${this.url}${PLAN.GET_ALL}`);
    }

}