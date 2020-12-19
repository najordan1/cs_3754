import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PARecord} from '../_models/PARecord';
import {NotificationService} from '../_services/notification.service';
import {UserService} from '../_services/user.service';
import {AuthService} from '../_services/auth.service';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {PAType} from "../_models/PAType";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'parecord-component',
  templateUrl: './parecord.component.html',
  styleUrls: ['./parecord.component.css']
})
export class ParecordComponent implements OnInit {
  @Input() parecord: PARecord;
  @Output() deleteEvent = new EventEmitter<Date>();

  mode = 'determinate';

  bufferValue = 0;

  categories = ['home', 'power', 'local_dining', 'local_gas_station', 'shopping_cart', 'attach_money'];


  color = 'primary';

  category = this.categories[0];
  calprogressvalue = 0;
  minprogressvalue = 0;


  constructor(private authService: AuthService,
              private userService: UserService,
              private notifService: NotificationService,
              private router: Router) {
  }

  delete(date) {
    this.deleteEvent.emit(date);
  }

  edit() {
    this.router.navigate(['/edit', {
      cost: this.parecord.cost,
      date: this.parecord.createdDate,
      category: this.parecord.category,
      name: this.parecord.name
    }])
  }

  ngOnInit() {
    this.category = this.categories[this.parecord.category];
    /*this.userService.getGoals(this.authService.currentUserValue.username).subscribe(
      json => {
        this.calprogressvalue = Math.floor((this.parecord.calories / json.caloriegoal) * 100);
        this.minprogressvalue = Math.floor((this.parecord.minutes / json.minutegoal) * 100);
      }, error => {
        this.notifService.showNotif(error);
      }
    )*/
  }


}
