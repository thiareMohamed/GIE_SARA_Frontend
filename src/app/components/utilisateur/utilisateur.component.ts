import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {UtilisateurService} from "./utilisateur.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { DatePipe } from '@angular/common'
import {IUtilisateur} from "../../../model/IUtilisateur";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss'],
  providers: [NgbModalConfig, NgbModal,DatePipe]
})
export class UtilisateurComponent implements OnInit {


  utilisateurList: any = []
  utilisateurResponse: any = []
  utilisateurDetail: any = Object.create(null)
  userUpdate: IUtilisateur = Object.create(null)
  idRole: number = 0


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


  constructor(config: NgbModalConfig,public datepipe: DatePipe, private modalService: NgbModal, private utilisateurService: UtilisateurService) {
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
        console.log(data)
        this.utilisateurDetail = data
        let latest_date =this.datepipe.transform(this.utilisateurDetail.date_naissance, 'yyyy-MM-dd');
        this.userFormEdit= new FormGroup({
          id: new FormControl(this.utilisateurDetail.id),
          prenom: new FormControl(this.utilisateurDetail.prenom, Validators.required),
          nom: new FormControl(this.utilisateurDetail.nom, Validators.required),
          date_naissance: new FormControl(latest_date, Validators.required),
          lieu_naissance: new FormControl(this.utilisateurDetail.lieu_naissance, Validators.required),
          sexe: new FormControl(this.utilisateurDetail.sexe, Validators.required),
          numero_telephone: new FormControl(this.utilisateurDetail.numero_telephone, Validators.required),
          numero_cni: new FormControl(this.utilisateurDetail.numero_cni, Validators.required),
          email: new FormControl(this.utilisateurDetail.email, Validators.required),
          password: new FormControl(this.utilisateurDetail.password, Validators.required),
          libelle: new FormControl(this.utilisateurDetail.role[0].libelle, Validators.required)

      })
        this.modalService.open(content)
      })
  }

  updateUtilisateur(id: number) {

    this.idRole = (this.userFormEdit.value.libelle == "ADMIN" ? 1 : (this.userFormEdit.value.libelle == "RELEVEUR" ? 2 : 3))

    const a =
        [
          {id: this.idRole, libelle: this.userFormEdit.value.libelle}
        ]
    this.userUpdate.id = this.userFormEdit.value.id
    this.userUpdate.date_naissance = this.userFormEdit.value.date_naissance
    this.userUpdate.email = this.userFormEdit.value.email
    this.userUpdate.numero_cni = this.userFormEdit.value.numero_cni
    this.userUpdate.numero_telephone = this.userFormEdit.value.numero_telephone
    this.userUpdate.lieu_naissance = this.userFormEdit.value.lieu_naissance
    this.userUpdate.nom = this.userFormEdit.value.nom
    this.userUpdate.prenom = this.userFormEdit.value.prenom
    this.userUpdate.sexe = this.userFormEdit.value.sexe
    this.userUpdate.password = this.userFormEdit.value.password
    this.userUpdate.role = a
    console.log(this.userUpdate )

    this.utilisateurService.EditUtilisateur(this.userUpdate, id).subscribe((data)=> {
      this.utilisateurList = data
      this.ngOnInit()
      this.userFormEdit.reset()
    })
  }

  utilisateurEditCollection(){
    console.warn(this.userFormEdit.value)
  }


  // removeRole(){
  //   this.utilisateurService.removeRole(this.removeRoleForm.value).subscribe(()=>{
  //     this.removeRoleForm.reset()
  //     this.ngOnInit()
  //   })
  // }
}
