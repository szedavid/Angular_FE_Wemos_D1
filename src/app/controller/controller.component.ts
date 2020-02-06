import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';
import { interval } from 'rxjs';
import { SpeechService } from '../service/speech.service';

const UPDATE_INTERVAL = 1000;   // timing of data refresh

const LED_TEXTS: string[] = ['LED is now turned', 'Lights', 'Now its', 'Turned', 'LED on Wemos D1 mini is'];
const SERVO_TEXTS: string[] = ['Servo angle is', 'Angle is', 'Servo at', 'Servo is set to'];

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent implements OnInit, OnDestroy {
  private intervalSubscription;

  // todo change to ControllerModel
  public ledState = false;
  public servoAngle = 0;

  constructor(private mainService: MainService,
              private speechService: SpeechService) {
  }

  ngOnInit(): void {
    this.speechService.cancel();    // mute previous page
    this.speechService.speak('Here you can control the LED and the servo.');

    this.getData();   // speeding thigns up
    this.intervalSubscription = interval(UPDATE_INTERVAL).subscribe(() => {
      this.getData();
    });
  }

  getData() {
    this.mainService.getControllerData().subscribe((data) => {// console.log(data);
      this.updateLedState(data.ledState);
      this.updateServoState(data.servoAngle);
    });   // todo error
  }

  toggleLedState() {
    this.mainService.setLedState(!this.ledState).subscribe((data) => {
      this.updateLedState(data.ledState);
      // this.updateServoState(data.servoAngle);
    });   // todo error
  }

  setServo(servoAngle) {
    this.mainService.setServo(servoAngle).subscribe((data) => {
      // this.updateLedState(data.ledState);
      this.updateServoState(data.servoAngle);
    });  // todo error
  }

  updateLedState(newState: boolean) {
    if (this.ledState !== newState) {
      this.ledState = newState;
      this.speechService.speak(`${LED_TEXTS[Math.floor(Math.random() * LED_TEXTS.length)]} ${newState ? 'on' : 'off'}.`);
    }
  }

  updateServoState(newAngle: number) {
    if (this.servoAngle !== newAngle) {
      this.servoAngle = newAngle;
      this.speechService.speak(`${SERVO_TEXTS[Math.floor(Math.random() * SERVO_TEXTS.length)]} ${newAngle} degrees.`);
    }
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }
}
