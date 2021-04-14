import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  payForm: FormGroup;

  //Detecta si el tamaño de pantalla se adecúa a la query Handset
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  //--------
  @Output() showStepper = new EventEmitter<boolean>();
  public congrats: boolean;
  constructor(private fb: FormBuilder, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.congrats = false;

    this.payForm = this.fb.group({
      formArray: this.fb.array([
        this.fb.group({
          nameFormCtrl: ['', [
            Validators.required,
            Validators.pattern('[a-zA-Z\u00C0-\u017F\ ]+')
          ]
          ]
        }),
        this.fb.group({
          addressFormCtrl: ['', Validators.required]
        }),
        this.fb.group({
          cardNumFormCtrl: [
            null,
            [Validators.required,
            Validators.pattern('^[0-9]{16}$')
            ]
          ]
        })
      ])
    });

  }
  //Returns a FormArray with the name 'formArray'
  get formArray() {
    return this.payForm.get('formArray') as FormArray;
  }
  //------
  letChargeSomeMoney() {
    this.congrats = true;
    setTimeout(() => { this.showStepper.emit(false); }, 4000);
  }
  closeStepper() {
    this.showStepper.emit(false);
  }

}
