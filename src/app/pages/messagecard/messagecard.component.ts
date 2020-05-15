import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, query, group, state, sequence, keyframes } from '@angular/animations';

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
        // animate("1s, 1s"),
        // sequence([
        // ])
      ])
    ]),
  ]
})
export class MessagecardComponent implements OnInit {

  name: string;
  message: string;
  image_url: string;
  currentState: boolean;
  index: number;
  messages = [
    [
      'Parth Patil',
      'Hey this is cool message for you',
      'assets/img/parth.jpg'
    ],
    [
      'Nahush kumbhar',
      'Hey this is not so cool message for you',
      'assets/img/nahush.jpg'
    ],
    [
      'Madhura Pawar',
      'Hello frendzzz chia pilo',
      'assets/img/madhura.jpg'
    ],
    // [
    //   'Ruchira Yerapale',
    //   'Me ek madarchod mulgi ahe',
    //   'assets/img/ruchira.jpg'
    // ],
    [
      'Amruta Takle',
      'Yo bhai me gareeb ahe',
      'assets/img/amruta.jpg'
    ],
    [
      'Adhirath Salvi',
      'Hello guys, sab theek hai',
      'assets/img/adhirat.jpg'
    ],
  ]

  constructor() {
    this.index = 0;
    for (var i = this.messages.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.messages[i];
      this.messages[i] = this.messages[j];
      this.messages[j] = temp;
    }
    this.name = this.messages[this.index][0];
    this.message = this.messages[this.index][1];
    this.image_url = this.messages[this.index][2];
    this.currentState = true;
  }

  ngOnInit(): void {
  }

  changemessage(direction=true) {
    this.currentState = !this.currentState;
    this.index = direction ? this.index+1 : this.index-1;
    if (this.index >= this.messages.length ) this.index = 0;
    if (this.index < 0) this.index = this.messages.length - 1;
    setTimeout(() => {
      this.name = this.messages[this.index][0];
      this.message = this.messages[this.index][1];
      this.image_url = this.messages[this.index][2];
    }, 800);
  }


}
