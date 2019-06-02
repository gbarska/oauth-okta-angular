import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule
} from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';

import { AppComponent } from './app.component';
import { SugarLevelListComponent } from './sugarlevel-list/sugarlevel-list.component';
import { SugarLevelEditComponent } from './sugarlevel-edit/sugarlevel-edit.component';
import SugarLevelService from './shared/api/sugar-level.service';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { UserLogin } from './shared/services/user-login.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'sugarlevel-list',
    component: SugarLevelListComponent
  },
  {
    path: 'sugarlevel-add',
    component: SugarLevelEditComponent
  },
  {
    path: 'sugarlevel-edit/:id',
    component: SugarLevelEditComponent
  },
  { path: 'implicit/callback', component: OktaCallbackComponent }
];

const config = {
  issuer: 'https://dev-966732.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oao08ij05GieDQcT356'
};

@NgModule({
  declarations: [
    AppComponent,
    SugarLevelListComponent,
    SugarLevelEditComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    OktaAuthModule.initAuth(config)
  ],
  providers: [
    SugarLevelService,
    UserLogin,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}