import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-react-form",
  templateUrl: "./react-form.component.html",
  styleUrls: ["./react-form.component.css"],
})
export class ReactFormComponent implements OnInit {
  projectForm: FormGroup;
  dropDown = ["stable", "critical", "finished"];
  invalidUserName = ["test"];
  constructor() {}

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl(null, [
        Validators.required,
        this.invalidUsers.bind(this),
      ]),
      email: new FormControl(null, [Validators.required]),
      status: new FormControl("stable"),
    });
  }
  onSubmit(): void {
    console.log(this.projectForm);
  }
  invalidUsers(control: FormControl): { [s: string]: boolean } {
    if (this.invalidUserName.indexOf(control.value) !== -1) {
      return { nameNotAvailable: true };
    } else {
      return null;
    }
  }
}
