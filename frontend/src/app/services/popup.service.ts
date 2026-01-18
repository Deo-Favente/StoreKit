import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface PopUp {
  message: string;
  actionMessage: string;
  action: () => Promise<void>;
  actionMessage2?: string;
  action2?: () => Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  private popUpSubject = new Subject<PopUp>();
  public popUp$ = this.popUpSubject.asObservable();
  private onPopupClosed: ((success: boolean) => void) | null = null;

  showPopUp(config: PopUp): Promise<boolean> {
    // blur
    document.getElementById('app-home')?.classList.add('opacity-10');
    return new Promise((resolve) => {
      // Afficher la popup
      this.popUpSubject.next(config);
      
      // Résoudre la Promise lorsque la popup est fermée
      // resolve(true) = action effectuée, resolve(false) = annulé
      this.onPopupClosed = (success: boolean) => {
        resolve(success);
      };
    });
  }

  // Méthode appelée quand l'action est effectuée (continuer la séquence)
  closePopUp() {
    // remove blur
    document.getElementById('app-home')?.classList.remove('opacity-10');
    if (this.onPopupClosed) {
      this.onPopupClosed(true);
      this.onPopupClosed = null;
    }
  }

  // Méthode appelée quand l'utilisateur annule (arrêter la séquence)
  cancelPopUpSequence() {
    // remove blur
    document.getElementById('app-home')?.classList.remove('opacity-10');
    if (this.onPopupClosed) {
      this.onPopupClosed(false);
      this.onPopupClosed = null;
    }
  }
}