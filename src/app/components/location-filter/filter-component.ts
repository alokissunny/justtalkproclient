import { Component, Input, OnInit, ViewChild, ElementRef, Output ,EventEmitter ,
  OnChanges } from '@angular/core';

import { NbMenuService, NbSidebarService, NbSearchService } from '@nebular/theme';

import * as constant from './constants';

@Component({
  selector: 'pro-filter',
  styleUrls: ['./pro-filter.scss'],
  templateUrl: './pro-filter.html',
})
export class FilterComponent implements OnInit {
  showLocation = false;
  location = constant.GGN;
  city = 'Gurgaon';
  loc = 'Ashok Vihar Phase II';
  cities = ['Gurgaon', 'Delhi', 'Noida'];

  @Output()
  onSearch = new EventEmitter(); 
  ngOnInit() {

  }
  onChange(evt) {
    this.city = evt.target.value;
    switch (evt.target.value) {
      case "Delhi":
        this.location = constant.DEL;
        break;
      case "Gurgaon":
        this.location = constant.GGN;
        break;
        case "Noida" :
        this.location = constant.NOIDA;
    }

  }
  locChange(evt) {
    this.loc = evt.target.value;
  }
  search() {
    this.onSearch.emit({city : this.city , loc : this.loc});

  }


}