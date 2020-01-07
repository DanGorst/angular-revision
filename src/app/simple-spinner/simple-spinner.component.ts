import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-simple-spinner',
  templateUrl: './simple-spinner.component.html',
  styleUrls: ['./simple-spinner.component.css']
})
export class SimpleSpinnerComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
  }

}
