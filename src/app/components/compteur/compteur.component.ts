import { Component, OnInit } from '@angular/core';
import {CompteurService} from "./compteur.service";

@Component({
  selector: 'app-compteur',
  templateUrl: './compteur.component.html',
  styleUrls: ['./compteur.component.scss']
})
export class CompteurComponent implements OnInit {

  compteurs: any = []
  constructor(private compteurService: CompteurService) { }

  ngOnInit(): void {
    this.loadAll()
  }

  loadAll() {
    this.compteurService.getCompteurs().subscribe((res) =>{
      this.compteurs = res
    })
  }
}
