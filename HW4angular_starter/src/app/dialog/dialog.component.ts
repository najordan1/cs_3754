import {Component, OnInit} from '@angular/core';
import {PArecordService} from "../_services/parecord.service";
import {AuthService} from "../_services/auth.service";
import {first} from "rxjs/operators";
import {NotificationService} from "../_services/notification.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private parecordService: PArecordService,
              private authService: AuthService,
              private notifService: NotificationService) {
  }

  ngOnInit() {
  }

  delete() {
    this.parecordService.deleteGroup(this.authService.currentUserValue.group).pipe(first()).subscribe(
      () => {
        this.notifService.showNotif('All settled up!');
      }, error => {
        this.notifService.showNotif(error);
      }
    );
  }

}
