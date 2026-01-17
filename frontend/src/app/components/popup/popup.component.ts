import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { PopUpService, PopUp } from '@services/popup.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-notification',
  imports: [MatIconModule],
  templateUrl: './popup.component.html'
})
export class PopUpComponent implements OnInit {
  popup: PopUp | null = null;

  constructor(private PopUpService: PopUpService) {}

  ngOnInit() {
    this.PopUpService.popUp$.subscribe(popup => {
      this.popup = popup;
    });
  }

  closeNotification() {
    this.popup = null;
  }

  makeAction() {
    if (this.popup?.action) {
      this.popup.action();
    }
    this.closeNotification();
  }
}