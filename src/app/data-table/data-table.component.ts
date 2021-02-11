import { AfterViewInit, Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<DataTableItem>;
  dataSource: DataTableDataSource;
  @Input() showCard: boolean;
  @Output() openCard = new EventEmitter<boolean>();
  @Output() colorInfo = new EventEmitter<{}>();
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['code', 'name', 'price'];
  public color: {} = {};
  ngOnInit() {
    this.dataSource = new DataTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  showColor(col) {
    console.log(col);
    this.color = this.dataSource.data.find(x => x.color === col);
    console.log(this.color);
    this.colorInfo.emit(this.color);
    this.openCard.emit(true);
  }
}
