import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

   //media query, verificar alteracao tamanho display
   //usar BreakpointObserver
   public isScreenSmall: boolean;

   //criar user modelo User Observable
   users: Observable<User[]>;
   isDarkTheme: boolean = false;
   dir: string = 'ltr';

   constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router) { }

    //necessario declarar #sidenav no html para localiza-lo
    @ViewChild(MatSidenav) sidenav: MatSidenav;

    //Trocar tema
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
    }

    // mudar a cada vez que clicar para left ltr, right rtl
    toggleDir() {
      this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
    }

  ngOnInit(): void {
    //reagir as mudanças qdo alterar tamanho display, definido breakpoint
    //this.breakpointObserver.observe([Breakpoints.XSmall])
    this.breakpointObserver
    .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`]) //720px
    .subscribe((state: BreakpointState) => {
      this.isScreenSmall = state.matches; //verificar se o breakpoint corresponde
    });

    //inicializa user observable com os usuarios que estao sendo expostos pelo serviço
    this.users = this.userService.users;
    this.userService.loadAll();

    //subscribe para executar o observable
    // this.users.subscribe(data => {
    //   console.log(data);
    // })

    this.users.subscribe(data => {
      //se houver data ira navegar e mostrar o primeiro usuario
      if(data.length > 0) {
        this.router.navigate(['/contactmanager', data[0].id]);
      }
    })

    //fechar o sidenav apos selecionar user
    this.router.events.subscribe(() => {
      if (this.isScreenSmall) {
        this.sidenav.close(); //pegamos o id do html
      }
    });
  }



}
