import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MonitorModel } from '../model/monitor.model';
import { ControllerModel } from '../model/controller.model';
import { SpeechService } from './speech.service';

const PATH_VER = `${environment.url}${environment.restversion}`;

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private http: HttpClient,
              private speechService: SpeechService) {
  }

  public LAST_REQUEST_FAILED_TEXT = 'Last request failed! Please check connections!';

  private lastRequestFailed = false;

  getMonitorData(): Observable<MonitorModel> {
    return this.http.get<MonitorModel>(`${PATH_VER}/monitor`);
  }

  getControllerData(): Observable<ControllerModel> {
    return this.http.get<ControllerModel>(`${PATH_VER}/controller`);
  }

  setLedState(ledState: boolean): Observable<ControllerModel> {
    return this.http.post<ControllerModel>(`${PATH_VER}/led?state=${ledState}`, null);
  }

  setServo(servoAngle: number): Observable<ControllerModel> {
    return this.http.post<ControllerModel>(`${PATH_VER}/servo?angle=${servoAngle}`, null);
  }

  public isLastRequestFailed(): boolean {
    return this.lastRequestFailed;
  }

  public setLastRequestFailed(failed: boolean) {
    if (this.lastRequestFailed !== failed) {
      this.lastRequestFailed = failed;
      if (this.lastRequestFailed) {
        this.speechService.speak(this.LAST_REQUEST_FAILED_TEXT);
      }
    }
  }
}
