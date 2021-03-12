import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MaterialAng custom theme ';

  public showCard: boolean = false;
  public colorInfo: {} = {};
  public showStepper: boolean = false;
  showColorCard($event: boolean) {
    this.showCard = $event;
  }

  closeColorCard($event: boolean) {
    this.showCard = $event;
  }

  theColorInfo($event: {}) {
    this.colorInfo = $event;
  }

  showTheStepper($event: boolean) {
    this.showStepper = $event;
  }
  closeTheStepper($event: boolean) {
    this.showStepper = $event;
  }

}
