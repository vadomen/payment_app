import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    public getAuthorizationToken(): string {
        return localStorage.getItem('token');
    }
    public setAuthorizationToken(userId: string, token: string) {
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
    }

    public getUserId(): string {
        return localStorage.getItem('userId');
    }

    public deleteAuthorizationToken(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }
}
