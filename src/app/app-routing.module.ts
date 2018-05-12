import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { TwoColumnsLayoutComponent } from './layouts/2-columns-layout/2-columns-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { APP_ROUTES } from './shared/routes/app-routing.routes';


import { AuthGuard } from './services/auth-guard.service';
import { DeactivateGuard } from './services/deactivate-guard.service';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  { path: '', component: TwoColumnsLayoutComponent, data: { title: '' }, children: APP_ROUTES, canActivate: [AuthGuard] },
  { path: '',
    component: PublicLayoutComponent,
    canActivate: [DeactivateGuard],
    data: { title: '' },
    children: [
    {
      path: 'home',
      loadChildren: './pages/home/home.module#HomeModule'
    },
    {
      path: 'register',
      loadChildren: './pages/register/register.module#RegisterModule'
    },
    {
      path: 'login',
      loadChildren: './pages/login/login.module#LoginModule'
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
