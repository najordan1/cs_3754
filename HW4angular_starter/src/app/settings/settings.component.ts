import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {NotificationService} from '../_services/notification.service';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private authService: AuthService,
              private userService: UserService,
              private notifService: NotificationService) {

  }

  group: String;

 /* savegoals(){
    this.userService.setGoals(this.calories, this.minutes).subscribe(
      () => {
        this.notifService.showNotif("Goals updated successfully!", "confirmation");
        this.authService.currentUserValue.caloriegoal = this.calories;
        this.authService.currentUserValue.minutegoal = this.minutes;
        localStorage.setItem('currentUser', JSON.stringify(this.authService.currentUserValue));
      }, error => {
        this.notifService.showNotif("Something went wrong!", "error")
      }

    );
  }*/

  setGroup(){
    this.userService.setGroup(this.group).subscribe(
      () => {
        this.notifService.showNotif("Group changed!", "confirmation");
        this.authService.currentUserValue.group = this.group;
        localStorage.setItem('currentUser', JSON.stringify(this.authService.currentUserValue));
      }, err => {
        this.notifService.showNotif(err);
      }
    )
  }

  ngOnInit() {
    this.group=this.authService.currentUserValue.group;
  }

}
