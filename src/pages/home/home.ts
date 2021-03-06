import { Component } from '@angular/core';
 
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';  
import {MailSend} from '../../providers/mail-send';
import {Camera} from 'ionic-native';
import { Platform, ActionSheetController,ToastController, LoadingController } from 'ionic-angular';
import { NavController} from 'ionic-angular';
import {SearchPage} from '../search/search'; 
import { Storage } from '@ionic/storage';   
import {CartPage} from '../cart/cart';
import { Transfer } from 'ionic-native';  
import {AddressPage} from '../address/address';
import { TestCategoryPage } from '../test-category/test-category';
/*
  Generated class for the Home page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({

  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[MailSend]
    
})
export class HomePage {
 
  searchPage = SearchPage;
    public base64Image: string;
private imageSrc: string;
 public productCount: any = 0;
 public CustomerEmail: any;
 mailResponse: any;
 public CustomerContact: any;
 loading: any;
  constructor(public toastCtrl: ToastController, public mailSend:MailSend,public http: Http,public platform: Platform, 
    public actionsheetCtrl: ActionSheetController, public navCtrl: NavController, public storage: Storage,
    public loadingCtrl: LoadingController) {
      
      this.storage.get('productCount').then((val)=>{
        if(!val){
            console.log('this.ProductCoitasd', this.productCount);
            this.productCount = 0;
        }
        else{
            console.log('this.ProductCoitasd', this.productCount);
            this.productCount = val;
        }
            
         
      });
    
  
  }

navSearch(){
    
    this.navCtrl.push(this.searchPage);
}
openMenu() {
       //check  if user exist
     this.storage.get('customerContact').then((value)=>{
       console.log("customerContact: ", value);

        if(!value){
            let toast = this.toastCtrl.create({
        message: 'You need to login first OR Fill up the details!',
        duration: 3000,
        position: 'bottom'
       });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
        this.navCtrl.push(AddressPage); 
      });

      toast.present(toast);
        }
        else{
          this.CustomerEmail=value.customerEmail;
          this.CustomerContact = value.customerContact;
          

                
                 let actionSheet = this.actionsheetCtrl.create({
      title: 'Choose an option to upload',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Camera',
          
          icon: 'camera',
          handler: () => {
            console.log('Camera clicked');
               Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
        
        this.cameraImageSend(this.base64Image,imageData,this.CustomerEmail, this.CustomerContact);
    }, (err) => {
        console.log(err);
    });
          }
        },
        {
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            console.log('Gallery Clicked');
              let cameraOptions = {
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: Camera.DestinationType.FILE_URI,      
    quality: 100,
    targetWidth: 1000,
    targetHeight: 1000,
    encodingType: Camera.EncodingType.JPEG,      
    correctOrientation: true
  }

  Camera.getPicture(cameraOptions)
   .then((file_uri) => {this.imageSrc = file_uri;
        //   alert(this.imageSrc.split('/').pop());
        //  alert("file location"+this.imageSrc);
        
          this.fileTransfer(this.imageSrc,this.CustomerEmail, this.CustomerContact);

         
          /*
        this.galleryImageSend(this.imageSrc,);
        */
},
    err => console.log(err)); 
          }
        }
        
      ]
    });
    actionSheet.present();   
              
            
           
        }
      });
    
}
fileTransfer(imageSrc,CustomerEmail, CustomerContact)
 {
   //alert("File transfer working");
   /*
 Cloudinary.v2.uploader.unsigned_upload(imageSrc, "cmoxms3e", 
    { cloud_name: "dtkd8f03m" }, 
    function(error, result) {alert(result) });
  
  */
   let filename = imageSrc.split('/').pop();
//   let namePath = imageSrc.substr(0, imageSrc.indexOf('?'));
   let newFileName=filename.substr(0,filename.indexOf('?'));
  // alert("filename"+filename);
  // alert("namePath"+namePath);
  // alert("newFileName"+newFileName);
    let options = {
      fileKey: "file",
      fileName: newFileName,
      chunkedMode: false,
      mimeType: "image/jpg",
      params : {'fileName': newFileName, 'email':CustomerEmail, 'contact':CustomerContact},  
      headers :{
          Connection: "close"
        }
    };
 
 
    const fileTransfer = new Transfer();
 
    fileTransfer.upload(imageSrc, 'https://medicinebazaar.in/upload.php',
      options,true).then((entry) => {
      //  alert(JSON.stringify(entry)); 
        let toast = this.toastCtrl.create({
        message: 'Upload successfull! You will soon be contacted.',
        duration: 3000,
        position: 'bottom'
       });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
         
      });

      toast.present(toast);

      }, (err) => {
        let toast = this.toastCtrl.create({
        message: 'An error occurred! Please try again.',
        duration: 3000,
        position: 'bottom'
       });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
         
      });

      toast.present(toast);
      //  alert(JSON.stringify(err));
      });

//  alert("finish working");
}


checkCart(){
    
    this.navCtrl.push(CartPage);
}

ionViewDidEnter(){
    this.storage.get('productCount').then((val)=>{
        if(!val){
            console.log('this.ProductCoitasd', this.productCount);
            this.productCount = 0;
        }
        else{
            console.log('this.ProductCoitasd', this.productCount);
            this.productCount = val;
        }
            
         
      });
}
 //camera image send
  cameraImageSend(base64,imageData,CustomerEmail, CustomerContact)
  {
     
      this.mailSend.mailSending(base64,imageData,CustomerEmail, CustomerContact).subscribe(mailResponse => {
        this.mailResponse = mailResponse;
        console.log(this.mailResponse);
          let toast = this.toastCtrl.create({
        message: 'Upload successfull! You will soon be contacted.',
        duration: 3000,
        position: 'bottom'
       });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
         
      });

      toast.present(toast);

      },
        err => {
        console.log(err);
         let toast = this.toastCtrl.create({
        message: 'An error occurred! Please try again.',
        duration: 3000,
        position: 'bottom'
       });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
         
      });

      toast.present(toast);
    },
        () => {
        console.log('Completed');
    });
  }

  searchCategory(){
        this.loading = this.loadingCtrl.create({
      
      content: 'Opening...'
    });

    this.loading.present();

    setTimeout(() => {
     this.navCtrl.push(TestCategoryPage);
    }, 2000);

    setTimeout(() => {
      this.loading.dismiss();
    }, 3000);


  }
  
}