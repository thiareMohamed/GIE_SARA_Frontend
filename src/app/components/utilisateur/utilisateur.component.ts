import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {UtilisateurService} from "../../services/utilisateur.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class UtilisateurComponent implements OnInit {


  utilisateurList: any = []
  utilisateurResponse: any = []

  userForm = new FormGroup({
    prenom: new FormControl("", Validators.required),
    nom: new FormControl("", Validators.required),
    date_naissance: new FormControl("", Validators.required),
    lieu_naissance: new FormControl("", Validators.required),
    sexe: new FormControl("", Validators.required),
    numero_telephone: new FormControl("",
      [Validators.pattern('^(77|78|76|70|75)[0-9]{7}$'),
                                                Validators.required]),

    numero_cni: new FormControl("",
                                      [Validators.required,
                                        Validators.pattern('^(77)[0-9]{13}$')]),

    email: new FormControl("", [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl("", Validators.required)
  })


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

  showUtilisateur() {
    this.utilisateurService.addUtilisateur(this.userForm.value).subscribe((data)=>{
      this.utilisateurList = data
      this.ngOnInit()
      this.userForm.reset()
    })
  }

  deleteUtilisateur(id: number) {
   if (confirm("Voulez-vous vraiment supprimer l'utilisateur")){
     this.utilisateurService.deleteUtilisateur(id).subscribe((data)=>{
       this.utilisateurList = data
       this.ngOnInit()
     })
   }
  }
}
