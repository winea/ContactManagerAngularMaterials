import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contactmanager-app',
  template: `
    <app-sidenav></app-sidenav>
  `,
  styles: [
  ]
})
export class ContactmanagerAppComponent implements OnInit {

  //carregar as imagens para todos os componentes filho
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    //como ha varios icones no arquivo usar addSvgIconSet
    //necessario usar url safe DomSanitizer -> sanitizer.bypassSecurityTrustResourceUrl
    iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg'));
   }

  ngOnInit(): void {
  }

}
