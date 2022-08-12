import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {ClientService} from "./client.service";
import {IClient} from "../../../model/IClient";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ClientComponent implements OnInit {

  titre: String = "Client";
  mailTitre: String = "thiaremohamed.mt@gmail.com";
  mailCara: String = "t";
  client: IClient = Object.create(null);
  clients: any = []

  clientForm = new FormGroup({
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
        Validators.pattern('^(1|2)[0-9]{12}$')]),
  })


  constructor(config: NgbModalConfig,
              private modalService: NgbModal,
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
    this.clientService.addClient(this.clientForm.value).subscribe(res=>{
      this.loadAll()
    })
  }
}

