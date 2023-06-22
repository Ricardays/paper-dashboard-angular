import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {catchError, Observable, take} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-medic',
  templateUrl: './add-medic.component.html',
  styleUrls: ['./add-medic.component.scss']
})
export class AddMedicComponent implements OnInit {

  env = environment;
  protected headers: HttpHeaders;
  submitted: boolean = false;

  medicForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    speciality: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    address: new FormControl(null ),
  });

  constructor(protected httpClient: HttpClient,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
  }



  submit():void {
    this.submitted = true;

    // Check if form is valid
    if (this.medicForm.valid) {
      if (true) {
        // Case new
        console.log(this.medicForm.value)
        let body = {
          nombre: this.medicForm.value.name,
          apellido: this.medicForm.value.lastName,
          especialidad: this.medicForm.value.speciality,
          telefono: this.medicForm.value.phone,
          email: this.medicForm.value.email,
          direccion: this.medicForm.value.address
        }
        console.log(body);
        this.httpClient.post(this.env.urlApi + '/medic', body, {headers: this.headers})
          .pipe(
            take(1),
            catchError(err => this.handleErr(err))
          ).subscribe((resp) => {
          console.log(resp);
          this.toastr.success(
            '<span data-notify="icon" class="nc-icon nc-satisfied"></span><span data-notify="message">Medico creado satisfactoriamente</span>',
            "",
            {
              timeOut: 4000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-success alert-with-icon",
              positionClass: "toast-top-right"
            }
          );
          this.router.navigate(['/medic']);

        });

      } else {
        // Edit

        // let value = this.netplanForm.value;
        //
        // value.bwUp = value.bwUp.toString() + 'mbit';
        // value.bwDwn = value.bwDwn.toString() + 'mbit';
        // value.ceilUp = value.ceilUp.toString() + 'mbit';
        // value.ceilDwn = value.ceilDwn.toString() + 'mbit';
        //
        // this.netplanService.update(value).subscribe((res) => {
        //   // Update list
        //   this.list();
        //
        //   // Close aside
        //   this.actionAside();
        // });
      }
    }

  }

  protected handleErr(err): Observable<any> {
    console.error('API Error:', err);
    throw err;
  }

  redirectList(){
    this.router.navigate(['/medic'])
  }
}
