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
  utilisateurDetail: any = Object.create(null)

  userForm = new FormGroup({
    prenom: new FormControl("", Validators.required),
    nom: new FormControl("", Validators.required),
    date_naissance: new FormControl("", Validators.required),
    lieu_naissance: new FormControl("", Validators.required),
    sexe: new FormControl("", Validators.required),
    libelle: new FormControl("", Validators.required),
    numero_telephone: new FormControl("",
      [Validators.pattern('^(77|78|76|70|75)[0-9]{7}$'),
        Validators.required]),
    numero_cni: new FormControl("",
      [Validators.required,
        Validators.pattern('^(1|2)[0-9]{12}$')]),
    email: new FormControl("", [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl("", Validators.required)
  })


  userFormEdit: any = new FormGroup({
    prenom: new FormControl("null", Validators.required),
    nom: new FormControl("null", Validators.required),
    date_naissance: new FormControl("null", Validators.required),
    lieu_naissance: new FormControl("null", Validators.required),
    sexe: new FormControl("null", Validators.required),
    libelle: new FormControl("null", Validators.required),
    numero_telephone: new FormControl("null",
      [Validators.pattern('^(77|78|76|70|75)[0-9]{7}$'),
        Validators.required]),
    numero_cni: new FormControl("null",
      [Validators.required,
        Validators.pattern('^(1|2)[0-9]{12}$')]),
    email: new FormControl("null", [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl("null", Validators.required)
  })



  removeRoleForm = new FormGroup({
    email: new FormControl("", [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    libelle: new FormControl("", Validators.required)
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
    this.utilisateurService.addUtilisateur(this.userForm.value, this.userForm.value.libelle).subscribe((data)=> {
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

  detailUtilisateur = async  (id: number, content: any) =>{

      await this.utilisateurService.showUtilisateur(id).subscribe((data)=>{
        this.utilisateurDetail = data

        this.userFormEdit= new FormGroup({
          prenom: new FormControl(this.utilisateurDetail.prenom),
          nom: new FormControl(this.utilisateurDetail.nom),
          date_naissance: new FormControl(this.utilisateurDetail.date_naissance),
          lieu_naissance: new FormControl(this.utilisateurDetail.lieu_naissance),
          sexe: new FormControl(this.utilisateurDetail.sexe),
          numero_telephone: new FormControl(this.utilisateurDetail.numero_telephone),
          numero_cni: new FormControl(this.utilisateurDetail.numero_cni),
          email: new FormControl(this.utilisateurDetail.email),
          password: new FormControl(this.utilisateurDetail.password),
          libelle: new FormControl(this.utilisateurDetail.role[0].libelle)

      })
        this.modalService.open(content)
      })
  }

  // removeRole(){
  //   this.utilisateurService.removeRole(this.removeRoleForm.value).subscribe(()=>{
  //     this.removeRoleForm.reset()
  //     this.ngOnInit()
  //   })
  // }
}
