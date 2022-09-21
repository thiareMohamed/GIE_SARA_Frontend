import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {ConfigService} from "../config/config.service";
import {IVillage} from "../../../model/IVillage";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ICommune} from "../../../model/ICommune";
import {IForage} from "../../../model/IForage";
import {ICompteur} from "../../../model/ICompteur";
import {IAbonnement} from "../../../model/IAbonnement";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  providers:[NgbModalConfig]
})
export class ConfigComponent implements OnInit {

  modal1: boolean = true
  modal2: boolean = true
  modal3: boolean = true

  villages: any = []
  village: IVillage = Object.create(null)
  villageDetail: IVillage = Object.create(null)
  villageForm = new FormGroup({
    nom: new FormControl("", Validators.required),
  })
  villageFormEdit: any


  forages: any = []
  forage: IForage = Object.create(null)
  forageDetail: IForage = Object.create(null)
  forageForm = new FormGroup({
    nomSite: new FormControl("", Validators.required),
    longitude: new FormControl("", Validators.required),
    latitude: new FormControl("", Validators.required),
    dateInstallation: new FormControl("", Validators.required),
    profondeurForage: new FormControl("", Validators.required),
    hauteur: new FormControl("", Validators.required),
    capacite: new FormControl("", Validators.required),
    hauteurSousRadier: new FormControl("", Validators.required),
    typeParatonerre: new FormControl("", Validators.required),
    typeReservoir: new FormControl("", Validators.required),
    capaciteReservoir: new FormControl("", Validators.required),
  })
  forageFormEdit: any


  abonnements: any = []
  abonnement: IAbonnement = Object.create(null)
  abonnementDetail: IAbonnement = Object.create(null)
  abonnementForm = new FormGroup({
    libelle: new FormControl("", Validators.required),
    prixUnitaire: new FormControl("", Validators.required),
  })
  abonnementFormEdit: any


  constructor(private modalService: NgbModal,
              private configService: ConfigService,
              ) { }

  ngOnInit(): void {
    this.loadAll()
  }

  loadAll(){
    this.configService.getVillages().subscribe((res) =>{
      this.villages = res
    })
    this.configService.getForages().subscribe((res) =>{
      this.forages = res
    })
    this.configService.getAbonnements().subscribe((res) =>{
      this.abonnements = res
    })
  }

  // Blog village
  deleteVillage(id: number){
    this.configService.deleteVillage(id).subscribe((res)=>{
      this.ngOnInit()
    })
  }

  ajouterVillage(){
    this.village.nom = this.villageForm.value.nom
    this.village.commune = {
      id:1,
      nom: "Keur Samba Gueye",
    }
    this.configService.createVillage(this.village).subscribe((res)=>{
      this.ngOnInit()
    })
  }

  editVillage(idVillage: number) {
    this.configService.updateVillage(this.villageFormEdit.value, idVillage).subscribe(res=>{
      this.ngOnInit()
    })
  }

  async detailVillage(id: any, content: any) {
    await this.configService.findVillage(id).subscribe(res=>{
      this.villageDetail = res
      this.villageFormEdit = new FormGroup({
        id: new FormControl(this.villageDetail.id),
        nom: new FormControl(this.villageDetail.nom),
      })
      this.open(content)
    })
  }


  // Blog forage
  deleteForage(id: number){
    this.configService.deleteForage(id).subscribe((res)=>{
      this.ngOnInit()
    })
  }

  ajouterForage(){
    this.configService.createForage(<IForage>this.forageForm.value).subscribe((res)=>{
      this.ngOnInit()
    })
  }

  editForage(idForage: number) {
    this.configService.updateForage(this.forageFormEdit.value, idForage).subscribe(res=>{
      this.ngOnInit()
    })
  }

  async detailForage(id: any, content: any) {
    await this.configService.findForage(id).subscribe(res=>{
      this.forageDetail = res
      this.forageFormEdit = new FormGroup({
        id: new FormControl(this.forageDetail.id),
        nomSite: new FormControl(this.forageDetail.nomSite),
        longitude: new FormControl(this.forageDetail.longitude),
        latitude: new FormControl(this.forageDetail.latitude),
        dateInstallation: new FormControl(this.forageDetail.dateInstallation),
        profondeurForage: new FormControl(this.forageDetail.profondeurForage),
        hauteur: new FormControl(this.forageDetail.hauteur),
        capacite: new FormControl(this.forageDetail.capacite),
        hauteurSousRadier: new FormControl(this.forageDetail.hauteurSousRadier),
        typeParatonerre: new FormControl(this.forageDetail.typeParatonerre),
        typeReservoir: new FormControl(this.forageDetail.typeReservoir),
        capaciteReservoir: new FormControl(this.forageDetail.capaciteReservoir),

      })
      this.open(content)
    })
  }



  // Blog abonnement
  deleteAbonnement(id: number){
    this.configService.deleteAbonnement(id).subscribe((res)=>{
      this.ngOnInit()
    })
  }

  ajouterAbonnement(){
    this.configService.createAbonnement(<IAbonnement>this.abonnementForm.value).subscribe((res)=>{
      this.ngOnInit()
    })
  }

  editAbonnement(idAbonnement: number) {
    this.configService.updateAbonnement(this.abonnementFormEdit.value, idAbonnement).subscribe(res=>{
      this.ngOnInit()
    })
  }

  async detailAbonnement(id: any, content: any) {
    await this.configService.findAbonnement(id).subscribe(res=>{
      this.abonnementDetail = res
      this.abonnementFormEdit = new FormGroup({
        id: new FormControl(this.abonnementDetail.id),
        libelle: new FormControl(this.abonnementDetail.libelle),
        prixUnitaire: new FormControl(this.abonnementDetail.prixUnitaire),
      })
      this.open(content)
    })
  }






  open(content: any) {
    this.modalService.open(content);
  }

  modal(number: number){
    if (number == 1){
      this.modal1 = false
      this.modal2 = true
      this.modal3 = true
    }

    if (number == 2){
      this.modal1 = true
      this.modal2 = false
      this.modal3 = true
    }

    if (number == 3){
      this.modal1 = true
      this.modal2 = true
      this.modal3 = false
    }
  }


}
