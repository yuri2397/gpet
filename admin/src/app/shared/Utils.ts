import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class Utils {
  static printHtml(data: any, fileName = 'gpet_file') {
    let newIframe = document.createElement('iframe');
    
    document.body.appendChild(newIframe);
    // @ts-ignore
    newIframe.contentWindow.contents = data;
    newIframe.focus();
    setTimeout(() => {
      newIframe.contentWindow?.print();
    }, 1);
  }
}
