import { Component } from '@angular/core';
import { SpeechService } from './service/speech.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wemos';

  constructor(public speechService: SpeechService) {
  }
}
