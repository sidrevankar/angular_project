import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, query, group, state, sequence, keyframes } from '@angular/animations';
import { DataProviderService } from '../data-provider.service';
import { MessageCard } from './messagecard';

@Component({
  selector: 'messagecard',
  templateUrl: './messagecard.component.html',
  styleUrls: ['./messagecard.component.scss'],
  animations:[
    trigger('growin', [
      state('void', style({ opacity: 0, width: "10%", height: "10%", marginLeft: "50%" })),
      transition('void => *', [
        animate(800),
      ]),
      transition('* <=> *', [
        group([
          query('button', style({ opacity: 0 })),
          animate(2000, keyframes([
            style({ opacity: 0, offset: 0.4, width: "10%", height: "10%", marginLeft: "50%" }),
            style({ offset: 0.9 }),
          ]))
        ])
      ])
    ]),
  ]
})
export class MessagecardComponent implements OnInit {


  msgcard: MessageCard;
  currentState: boolean;
  index: number;
  messages: MessageCard[] = [];

  constructor(dataserver: DataProviderService) {
   dataserver.getTextMessages()
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          // if (data[i].name == "Parth Patil") continue;
          let msgcard = <MessageCard>{};
          msgcard.name = data[i].name;
          msgcard.message = data[i].message;
          msgcard.image_url = data[i].image_url;
          this.messages.push(msgcard);
        }
        this.initialize();
      })
  }

  ngOnInit(): void {
  }

  initialize(){
    this.index = 0;
    for (var i = this.messages.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.messages[i];
      this.messages[i] = this.messages[j];
      this.messages[j] = temp;
    }
    this.msgcard = this.messages[this.index];
    this.currentState = true;
  }

  changemessage(direction=true) {
    this.currentState = !this.currentState;
    this.index = direction ? this.index+1 : this.index-1;
    if (this.index >= this.messages.length ) this.index = 0;
    if (this.index < 0) this.index = this.messages.length - 1;
    setTimeout(() => {
      this.msgcard = this.messages[this.index];
    }, 800);
  }


}
