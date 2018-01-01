import {  OnInit, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostQueryComponent } from '../post-query/post-query.component';
import {Advisor} from '../../_models/advisormodel';
import {QueryService} from '../post-query/post-query.service';
import { Component, Inject } from '@angular/core';
import {BookComponent} from '../book-cancel/book-cancel.component';



@Component({
  selector: 'app-advisor-card',
  templateUrl: './advisor-card.component.html',
  styleUrls: ['./advisor-card.component.scss'],
  
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
  
  constructor(private modalService: NgbModal,private ref: ChangeDetectorRef,private query:QueryService ) {
   }

  ngOnInit() {
  }
  openQuery() {
    this.query.advisor = this._advisor.username;
    const activeModal = this.modalService.open(PostQueryComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Large Modal';
  }
  bookcancel() {
const activeModal = this.modalService.open(BookComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Large Modal';

  }

}
