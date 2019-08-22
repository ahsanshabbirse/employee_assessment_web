import { Component, OnInit, Input } from '@angular/core';
import { EvaluationCriteria } from 'src/app/models/EvaluationCriteria';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-evaluation-criteria-modify-modal',
  templateUrl: './evaluation-criteria-modify-modal.component.html',
  styleUrls: ['./evaluation-criteria-modify-modal.component.css']
})
export class EvaluationCriteriaModifyModalComponent implements OnInit {
  @Input() criteria: EvaluationCriteria;

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
    console.log(this.criteria);
  }

  modifyCriteria(){

  }

  removeCriteria(){

  }
}
