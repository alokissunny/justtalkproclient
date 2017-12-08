import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostQueryComponent } from '../post-query/post-query.component';


@Component({
  selector: 'app-advisor-card',
  templateUrl: './advisor-card.component.html',
  styleUrls: ['./advisor-card.component.scss']
})
export class AdvisorCardComponent implements OnInit {

  about: String = 'asdkjgdgfd';
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  openQuery() {
    console.log("hello");
    const activeModal = this.modalService.open(PostQueryComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Large Modal';
  }

}
