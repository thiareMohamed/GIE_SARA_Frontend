import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/bashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ClientComponent } from './components/client/client.component';
import { UtilisateurComponent } from './components/utilisateur/utilisateur.component';
import { FacturationComponent } from './components/facturation/facturation.component';
import { CompteurComponent } from './components/compteur/compteur.component';
import {RouterModule, Routes} from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ConfigComponent } from './components/config/config.component';
import {authInterceptorProviders} from "./guard/auth.intercenptor";
import {AdminGuard} from "./guard/admin.guard";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    ClientComponent,
    UtilisateurComponent,
    FacturationComponent,
    CompteurComponent,
    ConfigComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "accueil",
        component: HomeComponent,
        pathMatch: "full",
        canActivate: [AdminGuard],
      },
      {
        path: "client",
        component: ClientComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "utilisateur",
        component: UtilisateurComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "facture",
        component: FacturationComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "compteur",
        component: CompteurComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "config",
        component: ConfigComponent,
        canActivate: [AdminGuard],
      },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "",
        redirectTo: "/login",
        pathMatch: "full",
      },
      {
        path: "**",
        redirectTo: "/login"
      }
    ]),
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders, {provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
