import { Component, OnInit ,NgZone} from '@angular/core';
import { CoinService } from '../coin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    titlename = 'Add Note';
    angForm: FormGroup;
    constructor(private coinservice: CoinService, private fb: FormBuilder, private router:Router,private _ngZone: NgZone) {
        this.createForm();
       }
    createForm() {
        this.angForm = this.fb.group({
          title: ['', Validators.required ],
          contenet: ['', Validators.required ]
       });
      }
  
    addnote(name, price) {
      this.coinservice.addNote(name, price);
          this.router.navigate(['index']);
  }
  ngOnInit() {
      
  }

}
