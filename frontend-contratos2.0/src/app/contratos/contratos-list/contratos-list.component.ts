import {Component, OnInit} from '@angular/core';
import {ContratosService} from "../service/contratos.service";
import {Contratos} from "../service/contratos";
import {Button} from "primeng/button";
import {TreeTableModule} from "primeng/treetable";
import {TreeNode} from "primeng/api";
import {TableModule} from "primeng/table";
import {DatePipe} from "@angular/common";
import {SidebarComponent} from "../../common/sidebar/sidebar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-contratos-list',
  standalone: true,
  imports: [
    Button,
    TreeTableModule,
    TableModule,
    DatePipe,
    SidebarComponent,
    RouterOutlet
  ],
  templateUrl: './contratos-list.component.html',
  styleUrl: './contratos-list.component.css'
})
export class ContratosListComponent implements OnInit {
  contratos: Contratos[] = [];


  constructor(private contratoService: ContratosService) {
  }

  ngOnInit() {
    this.getContratos();
  }

  getContratos() {
    this.contratoService.getContratos().subscribe(
      contratos => {
        console.log(contratos)
        this.contratos = contratos;
      }
    )
  }

  editContract() {

  }

  createContract() {

  }

  deleteContract() {

  }
}
