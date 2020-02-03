import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wemos } from '../models/wemos.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  protected resourceUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getData(): Observable<Wemos> {
    return this.http.get<Wemos>(`${this.resourceUrl}/rest`);
  }
}
