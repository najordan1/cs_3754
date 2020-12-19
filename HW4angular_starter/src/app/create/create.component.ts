import {Component, OnInit} from '@angular/core';
import {PArecordService} from '../_services/parecord.service';
import {NotificationService} from '../_services/notification.service';
import {first} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {AuthService} from "../_services/auth.service";


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  cost = 0;
  date = new FormControl(new Date());
  category = 0;
  name: String = "";

  constructor(private parecordservice: PArecordService,
              private notifService: NotificationService,
              private authService: AuthService) {
  }

  createPARecord() {
    this.parecordservice.add(this.cost, this.date.value, this.category, this.name, this.authService.currentUserValue.group)
      .pipe(first()).subscribe(
      () => {
        this.notifService.showNotif("Recorded!", 'response');
      }, error => {
        this.notifService.showNotif(error);
      });
  }

  ngOnInit() {
  }

}
