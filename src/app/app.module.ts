
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { TwoColumnsLayoutComponent } from './layouts/2-columns-layout/2-columns-layout.component';

import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { DeactivateGuard } from './services/deactivate-guard.service';


import * as $ from 'jquery';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { NavbarPublicComponent } from './shared/navbar-public/navbar-public.component';






@NgModule({
    declarations: [
        AppComponent,
        TwoColumnsLayoutComponent,
        PublicLayoutComponent,
        NavbarPublicComponent
    ],
    imports: [
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        AppRoutingModule,
        BrowserModule,
        HttpModule,
        HttpClientModule,
        SharedModule,
        NgbModule.forRoot()
    ],
    providers: [
        AuthService,
        AuthGuard,
        DeactivateGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
