import { Component, OnInit } from '@angular/core';
import {UserService} from "../_services/user.service";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {

  options: any;
  options2: any;
  xAxisData: String[] = [];
  data: number[] = [];
  data2: any = [];

  constructor(private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.userService.settleUp(this.authService.currentUserValue.group).subscribe(
      x => {
        if(x){
          for (var i = 0; i < x.length; i++){
            this.xAxisData.push(x[i].username);
            this.data.push(x[i].totalSpent);
            this.data2.push({
              value: x[i].totalSpent,
              name: x[i].username
            });
            this.options = {
              legend: {
                align: 'left',
                data: ['bar']
              },
              tooltip: {},
              xAxis: {
                data: this.xAxisData,
                silent: false,
                splitLine: {
                  show: false,
                }
              },
              yAxis: {},
              series: {
                name: 'Group Member',
                type: 'bar',
                data: this.data
              },
              title: {
                text: "Spending by Group Member",
                x: "center"
              }
            };

            this.options2 = {
              title: {
                text: "Share of Expenses",
                subtext: "Who is spending the most?",
                x: "center"
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
              },
              legend: {
                data: this.xAxisData,
                x: 'center',
                y: 'bottom',
                silent: false
              },
              calulable: true,
              series: [
                {
                  name: 'share',
                  type: 'pie',
                  radius: [30, 110],
                  roseType: 'area',
                  data: this.data2
                }
              ]
            };
          }
        }
      }
    );


  }


}
