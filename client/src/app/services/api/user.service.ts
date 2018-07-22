import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
const {BASE_URL, USER} = environment.API;

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private url: string = BASE_URL;
    private headers: HttpHeaders = new HttpHeaders({
          'Content-Type':  'application/json'
        });

        
    constructor(private http: HttpClient) { }

    public signInUser(credentials: {login: string, password: string}): Observable<any> {
        return this.http.post(`${this.url}${USER.SIGN_IN}`, JSON.stringify(credentials), { headers: this.headers });
    }

    public getUser(): Observable<any> {
        return this.http.get(`${this.url}${USER.GET_USER}`, { headers: this.headers });
    }
}
