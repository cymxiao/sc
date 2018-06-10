import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { timer } from 'rxjs/observable/timer';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  timeInterval : number;
  showAlert:boolean;

  constructor(public navCtrl: NavController) {
    
  }

  save(){
    //timer(this.timeInterval*60*1000).subscribe(() => this.showAlert = false);  
    timer(this.timeInterval*60*1000).subscribe(() => {
      this.showAlert = false}); 
  }

}
