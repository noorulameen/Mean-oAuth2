import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CoinService {
    

  constructor(private http: HttpClient,private router: Router) { }
  addCoin(name, price) {
      const uri = 'http://localhost:3000/todo/users/addcoin';
      const obj = {
        name: name,
        price: price
      }; 
      
      
      this.http.post(uri, obj)
          .subscribe(res => console.log('Done'));
    }
  
  
  getCoins() {
      const uri = 'http://localhost:3000/todo/users/getcoin';
      return this
              .http
              .get(uri)
              .map(res => {
                return res;
              });
    }
  
  editCoin(id) {
      
      const uri = 'http://localhost:3000/todo/users/edit/' + id;
      return this
              .http
              .get(uri)
              .map(res => {                    
                return res;
              });
    }
  
  updateCoin(name, price, id) {
      const uri = 'http://localhost:3000/todo/users/update/' + id;
      const obj = {
        name: name,
        price: price
      };
      this
        .http
        .post(uri, obj)
        .subscribe(res => 
        console.log('Done'));
      this.router.navigate(['/index']);
    }
  
  
  deleteCoin(id) {
      const uri = 'http://localhost:3000/todo/users/delete/' + id;
          return this
              .http
              .get(uri)
              .map(res => {
                return res;
              });
    }


}
