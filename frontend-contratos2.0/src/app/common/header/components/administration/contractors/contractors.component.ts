import { Component } from '@angular/core';
import {AddContractorComponent} from "./add-contractor/add-contractor.component";
import {ListContractorComponent} from "./list-contractor/list-contractor.component";

@Component({
  selector: 'app-contractors',
  standalone: true,
  imports: [
    AddContractorComponent,
    ListContractorComponent
  ],
  templateUrl: './contractors.component.html',
  styleUrl: './contractors.component.css'
})
export class ContractorsComponent {

}
