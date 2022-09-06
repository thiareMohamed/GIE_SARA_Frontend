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
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    login: new FormControl("", Validators.required),
    role: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl("", Validators.required)
  })


  userFormEdit: any = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    login: new FormControl("", Validators.required),
    role: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl("", Validators.required)
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
    this.utilisateurService.addUtilisateur(this.userForm.value, this.userForm.value.role).subscribe((data)=> {
      this.utilisateurList = data
      this.ngOnInit()
      this.userForm.reset()
    })
  }

  deleteUtilisateur(login: string) {
   if (confirm("Voulez-vous vraiment supprimer l'utilisateur")){
     this.utilisateurService.deleteUtilisateur(login).subscribe((data)=>{
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
          firstName: new FormControl(this.utilisateurDetail.prenom, Validators.required),
          lastName: new FormControl(this.utilisateurDetail.nom, Validators.required),
          login: new FormControl(latest_date, Validators.required),
          email: new FormControl(this.utilisateurDetail.email, Validators.required),
          password: new FormControl(this.utilisateurDetail.password, Validators.required),
          authorities: new FormControl(this.utilisateurDetail.role[0].role, Validators.required)

      })
        this.modalService.open(content)
      })
  }

  updateUtilisateur(id: number) {

    this.idRole = (this.userFormEdit.value.libelle == "ROLE_ADMIN" ? 1 :  2)

    const a =
        [
          {id: this.idRole, libelle: this.userFormEdit.value.libelle}
        ]
    this.userUpdate.id = this.userFormEdit.value.id
    this.userUpdate.email = this.userFormEdit.value.email
    this.userUpdate.lastName = this.userFormEdit.value.nom
    this.userUpdate.firstName = this.userFormEdit.value.prenom
    this.userUpdate.login = this.userFormEdit.value.sexe
    this.userUpdate.password = this.userFormEdit.value.password
    this.userUpdate.authorities = a
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
