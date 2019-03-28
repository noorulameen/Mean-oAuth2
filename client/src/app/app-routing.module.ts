import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/index';
import { AuthGuard } from './_guards/index';







const routes: Routes = [
      { path: 'login', component: LoginComponent },

      { path: 'create', 
        component: CreateComponent ,
        canActivate:[AuthGuard]
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        canActivate:[AuthGuard]
      },
      { path: 'index',
        component: IndexComponent,
        canActivate:[AuthGuard]
      }
                        
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule,ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
