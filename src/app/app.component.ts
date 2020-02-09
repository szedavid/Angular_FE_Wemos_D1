import { Component } from '@angular/core';
import { SpeechService } from './service/speech.service';
import { MainService } from './service/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wemos controller';

  constructor(
      public mainService: MainService,
      public speechService: SpeechService) {
  }
}
