import { Component, OnInit, Input } from "@angular/core";
import { Employee } from "src/app/models/Employee";
import { EmployeeService } from "src/app/services/employee.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EmployeeCardModalComponent } from "./employee-card-modal/employee-card-modal.component";
import { UtilsService } from "src/app/services/utils.service";
import { SafeUrl } from "@angular/platform-browser";

@Component({
  selector: "app-employee-card",
  templateUrl: "./employee-card.component.html",
  styleUrls: ["./employee-card.component.css"]
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee: Employee;
  picture: SafeUrl;
  constructor(
    private employeeService: EmployeeService,
    public utilsService: UtilsService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.picture = this.utilsService.getSantizeUrl(
      this.employee.employeePersonalDetails.picture
    );
  }

  openModal() {
    const modalRef = this.modalService.open(EmployeeCardModalComponent, {
      size: "lg",
      centered: true
    });
    modalRef.componentInstance.employee = this.employee;
    this.setEmployeeDetails();
  }

  private setEmployeeDetails() {
    this.utilsService.provideEmployeeData(this.employee);
  }
}
