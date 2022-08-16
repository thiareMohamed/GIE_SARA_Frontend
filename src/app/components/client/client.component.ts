import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {ClientService} from "./client.service";
import {IClient} from "../../../model/IClient";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [NgbModalConfig, NgbModal,DatePipe]
})
export class ClientComponent implements OnInit {

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


  constructor(config: NgbModalConfig,
              private modalService: NgbModal,
              public datepipe: DatePipe,
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

}

