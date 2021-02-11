import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  name: string;
  code: string;
  price: number;
  color: string;
  info: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  {code: 'PR47', name: 'Permanent Red', price: 22.99, color: '#eb0032', info:'The principal characteristics of Permanent Red are'},
  {code: 'PR12', name: 'Permanent Bordeaux', price: 15.99, color: '#bb1d02', info:'The principal characteristics of Permanent Bordeaux are'},
  {code: 'PR69', name: 'Lithol Red', price: 13.95, color: '#dc301d', info:'The principal characteristics of Lithol Red are'},
  {code: 'PR20', name: 'Quinacridone Crimson', price: 21.99, color: '#d10e63', info:'The principal characteristics of Quinacridone Crimson are'},
  {code: 'PR2', name: 'Naphthol Red', price: 14.95, color: '#fe1131', info:'The principal characteristics of Naphthol Red are'},
  {code: 'PO3', name: 'Hansa Orange', price: 18.99, color: '#ff9900', info:'The principal characteristics of Hansa Orange are'},
  {code: 'PO22', name: 'Versal Orange', price: 21.95, color: '#d67f22', info:'The principal characteristics of Versal Orange are'},
  {code: 'PO38', name: 'Naphthol Orange', price: 15.99, color: '#fe883f', info:'The principal characteristics of Naphthol Orange are'},
  {code: 'PO77', name: 'Vat Orange', price: 20.99, color: '#ffbf70', info:'The principal characteristics of Vat Orange are'},
  {code: 'PY5', name: 'Hansa Yellow', price: 21.95, color: '#ffe684', info:'The principal characteristics of Hansa Yellow are'},
  {code: 'PY9', name: 'Azo Yellow', price: 17.99, color: '#f3dd35', info:'The principal characteristics of Azo Yellow are'},
  {code: 'PY36', name: 'Zinc Yellow', price: 19.99, color: '#fff706', info:'The principal characteristics of Zinc Yellow are'},
  {code: 'PY41', name: 'Naples Yellow', price: 25.95, color: '#ffdb0e', info:'The principal characteristics of Naples Yellow are'},
  {code: 'PY63', name: 'Suimei Yellow', price: 18.95, color: '#fef743', info:'The principal characteristics of Suimei Yellow are'},
  {code: 'PG15', name: 'Chrome Green', price: 15.99, color: '#78fe43', info:'The principal characteristics of Chrome Green are'},
  {code: 'PG18', name: 'Viridian', price: 13.95, color: '#52e274', info:'The principal characteristics of Viridian are'},
  {code: 'PG42', name: 'Phthalocyanine Green', price: 21.99, color:'#39fcc1', info:'The principal characteristics of Phthalocyanine Green are'},
  {code: 'PG48', name: 'Chromocyanine Green', price: 14.95, color: '#74f306', info:'The principal characteristics of Chromocyanine Green are'},
  {code: 'PB15', name: 'Phthalocyanine Blue', price: 13.95, color: '#07ffda', info:'The principal characteristics of Phthalocyanine Blue are'},
  {code: 'PB27', name: 'Prussian Blue', price: 21.99, color: '#0720ff', info:'The principal characteristics of Prussian Blue are'},
  {code: 'PB28', name: 'Cobalt Blue', price: 14.95, color: '#005de9', info:'The principal characteristics of Cobalt Blue are'},
  {code: 'PB35', name: 'Cerulean Blue', price: 18.99, color: '#4315e7', info:'The principal characteristics of Cerulean Blue are'},
  {code: 'PBr6', name: 'Brown Ochre', price: 21.95, color: '#806808', info:'The principal characteristics of Brown Ochre are'},
  {code: 'PBr7', name: 'Burnt Sienna', price: 17.99, color: '#804d00', info:'The principal characteristics of Burnt Sienna are'},
  {code: 'PBr8', name: 'Raw Umber', price: 19.99, color: '#792e00', info:'The principal characteristics of Raw Umber are'},
  {code: 'PW6', name: 'Titanium White', price: 17.99, color: '#ffffff', info:'The principal characteristics of Titanium White are'},
  {code: 'PW16', name: 'Lead White', price: 19.99, color: '#f0f0f0', info:'The principal characteristics of Lead White are'},
  {code: 'PBk7', name: 'Ivory Black', price: 17.99, color: '#1a1a1a', info:'The principal characteristics of Ivory Black are'},
  {code: 'PBk9', name: 'Bone Black', price: 19.99, color: '#000', info:'The principal characteristics of Bone Black are'},
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'code': return compare(a.code, b.code, isAsc);
        case 'price': return compare(+a.price, +b.price, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
