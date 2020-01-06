import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingController } from "ionic-angular";
import { BehaviorSubject } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json; charset=utf-8"
  })
};

@Injectable()
export class RestProvider {
  sampleList = new BehaviorSubject<any>([]);

  constructor(public http: HttpClient, public loadingCtrl: LoadingController) { }

  getUsers() {
    const apiUrl =
      "http://mail.wingchit.com.hk/wcapps/so.nsf/JSONSO?ReadViewEntries&outputformat=JSON&count=1000";
    let loading = this.loadingCtrl.create({
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box"></div>
        </div>`
    });
    loading.present();
    return new Promise(resolve => {
      this.http.get(apiUrl, { observe: "response" }).subscribe(
        resp => {
          // Here, resp is of type HttpResponse<MyJsonData>.
          loading.dismiss();
          resolve(resp.body);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  // getCompleteOrder() {
  //   const url =
  //     "http://mail.wingchit.com.hk/wcapps/so.nsf/CompletedSO?ReadViewEntries&outputformat=JSON&ResortDescending=14&Count=7";
  //   return new Promise(resolve => {
  //     this.http.get(url, { observe: "response" }).subscribe(
  //       resp => {
  //         resolve(resp.body);
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     );
  //   });
  // }

  saveImage(data) {
    const apiUrl =
      "http://mail.wingchit.com.hk/wcapps/photo.nsf/rest.xsp/upload";
    let loading = this.loadingCtrl.create({
      content: "正在上传...."
    });
    loading.present();
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl, JSON.stringify(data), httpOptions).subscribe(
        res => {
          loading.dismiss();
          resolve(res);
        },
        err => {
          loading.dismiss();
          console.log(err);
          reject(err);
        }
      );
    });
  }

  testImage() {
    const data = [{
      login: "11330",
      password: "8785"
    }];
    const apiUrl =
      "http://mail.wingchit.com.hk/wcapps/plan.nsf/rest.xsp/mobilelogin";

    return new Promise((resolve, reject) => {
      this.http.post(apiUrl, JSON.stringify(data), httpOptions).subscribe(
        res => {
          console.log(res);
          resolve(res);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

}
