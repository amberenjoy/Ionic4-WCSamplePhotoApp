import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { WelcomePage } from "../pages/welcome/welcome";
import { AppUpdate } from "@ionic-native/app-update";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = WelcomePage;
  showSplash = true;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    appUpdate: AppUpdate
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      const updateUrl = "https://www.enjoybag.com.hk/remote/test/upload.xml";
      appUpdate
        .checkAppUpdate(updateUrl)
        .then(result => {
          if (result.code === 202) {
            console.log("It is updated app");
          } else {
            console.log("Update available");
          }
        })
        .catch(err => {
          console.log(err);
          console.log("Remote app update failed");
        });
    });
  }
}
