import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent implements OnInit, OnDestroy {
  private UPDATE_INTERVAL = 1000;
  private intervalSubscription;

  // todo change to ControllerModel
  public ledState = false;
  public servoAngle = 0;

  constructor(private service: MainService) {
  }

  ngOnInit(): void {
    this.getData();   // speeding thigns up
    this.intervalSubscription = interval(this.UPDATE_INTERVAL).subscribe(() => {
      this.getData();
    });
  }

  getData() {
    this.service.getControllerData().subscribe((data) => {// console.log(data);
      this.ledState = data.ledState;
      this.servoAngle = data.servoAngle;
    });   // todo error
  }


  toggleLedState() {
    this.service.setLedState(!this.ledState).subscribe((data) => {
      this.ledState = data.ledState;
      this.servoAngle = data.servoAngle;
    });   // todo error
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  setServo(servoAngle) {
    this.service.setServo(servoAngle).subscribe((data) => {
      this.servoAngle = data.servoAngle;
    });  // todo error
  }
}
