import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ChatPage } from '../pages/chat/chat';
import { ExamPage } from '../pages/exam/exam';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TosAndPolicyPage} from '../pages/tos-and-policy/tos-and-policy';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { CProvider } from '../providers/c/c';

import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import {Camera} from '@ionic-native/camera';

import {Geolocation} from '@ionic-native/geolocation';
import {NativeGeocoder} from '@ionic-native/native-geocoder';
import { HostnameProvider } from '../providers/hostname/hostname';
import { GalleryPage } from '../pages/gallery/gallery';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ChatPage,
    ExamPage,
    GalleryPage,
    TosAndPolicyPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ChatPage,
    ExamPage,
    TosAndPolicyPage,
    GalleryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageServiceProvider,
    CProvider,
    LocalStorageProvider,
    Camera,
    Geolocation,
    NativeGeocoder,
    HostnameProvider
  ]
})
export class AppModule {}
