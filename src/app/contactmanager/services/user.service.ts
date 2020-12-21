import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserService {

  //nao queremos que outros componentes possam manipular estes dados
  //chamar observable que ficara esposto para demais componentes
  private _users: BehaviorSubject<User[]>;

  private dataStore: {
    users: User[];
  }

  //usar http para pegar dados da API
  constructor(private http: HttpClient) {
    //iniciar datastore
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([]);
  }

  //permite que demais componentes possam subscribe para este subject
  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  //metodo sendo usado new-contact-dialog SALVAR USUARIO
  addUser(user: User): Promise<User> {
    return new Promise((resolver, reject) => {
      user.id = this.dataStore.users.length + 1; //novo id
      this.dataStore.users.push(user); //adicionar usuario no datastore
      //componentes que estiverem subscribem para este metodo serao notificados
      this._users.next(Object.assign({}, this.dataStore).users);
      resolver(user);
    })
  }


  //retorna usuario pelo id
  userById(id: number) {
    return this.dataStore.users.find(x => x.id == id);
  }

  //carregar dados iniciais
  loadAll() {
    const usersUrl = 'https://angular-material-api.azurewebsites.net/users'

    return this.http.get<User[]>(usersUrl)
      .subscribe(data => {
        this.dataStore.users = data;
        //publicar dados para todos os componentes que derem subscribe,
        //componentes irao saber qdo dados estao disponiveis
        //{} criar novo objeto, desta origem this.dataStore, publica somente users
        this._users.next(Object.assign({}, this.dataStore).users);
      }, error => {
        console.log("Failed to fetch users")
      });
  }

}
