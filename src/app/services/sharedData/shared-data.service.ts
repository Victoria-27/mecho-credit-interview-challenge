// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private buttonTextSubject = new BehaviorSubject<string>(''); // Initialize with an empty string
  buttonText$: Observable<string> = this.buttonTextSubject.asObservable();

  setButtonText(text: string) {
    this.buttonTextSubject.next(text);
  }
}
