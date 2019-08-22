import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-evaluate-evaluation-not-started-modal',
  templateUrl: './employee-evaluate-evaluation-not-started-modal.component.html',
  styleUrls: ['./employee-evaluate-evaluation-not-started-modal.component.css']
})
export class EmployeeEvaluateEvaluationNotStartedModalComponent implements OnInit {
  @Input() employee: Employee;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
