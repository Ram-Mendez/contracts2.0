import {Component, OnInit} from '@angular/core';
import {TreeModule} from "primeng/tree";
import {TreeNode} from "primeng/api";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    TreeModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  files: TreeNode[] = [
    {
      label: 'Contract', selectable: false, expanded: true, expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      children: [
        {label: 'Edit Contract', data: {path: 'editar-contrato', icon: 'pi pi-pencil'}, expanded: true},
        {label: 'Inventory', data: {path: 'inventario/detalles', icon: 'pi pi-list'}, expanded: true},
        {label: 'File Manager', data: {path: 'gestor-archivos', icon: 'pi pi-file'}, expanded: true},
      ]
    },
  ];

}
