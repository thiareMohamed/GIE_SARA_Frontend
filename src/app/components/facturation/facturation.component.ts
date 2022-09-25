import {Component, OnInit} from '@angular/core';
import {FactureService} from "./facture.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {DatePipe} from "@angular/common";
import {IFacture} from "../../../model/IFacture";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ICompteur} from "../../../model/ICompteur";

@Component({
  selector: 'app-facturation',
  templateUrl: './facturation.component.html',
  styleUrls: ['./facturation.component.scss'],
  providers: [NgbModalConfig, NgbModal,DatePipe]

})
export class FacturationComponent implements OnInit {
  factures: any = [];
  facture: IFacture = Object()
  factureForm = new FormGroup ({
    numeroFacture: new FormControl(null, Validators.required),
    newIndex: new FormControl(null, Validators.required)
  });

  constructor(private factureService: FactureService,
              public datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.loadAll()
  }

  loadAll () {
    this.factureService.getAll().subscribe((res)=>{
      this.factures = res
      console.log(res)
    })
  }

  save() {
    this.facture.nouvelIndex = this.factureForm.value.newIndex
    this.facture.code = this.factureForm.value.numeroFacture

    this.factureService.createFacture(this.facture).subscribe((res)=>{
      this.ngOnInit()
      this.factureForm.reset()
    })
  }
}
