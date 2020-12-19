import {Component, OnInit} from '@angular/core';
import {AuthService} from './_services/auth.service';
import {Router} from '@angular/router';
import {User} from './_models/user';
import {Role} from './_models/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'HW3Angular';
  currentUser: User;
  initials: String;
  group: String;



  constructor(  private router: Router,
                private authService: AuthService
                ) {
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;});
  }

  get isUser() {

    return this.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {

    this.authService.currentUser.subscribe(x => {
      if (x){
        this.initials = x.firstName.charAt(0) +x.lastName.charAt(0);
        this.group = x.group;
      }

    })
  }



}
