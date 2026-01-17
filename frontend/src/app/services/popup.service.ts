import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface PopUp {
  message: string;
  actionMessage: string;
  action: (params: any) => void;
}

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  private popUpSubject = new Subject<PopUp>();
  public popUp$ = this.popUpSubject.asObservable();

  showPopUp(popUp: PopUp) {
    this.popUpSubject.next(popUp);
  }
}