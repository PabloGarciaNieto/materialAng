import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
 //Detecta si el tamaño de pantalla se adecua al la query Handset
 isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
 .pipe(
   map(result => result.matches),
   shareReplay()
 );
//--------
@Output() showStepper = new EventEmitter<boolean>();
public congrats: boolean;
  constructor(private _formBuilder: FormBuilder, private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.congrats = false;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  letChargeSomeMoney() {
    this.congrats = true;
    setTimeout(() => { this.showStepper.emit(false); }, 4000);
  }
  closeStepper() {
    this.showStepper.emit(false);
  }

}
