import { Injectable, OnInit } from '@angular/core';

const LANGUAGE = 'en-US';
const LOCALSTORAGE_KEY_FOR_ISENABLED = 'isSpeachEnabled';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  public isEnabled = true;

  private synth;
  private voice;

  constructor() {
    this.synth = window.speechSynthesis;
    if (speechSynthesis !== undefined) {
      // speechSynthesis.onvoiceschanged = PopulateVoices;
      const voices = this.synth.getVoices();  // all available voices
      this.voice = voices.find(value => value.lang === LANGUAGE);
    }

    const savedValue = localStorage.getItem(LOCALSTORAGE_KEY_FOR_ISENABLED);
    if (savedValue !== null) {
      this.isEnabled = JSON.parse(savedValue);
    }
  }

  speak(text: string) {
    // this.synth.cancel();
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
