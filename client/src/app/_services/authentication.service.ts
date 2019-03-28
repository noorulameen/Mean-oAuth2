import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
        public token: string;
        public refreshToken: string;



        constructor(private http: Http) {
            // set token if saved in local storage
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.token = currentUser && currentUser.token;
            this.refreshToken = currentUser && currentUser.refreshToken;
        }
        
        login(username: string, password: string): Observable<boolean> {
            
            /*return new Promise<any>((resolve, reject) => {
                this.http.post('http://localhost:3000/todo/users/login', { username: username, password: password }).subscribe(res => {
                  resolve(res);
                }, err => {
                    alert('err')
                  reject(err);
                });
              });*/
            
            
            return this.http.post('http://localhost:3000/todo/users/login', { username: username, password: password })
                .map((response: Response) => {
                    // login successful if there's a jwt token in the response
                    let token = response.json().success && response.json().content[0].token;
                    let refreshToken = response.json().success && response.json().content[0].refreshToken;
                    
                    if (token && refreshToken) {
                       // set token property
                        this.token = token;
                        this.refreshToken = refreshToken;
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, refreshToken:refreshToken}));
                        // return true to indicate successful login
                        return true;
                    } else {
                        // return false to indicate failed login
                        return false;
                    }
                })
        }
        
        
        
        
        logout(): void {
            // clear token remove user from local storage to log user out
            this.token = null;
            this.refreshToken = null;
            localStorage.removeItem('currentUser');
        }
}
