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
  constructor() { }

  ngOnInit(): void {
  }
closeColorCard() {
  this.closeCard.emit(false);
}

goToPayment() {
  this.closeCard.emit(false);
  this.showStepper.emit(true);
}

}
