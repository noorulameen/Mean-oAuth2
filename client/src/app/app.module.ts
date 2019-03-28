import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { CoinService } from './coin.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './_helpers/index';


import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService } from './_services/index';







@NgModule({
    
  declarations: [
    AppComponent,
    IndexComponent,
    CreateComponent,
    EditComponent,
    LoginComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,HttpModule,FormsModule
  ],
  providers: [CoinService,AuthGuard,AuthenticationService,UserService,
                            {
                  provide: HTTP_INTERCEPTORS,
                  useClass: JwtInterceptor,
                  multi: true
              },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
