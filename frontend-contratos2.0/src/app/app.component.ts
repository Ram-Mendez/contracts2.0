import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MenubarModule} from "primeng/menubar";
import {MenuItem} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  ngOnInit() {

  }
}
