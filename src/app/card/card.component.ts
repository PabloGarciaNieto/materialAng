import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
@Input() colorInfo: any;
@Input() showCard: boolean = false;
@Output() closeCard = new EventEmitter<boolean>();
@Output() showStepper = new EventEmitter<boolean>();
public value: number = 1;
public total: number;
  constructor() { }

  ngOnInit(){
    this.total = this.colorInfo.price * this.value;
    console.log(typeof this.total)
  }
  totalCalc() {
    this.total = this.colorInfo.price * this.value;
    this.total = parseFloat((Math.round(this.total * 100) / 100).toFixed(2)) ;
  }
closeColorCard() {
  this.closeCard.emit(false);
}

goToPayment() {
  this.closeCard.emit(false);
  this.showStepper.emit(true);
}


}
