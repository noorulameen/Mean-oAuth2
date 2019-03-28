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
    coins: any;
  constructor(private http: HttpClient, private router: Router, private service: CoinService) { }

  ngOnInit() {      
      this.getCoins();
  }
  
  getCoins() {
      this.service.getCoins().subscribe(res => {
         this.coins = (res.content !==null && res.content !== undefined)? res.content: res;
        //  this.coins = res;
        console.log('test>>>>>',this.coins);
        
      });
    }
  
  deleteCoin(id) {
      this.service.deleteCoin(id).subscribe(res => {          
        if(res.status == 200 && res.success){
            this.router.navigate(['/index']);
            location.reload();
        }
      });
  }
  
}
