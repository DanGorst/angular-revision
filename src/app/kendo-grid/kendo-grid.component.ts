import { Component, OnInit } from '@angular/core';
import { products } from './products';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { CategoriesService } from './northwind.service';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-kendo-grid',
  templateUrl: './kendo-grid.component.html',
  styleUrls: ['./kendo-grid.component.css']
})
export class KendoGridComponent implements OnInit {

  public columns: any[] = [{field: "ProductID"}, {field: "ProductName"}, {field: "QuantityPerUnit"}];
    public bindingType: string;
    public view: Observable<GridDataResult>;
    public gridData: any = [];
    public gridDataResult: GridDataResult = {data: products, total: products.length};

    constructor(private service: CategoriesService) {
      this.view = service;
    }

    ngOnInit() {
      this.changeBindingType('array');
    }

    changeBindingType(e) {
      this.bindingType = e;
      switch (this.bindingType) {
        case 'array' : {
          this.columns = [{field: "ProductID"}, {field: "ProductName"}, {field: "QuantityPerUnit"}];
          this.gridData = products;
          break;
        }
        case 'gridDataResult' : {
          this.columns = [{field: "ProductID"}, {field: "ProductName"}, {field: "QuantityPerUnit"}];
          this.gridData = this.gridDataResult;
          break;
        }
        case 'async' : {
          const state: State = {skip: 0, take: 100};
          this.columns = [{field: "CategoryID"}, {field: "CategoryName"}, {field: "Description"}];
          this.service.query(state);
          this.view.subscribe(res => {
            this.gridData = res;
            });
          break;
        }
      }
    }
}
