import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
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
            const formData = new URLSearchParams();
            let headers = new Headers();
            formData.append('grant_type', 'password');
            formData.append('username', username);
            formData.append('password', password);            
             headers.append('Content-Type', 'application/x-www-form-urlencoded');
             headers.append('Authorization', "Basic YXBwbGljYXRpb246c2VjcmV01");
             let options = new RequestOptions({ headers: headers });
             let data= formData.toString()
            return this.http.post('http://localhost:3000/todo/users/login',data,{headers:headers})
                .map((response: Response) => {
                    console.log('ameen>>>>>',response)
                    let token = response.ok && response.json().accessToken;
                    let refreshToken = response.ok && response.json().refreshToken;
                   
                    if (token && refreshToken) {
                       // set token property
                        this.token = token;
                        this.refreshToken = refreshToken;
                        // store username and Oauth2 token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, refreshToken:refreshToken}));
                        // return true to indicate successful login
                        return true;
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
