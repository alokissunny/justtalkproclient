import {  OnInit, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostQueryComponent } from '../post-query/post-query.component';
import {Advisor} from '../../_models/advisormodel';
import {QueryService} from '../post-query/post-query.service';
import { Component, OpaqueToken, Inject } from '@angular/core';

const APP_CONFIG_DATA = {
	server_ip_addr: "http://localhost:4000"
}

const APP_CONFIG_TOKEN = new OpaqueToken('config');
@Component({
  selector: 'app-advisor-card',
  templateUrl: './advisor-card.component.html',
  styleUrls: ['./advisor-card.component.scss'],
  providers: [
		{ provide: APP_CONFIG_TOKEN, useValue: APP_CONFIG_DATA }
	]
})
export class AdvisorCardComponent implements OnInit {

  about: String = 'asdkjgdgfd';
  _advisor: Advisor;
  starRate = 2;
  @Input()
  set advisor(value: Advisor) {
    this._advisor = value;
    this.ref.markForCheck();

  }
  get advisor() :Advisor {
    return this._advisor;

  }
  
  constructor(private modalService: NgbModal,private ref: ChangeDetectorRef,private query:QueryService, @Inject(APP_CONFIG_TOKEN) public config: OpaqueToken ) {
   }

  ngOnInit() {
  }
  openQuery() {
    this.query.advisor = this._advisor.userName;
    const activeModal = this.modalService.open(PostQueryComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Large Modal';
  }

}
