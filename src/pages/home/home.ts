import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { timer } from 'rxjs/observable/timer';

import { Media, MediaObject } from '@ionic-native/media';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  timeInterval: number;
  showAlert: boolean;

  constructor(public navCtrl: NavController,
    private media: Media) {

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
      //this.save();
    });
    
  }

  playSound() {
    // Create a Media instance.  Expects path to file or url as argument
    // We can optionally pass a second argument to track the status of the media
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

}
