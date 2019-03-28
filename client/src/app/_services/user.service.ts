import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { AuthenticationService } from '../_services/index';
import { User } from '../_models/index';




@Injectable({
  providedIn: 'root'
})
export class UserService {
        constructor(
            private http: Http,
            private authenticationService: AuthenticationService) {
        }

        getUsers(): Observable<[User]> {
            console.log('gggggggg');
            // add authorization header with jwt token
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
            let options = new RequestOptions({ headers: headers });

            // get users from api
            return this.http.get('http://localhost:3000/todo/users/listtodo', options)
                .map((response: Response) => response.json());
        }
}
