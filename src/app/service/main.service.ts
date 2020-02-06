import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ControllerModel, MonitorModel } from '../model/wemos.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const PATH_VER = `${environment.url}${environment.restversion}`

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private http: HttpClient) {
  }

  getMonitorData(): Observable<MonitorModel> {
    return this.http.get<MonitorModel>(`${PATH_VER}/monitor`);
  }

  getControllerData(): Observable<ControllerModel> {
    return this.http.get<ControllerModel>(`${PATH_VER}/controller`);
  }

  // setLedState(toOn: boolean) {
  //   console.log('setled');
  //   return this.http.get<MonitorModel>(`${environment.url}/${toOn ? 'on' : 'off'}`);
  // }

  setLedState(ledState: boolean): Observable<ControllerModel> {
    return this.http.post<ControllerModel>(`${PATH_VER}/led?state=${ledState}`, null);
  }

  setServo(servoAngle: number): Observable<ControllerModel> {
    return this.http.post<ControllerModel>(`${PATH_VER}/servo?angle=${servoAngle}`, null);
  }
}
