import { Component, OnInit, Input } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";
import { Subject } from "rxjs";

@Component({
  selector: "app-employee-evaluate-modal",
  templateUrl: "./employee-evaluate-modal.component.html",
  styleUrls: ["./employee-evaluate-modal.component.css"]
})
export class EmployeeEvaluateModalComponent implements OnInit {
  public onClose: Subject<boolean>;

  constructor(public modal: BsModalRef) {}

  ngOnInit() {
    this.onClose = new Subject();
  }
  
  onConfirm(): void {
    this.onClose.next(true);
    this.modal.hide();
  }
}
