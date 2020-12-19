import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {PArecordService} from '../_services/parecord.service';
import {NotificationService} from "../_services/notification.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private parecordservice: PArecordService,
              private notifService: NotificationService) { }

  cost: number;
  date: Date;
  category: number;
  name: String;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cost = params['cost'];
      this.name = params['name'];
      this.date = params['date'];
      this.category = params['category'];
    })
  }

  updatePARecord(){
    this.parecordservice.update(this.cost, this.date, this.category, this.name).pipe(first()).subscribe(
      () => {
        this.notifService.showNotif("Edited!!", 'response');
      }, error => {
        this.notifService.showNotif(error);
      });
  }

}
/*if(Object.keys(params).length > 0) {
  this.update = true;
}*/
