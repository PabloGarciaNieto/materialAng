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
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  {code: 'PR47', name: 'Permanent Red', price: 22.99},
  {code: 'PR12', name: 'Permanent Bordeaux', price: 15.99},
  {code: 'PR69', name: 'Lithol Red', price: 13.95},
  {code: 'PR202', name: 'Quinacridone Crimson', price: 21.99},
  {code: 'PR2', name: 'Naphthol Red', price: 14.95},
  {code: 'PO3', name: 'Hansa Orange', price: 18.99},
  {code: 'PO22', name: 'Versal Orange', price: 21.95},
  {code: 'PO38', name: 'Naphthol Orange', price: 15.99},
  {code: 'PO77', name: 'Vat Orange', price: 20.99},
  {code: 'PY5', name: 'Hansa Yellow', price: 21.95},
  {code: 'PY9', name: 'Azo Yellow', price: 17.99},
  {code: 'PY36', name: 'Zinc Yellow', price: 19.99},
  {code: 'PY41', name: 'Naples Yellow', price: 25.95},
  {code: 'PY63', name: 'Suimei Yellow', price: 18.95},
  {code: 'PG15', name: 'Chrome Green', price: 15.99},
  {code: 'PG18', name: 'Viridian', price: 13.95},
  {code: 'PG42', name: 'Phthalocyanine Green', price: 21.99},
  {code: 'PG48', name: 'Chromocyanine Green', price: 14.95},
  {code: 'PB15', name: 'Phthalocyanine Blue', price: 13.95},
  {code: 'PB27', name: 'Prussian Blue', price: 21.99},
  {code: 'PB28', name: 'Cobalt Blue', price: 14.95},
  {code: 'PB35', name: 'Cerulean Blue', price: 18.99},
  {code: 'PO77', name: 'Vat Orange', price: 20.99},
  {code: 'PBr6', name: 'Brown Ochre', price: 21.95},
  {code: 'PBr7', name: 'Burnt Sienna', price: 17.99},
  {code: 'PBr8', name: 'Raw Umber', price: 19.99},
  {code: 'PW6', name: 'Titanium White', price: 17.99},
  {code: 'PW16', name: 'Lead White', price: 19.99},
  {code: 'PBk7', name: 'Ivory Black', price: 17.99},
  {code: 'PBk9', name: 'Bone Black ', price: 19.99},
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
