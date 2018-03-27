import { Component, Input, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';

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
cities = ['Gurgaon' , 'Delhi' , 'Noida'];
    ngOnInit() {

    }
    onChange(evt) {
      this.location = constant.GGN;
    }

}