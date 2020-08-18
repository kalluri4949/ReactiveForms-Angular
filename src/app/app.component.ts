import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  forBiddenNames = ["rakesh", "kalluri"];
  submittedForm: FormGroup;
  ngOnInit(): void {
    this.submittedForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenUsers.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),
      hobbies: new FormArray([]),
      gender: new FormControl("male"),
    });
    // Two hooks on forms
    this.submittedForm.valueChanges.subscribe((value) => {
      console.log(value);
    });

    this.submittedForm
      .get("userData.username")
      .statusChanges.subscribe((status) => {
        console.log(status);
      });
  }
  onSubmit(): void {
    console.log(this.submittedForm);
  }
  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.submittedForm.get("hobbies")).push(control);
  }
  getControls() {
    return (<FormArray>this.submittedForm.get("hobbies")).controls;
  }
  // Validators
  forbiddenUsers(control: FormControl): { [s: string]: boolean } {
    if (this.forBiddenNames.indexOf(control.value) !== -1) {
      return { userNotAvailable: true };
    } else {
      return null;
    }
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "kallurirakesh15@gmail.com") {
          resolve({ invalidEmail: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
