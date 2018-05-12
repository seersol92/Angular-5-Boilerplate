import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { ApiService } from './../../services/api.service';
import { RegisterComponent } from './register.component';


const routes: Routes = [
  {
    path: '',
     component: RegisterComponent,
    data: {
      title: ''
    },
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AuthService,
    ApiService
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
