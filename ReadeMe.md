ionic cordova plugin add https://github.com/katzer/cordova-plugin-background-mode --nofetch

Deploy: 
ionic cordova platform remove android
ionic cordova platform add android@6.4.0
ionic cordova platform remove ios
ionic cordova platform add ios 





Running Your App
To run your app, all you have to do is enable USB debugging and Developer Mode on your Android device, then run ionic cordova run android --device from the command line.

To run or build your app for production, run

ionic cordova run android --prod --release
# or
ionic cordova build android --prod --release



ionic cordova build ios --prod --release


#PS: Important note for IOS env.
update '_requiresUserActionForMediaPlayback' to 'requiresUserActionForMediaPlayback', then crash issue in IOS fixed.