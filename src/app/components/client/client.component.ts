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
    date_naissance: new FormControl("", Validators.required),
    lieu_naissance: new FormControl("", Validators.required),
    sexe: new FormControl("", Validators.required),
    numero_telephone: new FormControl("",
      [Validators.pattern('^(77|78|76|70|75)[0-9]{7}$'),
        Validators.required]),
    numero_cni: new FormControl("",
      [Validators.required,
        Validators.pattern('^(1|2)[0-9]{12}$')]),
  })


  compteurDto: IAddCompteurDto = Object.create(null);
  compteurForm = new FormGroup({
    type_compteur: new FormControl(null, Validators.required),
    date_abonnement: new FormControl(null, Validators.required),
    marque_compteur: new FormControl("", Validators.required),

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
    this.clientService.addClient(this.clientForm.value).subscribe((res)=>{
      this.loadAll()
    })
  }

  detailClient = async  (id: number, content: any) =>{

    await this.clientService.showClient(id).subscribe((data)=>{
      this.clientDetail = data
      let latest_date =this.datepipe.transform(this.clientDetail.date_naissance, 'yyyy-MM-dd');
      this.clientFormEdit= new FormGroup({
        id: new FormControl(this.clientDetail.id),
        prenom: new FormControl(this.clientDetail.prenom, Validators.required),
        nom: new FormControl(this.clientDetail.nom, Validators.required),
        date_naissance: new FormControl(latest_date, Validators.required),
        lieu_naissance: new FormControl(this.clientDetail.lieu_naissance, Validators.required),
        sexe: new FormControl(this.clientDetail.sexe, Validators.required),
        numero_telephone: new FormControl(this.clientDetail.numero_telephone, Validators.required),
        numero_cni: new FormControl(this.clientDetail.numero_cni, Validators.required),
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
    this.compteurDto.type_compteur = this.compteurForm.value.type_compteur
    this.compteurDto.date_abonnement = this.compteurForm.value.date_abonnement
    this.compteurDto.marque_compteur = this.compteurForm.value.marque_compteur
    this.compteurDto.statut = true
    this.compteurDto.idForage = parseInt(<string>this.compteurForm.value.idForage)
    this.compteurDto.idVillage = parseInt(<string>this.compteurForm.value.idVillage)
    this.compteurDto.idAbonnement = parseInt(<string>this.compteurForm.value.idAbonnement)

    console.log("==================")
    console.log(this.compteurForm.value)
  }

  ajoutCompteurPopup(id: number, content: any) {
    this.modalService.open(content)
    this.compteurDto.idClient = id
  }
}

