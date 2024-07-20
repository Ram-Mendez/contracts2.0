import {Component, OnInit} from '@angular/core';
import {ContratosService} from "../service/contratos.service";
import {Contratos} from "../service/contratos";
import {Button} from "primeng/button";
import {TreeTableModule} from "primeng/treetable";
import {TreeNode} from "primeng/api";
import {TableModule} from "primeng/table";
import {DatePipe} from "@angular/common";
import {SidebarComponent} from "../../common/sidebar/sidebar.component";
import {Router, RouterOutlet} from "@angular/router";

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
  isContractSelected: boolean = false;
  id: number = 0;


  constructor(private contratoService: ContratosService, private router: Router) {
  }

  ngOnInit() {
    this.getContratos();
  }

  getContratos() {
    this.contratoService.getContratos().subscribe(
      contratos => {
        this.contratos = contratos;
      }
    )
  }

  editContract() {
    if (!this.isContractSelected) {
      return;
    }
    this.router.navigate(['/home/contracts-edit/', this.id]);

  }

  createContract() {

  }

  deleteContract() {

  }

  onRowSelect(event: any) {
    this.isContractSelected = true;
    this.id = event.data.id;
    console.log("id", this.id)
  }

  onRowUnselect(event: any) {
    this.isContractSelected = false;
  }

}
