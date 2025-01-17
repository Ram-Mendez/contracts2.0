import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../../common/header/header.component";
import {FooterComponent} from "../../common/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
