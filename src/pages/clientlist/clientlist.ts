import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  ModalController
} from "ionic-angular";
import { OrderlistPage } from "../orderlist/orderlist";
import { RestProvider } from "../../providers/rest/rest";
import { Storage } from "@ionic/storage";
import { ModalPage } from "../modal/modal";

/**
 * Generated class for the ClientlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-clientlist",
  templateUrl: "clientlist.html"
})
export class ClientlistPage {
  mockClient: any;
  mockData: any;
  customerList: any;
  users: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider,
    public storage: Storage,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {
    this.initializeclientItems();
  }

  initializeclientItems() {
    this.restProvider.getUsers().then(data => {
      this.mockData = data; //original unformatted data
      this.mockClient = [];
      let uniqueList = <any>[];
      for (let i = 0; i < this.mockData.viewentry.length; i++) {
        let obj = <any>{};
        let objChild = <any>{};
        obj.name = true;
        obj.orders = [];
        objChild.id = true;
        objChild.class = true;
        objChild.typeList = [];
        objChild.colorList = [];

        let thisCustromer = this.mockData.viewentry[i].entrydata[0].text[0]; //Client Name
        let thisOrdersID = this.mockData.viewentry[i].entrydata[1].text[0]; //Sample Id
        let thisOrdersClass = this.mockData.viewentry[i].entrydata[4].text[0]; // Sample class

        for (let j = 7; j < 17; j++) {
          //get typeList of a sample id (7-16)
          if (
            !this.mockData.viewentry[i].entrydata[j].textlist &&
            this.mockData.viewentry[i].entrydata[j].text[0] != ""
          ) {
            let thisOrdersTypeList = <any>{};
            thisOrdersTypeList.type = true;
            thisOrdersTypeList.client = "";
            thisOrdersTypeList.type = this.mockData.viewentry[i].entrydata[
              j
            ].text[0];
            objChild.typeList.push(thisOrdersTypeList);
          } else if (this.mockData.viewentry[i].entrydata[j].textlist) {
            let thisOrdersTypeList = <any>{};
            thisOrdersTypeList.type = true;
            thisOrdersTypeList.client = "";
            thisOrdersTypeList.type = "";
            this.mockData.viewentry[i].entrydata[j].textlist.text.forEach(
              element => {
                thisOrdersTypeList.type = thisOrdersTypeList.type + element[0];
              }
            );
            objChild.typeList.push(thisOrdersTypeList);
          }
        }
        for (let z = 17; z < 27; z++) {
          if (this.mockData.viewentry[i].entrydata[z].text[0] != "") {
            objChild.colorList.push(
              this.mockData.viewentry[i].entrydata[z].text[0]
            );
          }
        }

        objChild.id = thisOrdersID;
        objChild.class = thisOrdersClass;
        obj.orders.push(objChild);

        if (uniqueList.indexOf(thisCustromer) === -1) {
          uniqueList.push(thisCustromer);
          obj.name = thisCustromer;
          this.mockClient.push(obj);
        } else {
          let index = uniqueList.indexOf(thisCustromer);
          this.mockClient[index].orders.push(objChild);
        }
      }
      // console.log(this.mockClient);
      console.log("refresh?");
    });
  }

  getOrder(name, orderlist) {
    this.navCtrl.push(OrderlistPage, {
      clientName: name,
      orderlist: orderlist
    });
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad ClientlistPage");
  }
  addNewSample() {
    const prompt = this.alertCtrl.create({
      title: "添加新的版单信息",
      message: "",
      inputs: [
        {
          name: "sampleId",
          placeholder: "版单号",
          value: "S-"
        },
        {
          name: "typeId",
          placeholder: "款号"
        },
        {
          name: "colorName",
          placeholder: "颜色"
        }
      ],

      buttons: [
        {
          text: "取消",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "确定",
          handler: data => {
            console.log("Saved clicked");
            if (!this.validateInput(data.sampleId)) {
              prompt.setMessage("版单号格式是S-00000");
              return false;
            } else if (data.typeId.length == 0) {
              prompt.setMessage("款号不可为空");
              return false;
            } else {
              this.showModal(data);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  showModal(data) {
    const modal = this.modalCtrl.create(ModalPage, {
      typeId: data.typeId,
      orderID: data.sampleId,
      clientName: "其它",
      colorsList: [data.colorName]
    });
    modal.present();
  }

  doRefresh(refresher) {
    console.log("Begin async operation", refresher);
    this.initializeclientItems();
    setTimeout(() => {
      console.log("Async operation has ended");
      refresher.complete();
    }, 800);
  }
  validateInput(data) {
    var reg = /^S-(\d{5}$)/;
    return reg.test(data);
  }
}
