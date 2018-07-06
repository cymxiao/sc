import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { timer } from 'rxjs/observable/timer';

import { BackgroundMode } from '@ionic-native/background-mode';
import { LockScreenComponent } from 'ionic-simple-lockscreen';
import { Media, MediaObject } from '@ionic-native/media';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  timeInterval: number = 30;
  showAlert: boolean;
  startTime: Date = new Date();
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  timeInit: number = 0;
  openTimes: number = 0;
  lockScreenOpened: boolean;

  isAndroidOff: string;
  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private platform: Platform,
    private bgMode: BackgroundMode,
    private nativeAudio: NativeAudio,
    private media: Media) {
    //console.dir(this.platform);
    if (!this.bgMode.isEnabled()) {
      this.bgMode.enable();

    }
    if (!localStorage.getItem('startTime')) {
      localStorage.setItem('startTime', this.startTime.toString());
    }
    // if (!localStorage.getItem('seconds')) {
    //   localStorage.setItem('seconds', this.timeInit.toString());
    // }
    platform.resume.subscribe(x => {
      this.openTimes = this.openTimes + 1;
      //console.dir(this.platform); 
    });
    this.startTimer();

    platform.pause.subscribe( () => {
      console.log('platform pause...');
       
       console.log(this.bgMode.isEnabled);
      this.bgMode.isScreenOff().then( () =>{
        console.log('isScreenOff called');
        }
      );
      //console.dirxml(this.platform);
    });


    this.navCtrl.viewDidLoad.subscribe((vctrl) => {
      if (vctrl && vctrl.data && vctrl.data.code && vctrl.data.code==='1234') {
        this.lockScreenOpened = true;
      }  
    });

    this.navCtrl.viewDidLeave.subscribe((vctrl) => {
      if (vctrl && vctrl.data && vctrl.data.code && vctrl.data.code==='1234') {
        this.lockScreenOpened = false;
      }
    });
  }

  disableBG(){
    this.bgMode.disable();
  }

  startTimer() {
    let startTime = new Date();
    if (localStorage.getItem('startTime') != null) {
      startTime = new Date(localStorage.getItem('startTime'));
    }
    timer(1000, 1000).subscribe(() => {
      const currentTime = new Date();
      const timeDifference = currentTime.getTime() - startTime.getTime();

      //this.timeInit = this.timeInit + 1;  
      //timeElapsed is based on second
      const timeElapsed = Math.abs(timeDifference / 1000);

      this.days = Math.floor(timeElapsed / (60 * 60 * 24));
      this.hours = Math.floor(timeElapsed / (60 * 60)) - 24 * this.days;
      this.minutes = Math.floor(timeElapsed / 60) - 24 * 60 * this.days - 60 * this.hours;
      this.seconds = Math.floor(timeElapsed) - 24 * 60 * 60 * this.days - (60 * 60 * this.hours) - (60 * this.minutes);
    });
  }

  save() {
    //timer(this.timeInterval*60*1000).subscribe(() => 

    console.log(this.timeInterval);
    /*
      timer takes a second argument, how often to emit subsequent values
      in this case we will emit first value after param1 second and subsequent
      values every param2 seconds after
    */
    timer(this.timeInterval * 1000, this.timeInterval * 1000).subscribe(() => {
      this.showAlert = false;
      this.playSound();
      this.openLockscreen();
    });

  }

  playSound() {
    // Create a Media instance.  Expects path to file or url as argument
    // We can optionally pass a second argument to track the status of the media 
    if (this.platform && this.platform._platforms && this.platform._platforms.length > 0 && this.platform._platforms[0] === 'core') {
      return;
    }
    const file: MediaObject = this.media.create('assets/alarm.mp3');

    // to listen to plugin events:

    if (file && this.lockScreenOpened ) {
      // file.onSuccess.subscribe(() => {
      //   console.log('Action is successful'); 
      // });

      // file.onError.subscribe(error => console.log('Error!', error));

      // // play the file
      file.play();

      // release the native audio resource 
      // iOS simply create a new instance and the old one will be overwritten
      // Android you must call release() to destroy instances of media when you are done
      // if (this.platform.is('android')) {
      //   file.release();
      // }
    }

  }


  // playAudio() {
  //   this.nativeAudio.preloadSimple('uniqueId1', 'assets/alarm.mp3');//.then(onSuccess, onError);
  //   //this.nativeAudio.preloadComplex('uniqueId2', 'path/to/file2.mp3', 1, 1, 0).then(onSuccess, onError);

  //   this.nativeAudio.play('uniqueId1');//.then(onSuccess, onError);
  // }

  openLockscreen() {
    //avoid open more than one lock screen
    console.log(this.lockScreenOpened);
    if (!this.lockScreenOpened) {
      this.lockScreenOpened = true;
      //this.modalCtrl.create(LockScreenComponent, {
      this.navCtrl.push(LockScreenComponent, {
        code: '1234',
        ACDelbuttons: false,
        passcodeLabel: '请输入 1234 解锁',
        onCorrect: function () {
          console.log('输入正确!');
        },
        onWrong: function (attemptNumber) {
          console.log(attemptNumber + ' 错误密码输入次数(s)');
        }
      });
    }
  }

}
