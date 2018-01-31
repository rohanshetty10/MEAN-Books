import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


export class MyOwnCustomMaterialModule { }

import { AppComponent } from './app.component';
import { TheFormComponent } from './the-form/the-form.component';
import { AddbFormComponent } from './addb-form/addb-form.component';
import { UpdbFormComponent } from './updb-form/updb-form.component';

const appRoutes: Routes = [
{ path: 'app-addb-form', component: AddbFormComponent },
{ path: 'app-the-form', component: TheFormComponent },
{ path: 'app-updb-form', component: UpdbFormComponent },
{ path: '**', component: TheFormComponent }
];

@NgModule({
	declarations: [
	AppComponent,
	TheFormComponent,
	AddbFormComponent,
	UpdbFormComponent
	],
	imports: [
	BrowserModule, FormsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule, MatGridListModule, HttpModule, RouterModule.forRoot( appRoutes ) , MatButtonModule
	],
	exports: [ MatButtonModule, MatCheckboxModule, MatFormFieldModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
