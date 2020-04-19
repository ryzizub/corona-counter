import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

interface State {
  country: string;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  critical: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['country', 'cases', 'recovered', 'tests', 'critical', 'deaths', 'todayCases', 'todayDeaths'];

  overallData;

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private firestore: AngularFirestore) {
    this.loadOverallData();
  }

  ngOnInit(): void {
    this.loadOverallData();
  }

  loadOverallData() {
    this.firestore.collection<State>('coronaOverall', ref => ref.orderBy('date', 'desc').limit(1)).valueChanges().subscribe((data) => {
      this.overallData = data[0];
    });
    this.firestore.collection<State>('coronaStates', ref => ref.orderBy('cases', 'desc')).valueChanges().subscribe((data) => {
      data = data.filter(one => one.country !== 'World');
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
