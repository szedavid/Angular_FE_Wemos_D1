import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';
import { interval } from 'rxjs';
import { SpeechService } from '../service/speech.service';
import { ControllerModel } from '../model/controller.model';

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

  public unknownValues = true;  // only show statuses after received from BE
  public currentControllerModel: ControllerModel = {ledState: false, servoAngle: 0};

  constructor(private mainService: MainService,
              private speechService: SpeechService) {
  }

  ngOnInit(): void {
    this.speechService.cancel();    // mute previous page
    // this.speechService.speak('Here you can control the LED and the servo.');

    this.getData();   // speeding thigns up
    this.intervalSubscription = interval(UPDATE_INTERVAL).subscribe(() => {
      this.getData();
    });
  }

  getData() {
    this.mainService.getControllerData().subscribe((data) => {  // console.log(data);
      if (this.unknownValues) {
        this.unknownValues = false;
      }
      this.mainService.setLastRequestFailed(false);
      this.updateLedState(data.ledState);
      this.updateServoState(data.servoAngle);
    }, error => this.mainService.setLastRequestFailed(true));
  }

  toggleLedState() {
    this.mainService.setLedState(!this.currentControllerModel?.ledState).subscribe((data) => {
      this.mainService.setLastRequestFailed(false);
      this.updateLedState(data.ledState);
      // this.updateServoState(data.servoAngle);
    }, error => this.mainService.setLastRequestFailed(true));
  }

  setServo(servoAngle) {
    this.mainService.setServo(servoAngle).subscribe((data) => {
      this.mainService.setLastRequestFailed(false);
      // this.updateLedState(data.ledState);
      this.updateServoState(data.servoAngle);
    }, error => this.mainService.setLastRequestFailed(true));
  }

  updateLedState(newState: boolean) {
    if (this.currentControllerModel.ledState !== newState) {
      this.currentControllerModel.ledState = newState;
      this.speechService.speak(`${LED_TEXTS[Math.floor(Math.random() * LED_TEXTS.length)]} ${newState ? 'on' : 'off'}.`);
    }
  }

  updateServoState(newAngle: number) {
    if (this.currentControllerModel.servoAngle !== newAngle) {
      this.currentControllerModel.servoAngle = newAngle;
      this.speechService.speak(`${SERVO_TEXTS[Math.floor(Math.random() * SERVO_TEXTS.length)]} ${newAngle} degrees.`);
    }
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }
}
