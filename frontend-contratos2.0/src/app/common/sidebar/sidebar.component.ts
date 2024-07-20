import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ContratosService} from "../../contratos/service/contratos.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  contractId: number = 0;

  constructor(private route: ActivatedRoute, private contratosService: ContratosService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contractId = params['id'];
    })
  }


}
