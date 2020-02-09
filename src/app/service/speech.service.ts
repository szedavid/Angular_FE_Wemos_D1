import { Injectable } from '@angular/core';

const LANGUAGE = 'en-US';
const LOCALSTORAGE_KEY_FOR_ISENABLED = 'isSpeachEnabled';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  public isSupported = false; // indicates if the LANGUE is supported by the browser
  public isEnabled = false; // indicates if the APP is enabled to talk

  private synth;
  private voice;

  constructor() {
    this.synth = window.speechSynthesis;
    if (speechSynthesis !== undefined) {
      // it takes some time to populate the voices array as it does so, asynchronously
      setTimeout(() => {
        console.log(window.speechSynthesis);
        const voices = this.synth.getVoices();  // all available voices
        console.log(voices);
        this.voice = voices.find(value => value.lang === LANGUAGE);

        // Edge (before chrome engine) support
        if (this.voice) {   // check if the required LANGUAGE is available
          // enable it by default
          this.isSupported = true;
          this.isEnabled = true;

          // get prev. config if extists (check if it was disabled)
          const savedValue = localStorage.getItem(LOCALSTORAGE_KEY_FOR_ISENABLED);
          if (savedValue !== null) {
            this.isEnabled = JSON.parse(savedValue);
          }
        }
      }, 50);
    }
  }

  speak(text: string) {
    this.synth.cancel();
    if (!this.isEnabled) {
      return;
    }
    const toSpeak = new SpeechSynthesisUtterance(text);
    toSpeak.voice = this.voice;
    this.synth.speak(toSpeak);
  }

  cancel() {
    if (!this.isEnabled) {
      return;
    }
    this.synth.cancel();  // removes all utterances from the utterance queue
  }

  toggle() {
    if (this.isEnabled) {
      this.synth.cancel();  // mute immediately
    }
    this.isEnabled = !this.isEnabled;
    localStorage.setItem(LOCALSTORAGE_KEY_FOR_ISENABLED, String(this.isEnabled));
  }
}
