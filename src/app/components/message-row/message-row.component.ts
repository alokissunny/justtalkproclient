import { Component, OnInit, Input } from '@angular/core';
import {QueryModel} from '../../_models/QueryModel';

@Component({
  selector: 'app-message-row',
  templateUrl: './message-row.component.html',
  styleUrls: ['./message-row.component.scss']
})
export class MessageRowComponent implements OnInit {


  subject : String;
  message : String;
  time : Date;
  _dataModel : QueryModel;
    @Input()
    set dataModel (value : QueryModel) {
      this._dataModel = value;
      this.subject = this._dataModel.subject;
      this.message = this._dataModel.message;
    }
    get dataModel () : QueryModel {
      return this._dataModel;
    }


  constructor() { }

  ngOnInit() {
  }

}
