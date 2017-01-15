import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';


import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { TestPagePage } from '../pages/test-page/test-page';
import { CartPage } from '../pages/cart/cart';
import { TabsPage } from '../pages/tabs/tabs';
import { LogintabPage } from '../pages/logintab/logintab';
import { CheckoutPage } from '../pages/checkout/checkout';
import { FbLoginPage } from '../pages/fb-login/fb-login';
import { GoogleLoginPage } from '../pages/google-login/google-login';
import { UserPage } from '../pages/user/user';
import { AccountPage } from '../pages/account/account';
import firebase from 'firebase';
import { LogoutPage } from '../pages/logout/logout';
import { MyAccountPage } from '../pages/my-account/my-account';
import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { UpdateAccountInfoPage } from '../pages/update-account-info/update-account-info';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {

   const firebaseConfig = {
      apiKey: "AIzaSyByyA3R_KJMD2LF9G95eu7qM5xGA7evMGc",
      authDomain: "medicinebazaarandroid.firebaseapp.com",
      databaseURL: "https://medicinebazaarandroid.firebaseio.com",
      storageBucket: "medicinebazaarandroid.appspot.com",
      messagingSenderId: "420052832956"
    };      
    
    firebase.initializeApp(firebaseConfig);    
   /* firebase.auth().onAuthStateChanged( user => {
      if (!user) {
        this.rootPage = LogintabPage;
        console.log("There's not a logged in user!");
      }
    });*/

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    // set our app's pages
    this.pages = [
    
      {title: 'Search Products', component: SearchPage},
      {title: 'Infinite Scroll', component: ItemDetailsPage},
      {title: 'TestInfinite', component: TestPagePage},
      {title: 'Cart', component: CartPage},
      {title: 'Login ', component: TabsPage},
      {title: 'Checkout', component: CheckoutPage},
      {title: 'FbLogin', component: FbLoginPage},
      {title: 'GLogin', component: GoogleLoginPage},
      {title: 'Account', component: AccountPage},
      {title: 'Logout', component: LogoutPage},
      {title: 'My Account', component: MyAccountPage}

    ];
      
  }



  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    //this.nav.setRoot(page.component);
      this.nav.push(page.component);
  }
}
