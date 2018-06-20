import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { timer } from 'rxjs/observable/timer';

import { LockScreenComponent } from  'ionic-simple-lockscreen';
import { Media, MediaObject } from '@ionic-native/media';
import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  timeInterval: number = 30;
  showAlert: boolean;

  constructor(public navCtrl: NavController,
    private platform: Platform,
    private nativeAudio: NativeAudio,
    private media: Media) {
      console.dir(this.platform);
       
  }

  save() {
    //timer(this.timeInterval*60*1000).subscribe(() => 
   
    console.log(this.timeInterval);
    /*
      timer takes a second argument, how often to emit subsequent values
      in this case we will emit first value after param1 second and subsequent
      values every param2 seconds after
    */
    timer(this.timeInterval * 1000,this.timeInterval * 1000).subscribe(() => {
      this.showAlert = false;
      this.playSound();
      this.openLockscreen();
      //this.save();
    });
    
  }

  playSound() {
    // Create a Media instance.  Expects path to file or url as argument
    // We can optionally pass a second argument to track the status of the media 
    if(this.platform && this.platform._platforms && this.platform._platforms.length > 0 &&  this.platform._platforms[0] ==='core'){  
      return;
    }
    const file: MediaObject = this.media.create('assets/alarm.mp3');

    // to listen to plugin events:

    if (file) {
      //file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes

      file.onSuccess.subscribe(() => {console.log('Action is successful');
        //this.save();
      });

      file.onError.subscribe(error => console.log('Error!', error));

      // // play the file
      file.play();

      // release the native audio resource
      // Platform Quirks:
      // iOS simply create a new instance and the old one will be overwritten
      // Android you must call release() to destroy instances of media when you are done
      //file.release();
    }

  }


  // playAudio() {
  //   this.nativeAudio.preloadSimple('uniqueId1', 'assets/alarm.mp3');//.then(onSuccess, onError);
  //   //this.nativeAudio.preloadComplex('uniqueId2', 'path/to/file2.mp3', 1, 1, 0).then(onSuccess, onError);

  //   this.nativeAudio.play('uniqueId1');//.then(onSuccess, onError);
  // }

  openLockscreen() {
    //console.log('log screen start...');
    this.navCtrl.push(LockScreenComponent,{
      code:'1234',
      ACDelbuttons:false,
      passcodeLabel:'请输入密码',
      onCorrect:function(){
        console.log('输入正确!');
      },
      onWrong:function(attemptNumber){
        console.log(attemptNumber + ' 错误密码输入次数(s)');
      }
    });
  }

}
