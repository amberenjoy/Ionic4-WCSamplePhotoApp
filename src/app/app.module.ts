import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { UserPage } from "../pages/user/user";
import { WelcomePage } from "../pages/welcome/welcome";
import { OrderPage } from "../pages/order/order";
import { HomePage } from "../pages/home/home";
import { RegisterPage } from "../pages/register/register";
import { TabsPage } from "../pages/tabs/tabs";
import { OrderlistPage } from "../pages/orderlist/orderlist";
import { ModalPage } from "../pages/modal/modal";
import { ClientlistPage } from "../pages/clientlist/clientlist";

import { HttpClientModule } from "@angular/common/http";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Camera } from "@ionic-native/camera";
import * as ionicGalleryModal from "ionic-gallery-modal";
import { HAMMER_GESTURE_CONFIG } from "@angular/platform-browser";
import { RestProvider } from "../providers/rest/rest";
import { IonicStorageModule } from "@ionic/storage";
import { AppUpdate } from "@ionic-native/app-update";
import { AppVersion } from "@ionic-native/app-version";

@NgModule({
  declarations: [
    MyApp,
    UserPage,
    OrderPage,
    HomePage,
    TabsPage,
    WelcomePage,
    OrderlistPage,
    ModalPage,
    ClientlistPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ionicGalleryModal.GalleryModalModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: "返回",
      navExitApp: false
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UserPage,
    OrderPage,
    HomePage,
    TabsPage,
    ClientlistPage,
    OrderlistPage,
    ModalPage,
    WelcomePage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AppUpdate,
    AppVersion,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig
    },
    RestProvider
  ]
})
export class AppModule {}
