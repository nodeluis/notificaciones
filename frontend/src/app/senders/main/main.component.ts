import { Component, OnInit } from '@angular/core';
import {User} from "../../_core/models/user.model";
import { io } from "socket.io-client";
import {environment as env} from "../../../environments/environment";
import QrCreator from "qr-creator";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
  ]
})
export class MainComponent{

  users: User[] = [

  ];

  senderModalIsOpen: boolean = false;
  socket: any = null;
  qrString: string = "";

  onNewSender(){
    const self = this;
    self.senderModalIsOpen = true;
    self.qrString = "";
    if(self.socket!=null){
      self.socket = null;
    }
    self.socket = io(env.baseUrl);
    self.socket.on("connect", function(){
      console.log("connected");
      self.socket.emit('wa_login', {  });
    });
    self.socket.on('wa_qr', function(resp: any) {
      //console.log("wa", resp);
      const {qr=""} =resp;
      self.qrString = qr;
      const canvas = document.getElementById("canvas")!;
      if(canvas){
        QrCreator.render({
          text: qr,
          radius: 0.2, // 0.0 to 0.5
          ecLevel: 'M', // L, M, Q, H
          fill: '#212139', // foreground color
          background: null, // color or null for transparent
          size: 300
        }, canvas);
      }

    });

    self.socket.on('wa_login_successful', function() {
      self.closeModal();
    });

    self.socket.on('disconnect', function() {
      console.log('Disconnected');
    });
  }

  closeModal(){
    this.senderModalIsOpen = false;
    if(this.socket != null){
      this.socket.disconnect();
      this.socket = null;
    }
  }

}
