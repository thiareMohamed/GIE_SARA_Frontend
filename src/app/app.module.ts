import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BashboardComponent } from './bashboard/bashboard.component';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './client/client.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { FacturationComponent } from './facturation/facturation.component';
import { CompteurComponent } from './compteur/compteur.component';
import {RouterModule, Routes} from "@angular/router";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BashboardComponent,
    HomeComponent,
    ClientComponent,
    UtilisateurComponent,
    FacturationComponent,
    CompteurComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( [
      {path:"", component: HomeComponent},
      {path:"accueil", component: HomeComponent},
      {path:"accueil", component: HomeComponent},
      {path:"client", component: ClientComponent},
      {path:"utilisateur", component: UtilisateurComponent},
      {path:"facture", component: FacturationComponent},
      {path:"compteur", component: CompteurComponent},
      {path:"login", component: LoginComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
