import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EmployeePersonalDetails } from "src/app/models/EmployeePersonalDetails";
import { Employee } from "src/app/models/Employee";
import { ResponseData } from "src/app/models/ResponseData";
import { Department } from "src/app/models/Department";
import { EmployeeService } from "src/app/services/employee.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-employee-register-form",
  templateUrl: "./employee-register-form.component.html",
  styleUrls: ["./employee-register-form.component.css"]
})
export class EmployeeRegisterFormComponent implements OnInit {
  employeeRegisterForm: FormGroup;
  employee: Employee;
  departments: Department[];
  responseData: ResponseData;
  tabPersonalDisabled = false;
  tabOfficialDisabled = true;

  designations = [
    { id: 1, name: "CEO" },
    { id: 2, name: "Manager" },
    { id: 3, name: "Team Member" }
  ];

  levels = [
    { id: 1, name: "Grade / Level = 1" },
    { id: 2, name: "Grade / Level = 2" },
    { id: 3, name: "Grade / Level = 3" },
    { id: 4, name: "Grade / Level = 4" }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employee = new Employee();
    this.employee.employeePersonalDetails = new EmployeePersonalDetails();
    this.employee.department = new Department();
  }

  ngOnInit() {
    this.getDepartmentList();
    this.validateEmployeeForm();
  }

  private getDepartmentList() {
    this.route.data.subscribe(
      data => {
        this.responseData = data.departmentList;
        this.departments = this.responseData.data.departmentList;
        console.log(this.departments);
      },
      error => {
        console.log(error);
      }
    );
  }

  validateEmployeeForm() {
    this.employeeRegisterForm = this.formBuilder.group({
      firstName: [
        "",
        [
          Validators.required,
          Validators.maxLength(14),
          Validators.pattern("^[a-zA-Z\\s]*$")
        ]
      ],
      lastName: [
        "",
        [
          Validators.required,
          Validators.maxLength(14),
          Validators.pattern("^[a-zA-Z\\s]*$")
        ]
      ],
      fatherName: [
        "",
        [
          Validators.required,
          Validators.maxLength(29),
          Validators.pattern("^[a-zA-Z\\s]*$")
        ]
      ],
      cnicNo: [
        "",
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
          Validators.pattern("^[0-9]*$")
        ]
      ],
      gender: ["true", Validators.required],
      age: [
        "",
        [
          Validators.required,
          Validators.min(20),
          Validators.max(99),
          Validators.pattern("^[0-9]*$")
        ]
      ],
      personaContactNo: [
        "",
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(15),
          Validators.pattern("^[0-9]*$")
        ]
      ],
      education: ["", [Validators.required, Validators.maxLength(44)]],
      currentAddress: ["", [Validators.required, Validators.maxLength(49)]],
      permanentAddress: ["", [Validators.required, Validators.maxLength(49)]],

      officeEmail: [
        "",
        [Validators.required, Validators.maxLength(44), Validators.email]
      ],
      officeContact: [
        "",
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(15),
          Validators.pattern("^[0-9]*$")
        ]
      ],
      department: ["0", Validators.required],
      designation: ["0", Validators.required],
      level: ["0", Validators.required]
    });
  }

  registerEmployee() {
    if (this.employeeRegisterForm.valid) {
      this.employee.employeePersonalDetails.firstName = this.employeeRegisterForm.get(
        "firstName"
      ).value;
      this.employee.employeePersonalDetails.lastName = this.employeeRegisterForm.get(
        "lastName"
      ).value;
      this.employee.employeePersonalDetails.fatherName = this.employeeRegisterForm.get(
        "fatherName"
      ).value;
      this.employee.employeePersonalDetails.cnicNo = this.employeeRegisterForm.get(
        "cnicNo"
      ).value;
      this.employee.employeePersonalDetails.gender = this.employeeRegisterForm.get(
        "gender"
      ).value;
      this.employee.employeePersonalDetails.age = this.employeeRegisterForm.get(
        "age"
      ).value;
      this.employee.employeePersonalDetails.personalContactNo = this.employeeRegisterForm.get(
        "personaContactNo"
      ).value;
      this.employee.employeePersonalDetails.education = this.employeeRegisterForm.get(
        "education"
      ).value;
      this.employee.employeePersonalDetails.currentAddress = this.employeeRegisterForm.get(
        "currentAddress"
      ).value;
      this.employee.employeePersonalDetails.permanentAddress = this.employeeRegisterForm.get(
        "permanentAddress"
      ).value;

      this.employee.department.departmentId = this.employeeRegisterForm.get(
        "department"
      ).value;
      this.employee.designation = this.employeeRegisterForm.get(
        "designation"
      ).value;
      this.employee.level = this.employeeRegisterForm.get("level").value;
      this.employee.officeEmail = this.employeeRegisterForm.get(
        "officeEmail"
      ).value;
      this.employee.officeContact = this.employeeRegisterForm.get(
        "officeContact"
      ).value;

      this.employeeService.registerEmployee(this.employee).subscribe(
        responseData => {
          this.responseData = responseData;
          console.log(this.responseData.responseMessage);
        },
        error => {
          console.log(error);
        },
        () => {
          this.router.navigateByUrl("/employee");
        }
      );
    }
    console.log(this.employee);
  }

  toogletabs() {
    this.tabPersonalDisabled = !this.tabPersonalDisabled;
    this.tabOfficialDisabled = !this.tabOfficialDisabled;
  }
}
