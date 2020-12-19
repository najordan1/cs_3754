import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, mergeMap} from 'rxjs/operators';


import {NotificationService} from '../_services/notification.service';
import {PARecord} from '../_models/PARecord';
import {PArecordService} from '../_services/parecord.service';
import {UserService} from '../_services/user.service';
import {AuthService} from "../_services/auth.service";

@Component({
  templateUrl: 'home.component.html',

  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {


  parecords: PARecord[] = [];
  userPARecords: PARecord[] = [];


  constructor(
    private parecordservice: PArecordService,
    private notifService: NotificationService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.loadAllPArecords();
  }


  private loadAllPArecords() {
    this.parecordservice.getAll().subscribe(
      parecords => {
        this.parecords = parecords;
        this.userPARecords = [];
        for (var i = 0; i < this.parecords.length; i++){
          if (this.parecords[i].group===this.authService.currentUserValue.group){
            this.userPARecords.push(this.parecords[i]);
          }
        }
      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning');
      });
  }

  deletePARecord(date) {

    // this.userService.deleteActivity(date);
    this.parecordservice.delete(date).pipe(first()).subscribe(() => {
      this.parecords = null;
      this.loadAllPArecords();
      this.notifService.showNotif("Deleted: 1", "confirmation");
    }, error => {
      this.notifService.showNotif(error);
    });
  }

}

