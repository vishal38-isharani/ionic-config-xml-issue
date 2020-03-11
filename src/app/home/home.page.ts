import { Component } from '@angular/core';
import { DataService, Message } from '../services/data.service';
import * as AndroidPermissions from '@ionic-native/android-permissions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private data: DataService) {}

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  ionViewDidEnter() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = './assets/service.js';

    document.getElementsByTagName('head')[0].appendChild(script);

    AndroidPermissions.AndroidPermissions.checkPermission(AndroidPermissions.AndroidPermissions.PERMISSION.CAMERA).then(
        result => console.log('Has permission?', result.hasPermission),
        err => AndroidPermissions.AndroidPermissions.requestPermission(AndroidPermissions.AndroidPermissions.PERMISSION.CAMERA)
    );

    AndroidPermissions.AndroidPermissions.requestPermissions([
        AndroidPermissions.AndroidPermissions.PERMISSION.CAMERA,
        AndroidPermissions.AndroidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS
    ]);
  }

}
