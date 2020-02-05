import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ControllerModel, MonitorModel } from '../models/wemos.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private http: HttpClient) {
  }

  getMonitorData(): Observable<MonitorModel> {
    return this.http.get<MonitorModel>(`${environment.url}/monitor`);
  }

  getControllerData(): Observable<ControllerModel> {
    return this.http.get<ControllerModel>(`${environment.url}/controller`);
  }

  // setLedState(toOn: boolean) {
  //   console.log('setled');
  //   return this.http.get<MonitorModel>(`${environment.url}/${toOn ? 'on' : 'off'}`);
  // }

  setLedState(ledState: boolean): Observable<ControllerModel> {
    return this.http.post<ControllerModel>(`${environment.url}/led?state=${ledState}`, null);
  }

  setServo(servoAngle: number): Observable<ControllerModel> {
    return this.http.post<ControllerModel>(`${environment.url}/servo?angle=${servoAngle}`, null);
  }
}
