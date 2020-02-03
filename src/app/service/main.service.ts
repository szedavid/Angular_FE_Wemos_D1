import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wemos } from '../models/wemos.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private http: HttpClient) {
  }

  getData(): Observable<Wemos> {
    return this.http.get<Wemos>(`${environment.url}/rest`);
  }

  setLedState(toOn: boolean) {
    console.log('setled');
    return this.http.get<Wemos>(`${environment.url}/${toOn ? 'on' : 'off'}`);
  }
}
