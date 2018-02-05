import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


export class MyOwnCustomMaterialModule { }

import { AppComponent } from './app.component';
import { TheFormComponent } from './the-form/the-form.component';
import { AddbFormComponent } from './addb-form/addb-form.component';
import { UpdbFormComponent } from './updb-form/updb-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
{ path: 'app-addb-form', component: AddbFormComponent, canActivate:[AuthGuard] },
{ path: 'dashboard', component: TheFormComponent, canActivate:[AuthGuard] },
{ path: 'app-updb-form', component: UpdbFormComponent, canActivate:[AuthGuard] },
{ path: 'register', component: RegisterComponent },
{ path: 'login', component: LoginComponent },
{ path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] },
{ path: 'home', component: HomeComponent}
{ path: '**', component: HomeComponent }
];

@NgModule({
	declarations: [
	AppComponent,
	TheFormComponent,
	AddbFormComponent,
	UpdbFormComponent,
	NavbarComponent,
	LoginComponent,
	RegisterComponent,
	ProfileComponent,
	HomeComponent
	],
	imports: [
	BrowserModule, FormsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule, MatGridListModule, MatCardModule, HttpModule, RouterModule.forRoot( appRoutes ) , MatButtonModule, FlashMessagesModule.forRoot()
	],
	exports: [ MatButtonModule, MatCheckboxModule, MatFormFieldModule],
	providers: [ValidateService,AuthService, AuthGuard],
	bootstrap: [AppComponent]
})
export class AppModule { }
