import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@app/Service/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  public isLoggedIn = false;
  public user: any;

  ngOnInit(): void {
    debugger
    this.isLoggedIn = !!this.tokenStorage.getUser();
    this.user = this.tokenStorage.getUser();
    console.log(this.user)
    if(!this.isLoggedIn){
      this.router.navigateByUrl('/Login');
    }
  }

  Logout(){
    this.tokenStorage.signOut();
    this.isLoggedIn = !!this.tokenStorage.getUser();
    if(!this.isLoggedIn){
      this.router.navigateByUrl('/Login');
    }
  }

}
