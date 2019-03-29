import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoinService } from '../coin.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { IndexComponent } from '../index/index.component';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  note: any;
  angForm: FormGroup;
  indexComponent: IndexComponent;
  titleName = 'Edit Note';
  constructor(private route: ActivatedRoute, private router: Router, private service: CoinService, private fb: FormBuilder ) {
    this.createForm();
   }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      price: ['', Validators.required ]
   });
  }

  updatenote(title, content) {
     
    this.route.params.subscribe(params => {
    this.service.updateNote(title, content, params['id']);
    this.router.navigate(['/index']);
    //location.reload();
  });
}
  
//ameen code

  ngOnInit() {
    this.route.params.subscribe(params => {
     this.service.editNote(params['id']).subscribe(res => {      
         console.log('res>>>>>>>>',res);          
          this.note = res;
      });
    });
  }
}



