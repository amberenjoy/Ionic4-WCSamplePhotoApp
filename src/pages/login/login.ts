import { Component } from '@angular/core';
import { NavController, App, Platform, AlertController  } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { AppUpdate } from '@ionic-native/app-update';

@Component({
  selector: 'page-about',
  templateUrl: 'login.html'
})
export class LoginPage {
  appName: string;
  appVersionCode: string;
  constructor(public navCtrl: NavController, public app: App, public platform: Platform, private appVersion: AppVersion, public appUpdate: AppUpdate,public alertCtrl: AlertController) {
    let nav = app.getActiveNav();
    platform.registerBackButtonAction(() => {
      nav.parent.select(0); // IF IT'S THE ROOT, EXIT THE APP.
    });
    this.appVersion.getAppName().then(result => this.appName = result);
    this.appVersion.getVersionNumber().then(result => this.appVersionCode = result);
  }
  logout() {
    // Remove API token 
    const root = this.app.getRootNav();
    root.popToRoot();
  }
  checkUpdate() {
    const updateUrl = 'https://www.enjoybag.com.hk/remote/upload.xml';
    this.appUpdate.checkAppUpdate(updateUrl).then((result) => {
      // console.log(result);
      if(result.code===202){
        console.log('It is updated app');
        this.showAlert();
      }else{
        console.log('Update available')
      }
    }).catch(
      err => {
        console.log(err)
       
      }
    );
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: '已经是最新版本!',
      buttons: ['确定']
    });
    alert.present();
  }
}
