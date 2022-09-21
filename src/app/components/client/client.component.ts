import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {ClientService} from "./client.service";
import {IClient} from "../../../model/IClient";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ICompteur} from "../../../model/ICompteur";
import {ConfigService} from "../config/config.service";
import {CompteurService} from "../compteur/compteur.service";
import {IForage} from "../../../model/IForage";
import {IAddCompteurDto} from "../../../model/IAddCompteurDto";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [NgbModalConfig, NgbModal,DatePipe]
})
export class ClientComponent implements OnInit {

  forages: any = []
  villages: any = []
  abonnements: any = []

  titre: String = "Client";
  mailTitre: String = "thiaremohamed.mt@gmail.com";
  mailCara: String = "t";
  client: IClient = Object.create(null);
  clientDetail: IClient = Object.create(null)
  clients: any = []
  clientFormEdit: any
  nom: string = ""
  bool = true


  clientForm = new FormGroup({
    prenom: new FormControl(null, Validators.required),
    nom: new FormControl("", Validators.required),
    dateNaissance: new FormControl("", Validators.required),
    lieuNaissance: new FormControl("", Validators.required),
    sexe: new FormControl("", Validators.required),
    numeroTelephone: new FormControl("",
      [Validators.pattern('^(77|78|76|70|75)[0-9]{7}$'),
        Validators.required]),
    numeroCni: new FormControl("",
      [Validators.required,
        Validators.pattern('^(1|2)[0-9]{12}$')]),
  })


  compteurDto: IAddCompteurDto = Object.create(null);
  compteurForm = new FormGroup({
    typeCompteur: new FormControl(null, Validators.required),
    dateAbonnement: new FormControl(null, Validators.required),
    marque: new FormControl("", Validators.required),

    idForage: new FormControl("", Validators.required),
    idVillage: new FormControl("", Validators.required),
    idAbonnement: new FormControl("", Validators.required),
  })


  constructor(config: NgbModalConfig,
              private modalService: NgbModal,
              public datepipe: DatePipe,
              private configService: ConfigService,
              private compteurService: CompteurService,
              private clientService: ClientService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
    this.loadAll()
  }

  loadAll(){
    this.clients = this.clientService.getClients()
    this.abonnements = this.configService.getAbonnements()
    this.forages = this.configService.getForages()
    this.villages = this.configService.getVillages()
  }

  save(){
    let lastName = this.clientForm.value.nom?.toUpperCase()
    this.clientForm.value.nom = lastName

    this.clientService.addClient(this.clientForm.value).subscribe((res)=>{
      this.loadAll()
    })
  }

  detailClient = async  (id: number, content: any) =>{

    await this.clientService.showClient(id).subscribe((data)=>{
      this.clientDetail = data
      let latest_date =this.datepipe.transform(this.clientDetail.dateNaissance, 'yyyy-MM-dd');
      this.clientFormEdit= new FormGroup({
        id: new FormControl(this.clientDetail.id),
        prenom: new FormControl(this.clientDetail.prenom, Validators.required),
        nom: new FormControl(this.clientDetail.nom, Validators.required),
        dateNaissance: new FormControl(latest_date, Validators.required),
        lieuNaissance: new FormControl(this.clientDetail.lieuNaissance, Validators.required),
        sexe: new FormControl(this.clientDetail.sexe, Validators.required),
        numeroTelephone: new FormControl(this.clientDetail.numeroTelephone, Validators.required),
        numeroCni: new FormControl(this.clientDetail.numeroCni, Validators.required),
      })
      this.modalService.open(content)
    })
  }

  updateClient(clientId: any){
    this.clientService.editClient(this.clientFormEdit.value, clientId).subscribe((res)=>{
      this.loadAll()
    })
  }

  deleteClient(clientId: any){
    this.clientService.deleteClient(clientId).subscribe((res)=>{
      this.loadAll()
    })
  }

  getClientsByNom(nom: string){
    this.clients = this.clientService.getClientsByNom(nom)
    if (nom != null){
      this.bool = false
    }
  }

  loadInit(){
    this.ngOnInit()
    this.bool = true
  }

  ajoutCompteur() {
    this.compteurDto.typeCompteur = this.compteurForm.value.typeCompteur
    this.compteurDto.dateAbonnement = this.compteurForm.value.dateAbonnement
    this.compteurDto.marque = this.compteurForm.value.marque
    this.compteurDto.statut = true
    this.compteurDto.idForage = parseInt(<string>this.compteurForm.value.idForage)
    this.compteurDto.idVillage = parseInt(<string>this.compteurForm.value.idVillage)
    this.compteurDto.idAbonnement = parseInt(<string>this.compteurForm.value.idAbonnement)

    console.log("==================")
    console.log(this.compteurDto)



    this.compteurService.createCompteur(this.compteurDto).subscribe((res) =>{
      this.compteurForm.reset()
    })
  }

  ajoutCompteurPopup(id: number, content: any) {
    this.modalService.open(content)
    this.compteurDto.idClient = id
  }
}

