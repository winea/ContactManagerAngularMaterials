import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  user: User;
  constructor(
    private route: ActivatedRoute,
    private service: UserService) { }

  ngOnInit(): void {
    //localizar o usuario pelo id
    this.route.params.subscribe(params => {
      //receber parametro id
      let id = params['id'];
      if (!id) id = 1;
      this.user = null;

      //se tiver usuario buscar pelo id, permite que f5 carregue o primeiro usuario
      this.service.users.subscribe(users => {
        if (users.length == 0) return;

        //testar o spinner para aparecer por um tempo
        setTimeout(() => {
          this.user = this.service.userById(id);
        }, 500)

      });

    })
  }

}
