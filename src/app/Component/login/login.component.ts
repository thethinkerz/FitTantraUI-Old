import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { UserManager } from '@app/Manager/User/usermanager';
import { map, filter, switchMap } from 'rxjs/operators';
import { TokenStorageService } from '@app/Service/token-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = '';
  password: string = '';
  isInvalidCredential: boolean = false;
  public isLoggedIn = false;

  constructor(private router: Router, private oUserManager: UserManager,
    private oTokenStorageService: TokenStorageService,
    private oToastrService: ToastrService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.oTokenStorageService.getUser();
    if(this.isLoggedIn){

      this.router.navigate(['/Redact']);
      this.oToastrService.success('Already logged in');
    }
  }

  login(){
    // if(this.userName == 'admin' && this.password == 'admin'){
    //   this.router.navigate(['/Redact']);
    // }
    // else{
    //   this.isInvalidCredential = true;
    // }
    debugger
   

    if(!this.isLoggedIn){
      if(this.userName != '' && this.password != ''){
        this.oUserManager.GetLogin(this.userName, this.password).pipe(map((response: any) => response)).subscribe((data: any) => { 
          debugger;
          if(data.Success){
            this.oTokenStorageService.saveUser(data.UserDetails);
            this.router.navigate(['/Redact']);
          }
          else{
            this.isInvalidCredential = true;
          }
        });
      }
      else{

      }
      

    }
    
    
  }

}
