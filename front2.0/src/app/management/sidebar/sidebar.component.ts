import {Component, OnInit} from '@angular/core';
import {TreeModule} from "primeng/tree";
import {TreeNode} from "primeng/api";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [TreeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }



}
