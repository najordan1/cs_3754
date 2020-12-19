import {Component, Input, OnInit} from '@angular/core';
import {RankCard} from '../_models/RankCard';

@Component({
  selector: 'rank-component',
  templateUrl: './rank-card.component.html',
  styleUrls: ['./rank-card.component.css']
})
export class RankComponent implements OnInit {
  @Input() rank: RankCard;
  initials: string;
  owed: string;
  color: string;

  constructor() { }

  ngOnInit() {
    this.initials = this.rank.firstName.charAt(0) + this.rank.lastName.charAt(0);
    this.setOwed();
  }

  setOwed(){
    if (this.rank.amountOwed < 0){
      const due: number = this.rank.amountOwed * -1;
      this.owed = "Owes $" + due;
      this.color = "#E41A1C";
    } else {
      this.owed = "Owed $" + this.rank.amountOwed;
      this.color = "#4DAF4A";
    }
  }


}
