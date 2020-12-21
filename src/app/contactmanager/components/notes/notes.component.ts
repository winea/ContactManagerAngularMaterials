import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Note } from '../../models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, AfterViewInit  {

  @Input() notes: Note[];

  //variaveis do angular materials
  displayedColumns: string[] = ['position', 'title', 'date' ];
  dataSource: MatTableDataSource<Note>;

  constructor() { }

  //
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // Para organizar colunas ordem alfaberica
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    //inicializar aqui pq os dados estao vindo via API
    this.dataSource = new MatTableDataSource<Note>(this.notes);
  }

  // FILTRO da tabela
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // trim remove espacos brancos
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
