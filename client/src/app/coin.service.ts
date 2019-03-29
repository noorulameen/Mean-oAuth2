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
  addNote(name, price) {
      const uri = 'http://localhost:3000/todo/note/notes';
      const obj = {
        title: name,
        content: price
      }; 
      
      
      this.http.post(uri, obj)
          .subscribe(res => console.log('Done'));
    }
  
  
  getNotes() {
      const uri = 'http://localhost:3000/todo/note/getnotes';
      return this
              .http
              .get(uri)
              .map(res => {
                return res;
              });
    }
  
  editNote(id) {
      
      const uri = 'http://localhost:3000/todo/note/notes/' + id;
      return this
              .http
              .get(uri)
              .map(res => {                    
                return res;
              });
    }
  
  updateNote(title, content, id) {
      
      console.log(title);
      const uri = 'http://localhost:3000/todo/note/notes/' + id;
      const obj = {
        title: title,
        content: content
      };
      this
        .http
        .put(uri, obj)
        .subscribe(res => 
        console.log('Done'));
      this.router.navigate(['/index']);
    }
  
  
  deleteNote(id) {
      const uri = 'http://localhost:3000/todo/note/notes/' + id;
          return this
              .http
              .delete(uri)
              .map(res => {
                return res;
              });
    }


}
