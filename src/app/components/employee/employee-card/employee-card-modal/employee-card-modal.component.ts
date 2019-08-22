import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/models/Employee';
// tslint:disable-next-line: max-line-length
import { EmployeeCardModalReEvaluateModalComponent } from './employee-card-modal-re-evaluate-modal/employee-card-modal-re-evaluate-modal.component';

@Component ({
  selector: 'app-employee-card-modal',
  templateUrl: './employee-card-modal.component.html',
  styleUrls: ['./employee-card-modal.component.css']
})
export class EmployeeCardModalComponent implements OnInit {
  @Input() employee: Employee;
  
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit() {
  }

  reEvaluateEmployee(){
    const modalRef = this.modalService.open(EmployeeCardModalReEvaluateModalComponent, {size: 'lg', centered: true});
    modalRef.componentInstance.employee = this.employee;
  }
  
}
