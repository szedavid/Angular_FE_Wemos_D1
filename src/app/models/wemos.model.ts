export class MonitorModel {
  constructor(public time: string, public value: number) {
  }
}

export class ControllerModel {
  constructor(public ledState: boolean, public servoAngle: number) {
  }
}
