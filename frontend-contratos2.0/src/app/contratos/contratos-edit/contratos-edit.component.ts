import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {FloatLabelModule} from "primeng/floatlabel";
import {ChipsModule} from "primeng/chips";
import {ActivatedRoute, Router} from "@angular/router";
import {ContratosService} from '../service/contratos.service';
import {MultiSelectModule} from "primeng/multiselect";

@Component({
  selector: 'app-contratos-edit',
  standalone: true,
  imports: [
    Button,
    FloatLabelModule,
    ChipsModule,
    MultiSelectModule
  ],
  templateUrl: './contratos-edit.component.html',
  styleUrl: './contratos-edit.component.css'
})
export class ContratosEditComponent implements OnInit {
  contractId: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private contratoService: ContratosService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contractId = params['id'];
      console.log('Contract ID: ', this.contractId);
    })
  }

}
