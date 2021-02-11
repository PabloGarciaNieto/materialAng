import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
@Input() showCard: boolean = false;
@Output() closeCard = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
closeColorCard() {
  this.closeCard.emit(false);
}
}
