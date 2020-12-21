import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  avatars = [
    'svg-1', 'svg-2', 'svg-3', 'svg-4'
  ];

  user: User;

  constructor(
    private dialogRef: MatDialogRef<NewContactDialogComponent>,
    private userService: UserService) { }

  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }

  ngOnInit(): void {
    this.user = new User();
  }

  //ACOES BOTOES
  save() {
    //passar para esta variavel o valor que vem pelo formulario
    this.user.name = this.name.value;

    //this.dialogRef.close(user); //passa o usuario que foi criado

    //metodo do User service
    this.userService.addUser(this.user).then(user => {
      this.dialogRef.close(user); //passa o usuario que foi criado
    });

  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
