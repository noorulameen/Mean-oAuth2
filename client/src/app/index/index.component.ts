import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoinService } from '../coin.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {
    notes: any;
  constructor(private http: HttpClient, private router: Router, private service: CoinService) { }

  ngOnInit() {      
      this.getNotes();
  }
  
  getNotes() {
      this.service.getNotes().subscribe(res => {
          this.notes = res;
      });
    }
  
  deleteNote(id) {
      this.service.deleteNote(id).subscribe(res => {  
            this.router.navigate(['/index']);location.reload();
        
//        if(res.status == 200 && res.success){
//            location.reload();
//        }
      });
  }
  
}
