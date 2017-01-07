import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the NewService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FetchProducts {
public data: any;
  constructor(public http: Http) {
    console.log('Hello Fetch Products Provider');
  }
load() {
  if (this.data) {
    // already loaded data
    return Promise.resolve(this.data);
  }

  // don't have the data yet
  return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
    this.http.get('https://www.ezmart.in/wp-json/wc/v1/products?consumer_key=ck_688fda4ec5e99c64dbc995c8e8270373f8b43f81&consumer_secret=cs_dca8a667e2990fc62885c5887465d23c12c21c8e')
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = data;
        resolve(this.data);
      },
        err => {
        console.log("Oops!");
    },
        () => {
        console.log('Completed');
    });
  });
}
searchProducts(searchParam: string, offset) {
console.log("Inside the searchProducts:" + searchParam + "Offset:" + offset);

    
return this.http.get('https://www.ezmart.in/wp-json/wc/v1/products?search='+searchParam+'&offset='+offset+'&order=asc&consumer_key=ck_688fda4ec5e99c64dbc995c8e8270373f8b43f81&consumer_secret=cs_dca8a667e2990fc62885c5887465d23c12c21c8e') 
      .map(res =>(res.json()))

  }


}