import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserStorageService } from 'src/app/services/user_storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authSrv: AuthService, private userStorageSrv: UserStorageService,
    private router: Router, private errorSrv: ToastrService) {
    this.loginForm = this.fb.group({
      email: [, Validators.required],
      password: [, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control!.markAsTouched({ onlySelf: true });
      });
      return;
    }

    this.sendLogin();
  }

  sendLogin() {
    let obj = {
      username: this.loginForm.get('email')!.value,
      password: this.loginForm.get('password')!.value
    }

    this.authSrv.login(obj).then((res) => {
      if (res) {
        var headers = res.headers;
        var token = headers.get("Authorization") || "";
        this.userStorageSrv.setToken(token);
        this.userStorageSrv.setRole(res.body.role);
        this.userStorageSrv.setUser(res.body.user);
     
        this.router.navigateByUrl('/home');
      } else {
        this.errorSrv.error("Errore. Credenziali non valide.");
      }
    },(error) => {
      this.errorSrv.error("Errore. Credenziali non valide.");
    });
  }

}
