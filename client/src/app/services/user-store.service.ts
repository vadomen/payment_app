import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

    private userStoreSubject: BehaviorSubject<any> = new BehaviorSubject({});

	constructor() { }

	public setCurrentUser(user: any) {
		this.userStoreSubject.next(user);
	}

	public getCurrentUser(): Observable<any> {
		return this.userStoreSubject.asObservable();
	}
}
