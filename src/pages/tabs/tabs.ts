import { UserPage } from "./../user/user";
import { Component } from "@angular/core";
// import { ContactPage } from '../contact/contact';
import { ClientlistPage } from "../clientlist/clientlist";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab2Root = UserPage;
  tab3Root = ClientlistPage;
  constructor() {}
}
