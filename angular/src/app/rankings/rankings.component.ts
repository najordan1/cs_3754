import { Component, OnInit } from '@angular/core';
import {RankCard} from '../_models/RankCard';
import {UserService} from "../_services/user.service";
import {AuthService} from "../_services/auth.service";
import {MatDialog} from '@angular/material/dialog';
import {templateSourceUrl} from "@angular/compiler";
import {DialogComponent} from "../dialog/dialog.component";


@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {

  ranks: RankCard[] = [];

  constructor(private userService: UserService,
              private authService: AuthService,
              public dialog: MatDialog){
  }

  ngOnInit() {
    this.getRankings();
  }

  getRankings(){
    this.userService.settleUp(this.authService.currentUserValue.group).subscribe(
      x => {
        this.ranks = x.sort((a, b) => b.totalSpent - a.totalSpent);
      });
  }

  openDialog(){
    this.dialog.open(DialogComponent);
  }

}
