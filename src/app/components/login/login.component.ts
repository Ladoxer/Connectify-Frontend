import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private _fb: FormBuilder, private _toastr: ToastrService, private _auth_service: AuthService,private _router:Router) {

  }
  user_form!: FormGroup
  ngOnInit(): void {
    this.user_form = this._fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }
  submited() {
    if (!this.user_form.get('email')?.valid) {
      this._toastr.error('enter the correct email address')
      return
    } if (!this.user_form.get('password')?.valid) {
      this._toastr.error('enter the correct password it should atleast 6 characters')
      return
    }

         console.log(this.user_form.value);
         
    this._auth_service.login(this.user_form.value).subscribe({
      next: (res:any) => {
        console.log(res);localStorage.setItem('authToken',res.token)
        this._toastr.success('save', 'login successful')
        this._router.navigate(['/chat'])
      }
    })


  }
}
