import { Component, OnInit } from '@angular/core';
import {CompteurService} from "./compteur.service";
import {ConfigService} from "../config/config.service";
import {ClientService} from "../client/client.service";
import {IAddCompteurDto} from "../../../model/IAddCompteurDto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {IClient} from "../../../model/IClient";
import {DatePipe} from "@angular/common";
import {ICompteur} from "../../../model/ICompteur";

@Component({
  selector: 'app-compteur',
  templateUrl: './compteur.component.html',
  styleUrls: ['./compteur.component.scss'],
  providers: [NgbModalConfig, NgbModal,DatePipe]
})
export class CompteurComponent implements OnInit {

  forages: any = []
  villages: any = []
  abonnements: any = []
  compteurs: any = []
  clients: any = []


  compteurDto: IAddCompteurDto = Object.create(null);
  compteurForm: ICompteur = Object.create(null)
  compteurFormEdit: any

  constructor(private compteurService: CompteurService,
              private configService: ConfigService,
              private modalService: NgbModal,
              public datepipe: DatePipe,
              private clientService: ClientService ) { }

  ngOnInit(): void {
    this.loadAll()
  }

  loadAll() {
    this.compteurService.getCompteurs().subscribe((res) =>{
      this.compteurs = res
    })

    this.clients = this.clientService.getClients()
    this.abonnements = this.configService.getAbonnements()
    this.forages = this.configService.getForages()
    this.villages = this.configService.getVillages()
  }

  delete(id: number) {
    this.compteurService.deleteCompteur(id).subscribe((res)=>{
      this.ngOnInit()
    })
  }

  setStatutCompteur(id: number) {
    this.compteurService.setStatus(id).subscribe((res)=>{
        this.ngOnInit()
    })
  }

  edit(id: number) {
    this.compteurDto.id = id
    this.compteurDto.typeCompteur = this.compteurFormEdit.value.typeCompteur
    this.compteurDto.dateAbonnement = this.compteurFormEdit.value.dateAbonnement
    this.compteurDto.marque = this.compteurFormEdit.value.marque
    this.compteurDto.idClient = parseInt(<string>this.compteurFormEdit.value.idClient)
    this.compteurDto.idForage = parseInt(<string>this.compteurFormEdit.value.idForage)
    this.compteurDto.idVillage = parseInt(<string>this.compteurFormEdit.value.idVillage)
    this.compteurDto.idAbonnement = parseInt(<string>this.compteurFormEdit.value.idAbonnement)

    console.log("==================")
    console.log(this.compteurDto)

    this.compteurService.editCompteur(this.compteurDto.id, this.compteurDto).subscribe((res) =>{
      this.compteurFormEdit.reset()
      this.ngOnInit()
    })
  }

  detailCompteur = async (id: number, contentEdit: any) => {
    await this.compteurService.showCompteur(id).subscribe((data)=>{
      this.compteurForm = data
      let latest_date =this.datepipe.transform(this.compteurForm.dateAbonnement, 'yyyy-MM-dd');
      this.compteurFormEdit = new FormGroup({
        id: new FormControl(id),
        typeCompteur: new FormControl(this.compteurForm.typeCompteur),
        dateAbonnement: new FormControl(latest_date),
        marque: new FormControl(this.compteurForm.marque),
        idClient: new FormControl(this.compteurForm.client?.id),

        idForage: new FormControl(this.compteurForm.forage?.id),
        idVillage: new FormControl(this.compteurForm.village?.id),
        idAbonnement: new FormControl(this.compteurForm.abonnement?.id),
      })
      this.modalService.open(contentEdit)
    })
  }

  open(content: any) {
    this.modalService.open(content);
  }
}
