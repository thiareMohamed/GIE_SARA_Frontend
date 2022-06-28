import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {UtilisateurService} from "../services/utilisateur.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class UtilisateurComponent implements OnInit {
  utilisateurList: any = []
  userForm: any;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private utilisateurService: UtilisateurService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.utilisateurList = this.utilisateurService.getUtilisateurs()
  }

  open(content: any) {
    this.modalService.open(content)
  }
}
