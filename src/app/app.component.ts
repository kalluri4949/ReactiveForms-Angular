import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  submittedForm: FormGroup;
  ngOnInit(): void {
    this.submittedForm = new FormGroup({
      username: new FormControl(null),
      email: new FormControl(null),
      gender: new FormControl("male"),
    });
  }
  onSubmmit(): void {
    console.log(this.submittedForm);
  }
}
