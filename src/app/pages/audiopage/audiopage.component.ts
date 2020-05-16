import { trigger, state, style, transition, animate, group, query, keyframes, stagger } from '@angular/animations';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-audiopage',
  templateUrl: './audiopage.component.html',
  styleUrls: [
    './audiopage.component.scss',
  ],
  animations:[
    trigger('slipin', [
      transition('* <=> *', [
        group([
          query('audio, #headphone', stagger('100ms', [
            animate(800, keyframes([
              style({ opacity: 0, offset: 0.5, transform: 'translateY(-20px)' }),
              style({ offset: 0.95 }),
            ]))
          ])),
          query('span', stagger('100ms', [
            animate(800, keyframes([
              style({ opacity: 0, offset: 0.5, transform: 'translateY(-100px)' }),
              style({ offset: 0.95 }),
            ]))
          ]))
        ])
      ])
    ]),
  ]
})
export class AudioPageComponent implements OnInit, OnDestroy {

  isCollapsed = true;
  focus;
  focus1;
  focus2;
  correct_audio;
  wrong_audio;

  index: number;
  correct_index: number;
  audio_url: string;
  name1: string;
  name2: string;
  name3: string;
  currentState: boolean;
  headphoneFlag: boolean;
  name_index= [-1, -1, -1];

  audioMessages = [
    [
      'Parth Patil',
      'assets/audio/parth.mpeg',
      'true'
    ],
    [
      'Madhura Pawar',
      'assets/audio/madhura.ogg',
      'false'
    ],
    [
      'Amruta Takle',
      'assets/audio/amruta.mpeg',
      'true'
    ],
    [
      'Adhirath Salvi',
      'assets/audio/adhirath.mp4',
      'true'
    ],
    // [
    //   'Nahush Kumbhar',
    //   'assets/audio/background_sound.mp3',
    //   'false'
    // ],
    [
      'Pranita Achrekar',
      'assets/audio/pranita.ogg',
      'false'
    ],
    [
      'Pranita Achrekar',
      'assets/audio/pranita2.ogg',
      'false'
    ],
    [
      'Siddharth Bhanusali',
      'assets/audio/siddharth.ogg',
      'false'
    ],
    [
      'Rushikesh Dalvi',
      'assets/audio/rushikesh.ogg',
      'false'
    ],
  ]

  constructor() {
    this.index = 0;
    for (var i = this.audioMessages.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.audioMessages[i];
      this.audioMessages[i] = this.audioMessages[j];
      this.audioMessages[j] = temp;
    }
    this.selectRandomMessage();
    this.currentState = true;
    this.correct_audio = new Audio("assets/audio/correct.mp3");
    this.wrong_audio = new Audio("assets/audio/wrong.mp3");
   }
  @HostListener("document:mousemove", ["$event"])
  onMouseMove(e) {
    var squares1 = document.getElementById("square1");
    var squares2 = document.getElementById("square2");
    var squares3 = document.getElementById("square3");
    var squares4 = document.getElementById("square4");
    var squares5 = document.getElementById("square5");
    var squares6 = document.getElementById("square6");
    var squares7 = document.getElementById("square7");
    var squares8 = document.getElementById("square8");

    var posX = e.clientX - window.innerWidth / 2;
    var posY = e.clientY - window.innerWidth / 6;

    squares1.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares2.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares3.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares4.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares5.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares6.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares7.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
    squares8.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");

    this.onMouseMove(event);
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }

  checkAnswer(direction=true, index=-1){
    let answer_boxes = [
      document.getElementById("answer1"),
      document.getElementById("answer2"),
      document.getElementById("answer3")
    ]

    let correct_played = false;
    for (let i = 0; i < 3; i++) {
      if (this.name_index[i] == this.index){
        answer_boxes[i].classList.add("correct");
        if(i == index - 1){
          correct_played = true;
          this.correct_audio.play();
        }
      }
      else{
        answer_boxes[i].classList.add("wrong");
      }
    }
    if (!correct_played){
      this.wrong_audio.play();
    }

    setTimeout((pointer=this) => {
      pointer.selectRandomMessage(direction, pointer);
    }, 1400);
    setTimeout((pointer=this) => {
      pointer.currentState = !pointer.currentState;
      for (let i = 0; i < 3; i++) {
          answer_boxes[i].classList.remove("correct");
          answer_boxes[i].classList.remove("wrong");
      }
    }, 1000);
  }

  selectRandomMessage(direction=true, pointer=this){
    // console.log(this);
    pointer.index = direction ? pointer.index + 1 : pointer.index - 1;
    if (pointer.index >= pointer.audioMessages.length) pointer.index = 0;
    if (pointer.index < 0) pointer.index = pointer.audioMessages.length - 1;

    let taken = [pointer.index];
    let taken_names = [pointer.audioMessages[pointer.index][0]]
    let random = [-1, -1, -1];
    let loop_index = 0;
    random[Math.floor(Math.random() * 3)] = pointer.index;
    let loop_stop = 0;

    while(loop_index < 3 && loop_stop < 100){
      loop_stop++;
      let rand_index = Math.floor(Math.random() * pointer.audioMessages.length);
      // console.log(loop_index, rand_index, taken, random);
      if (random[loop_index] >= 0) {
        loop_index++;
        continue;
      }

      let skip = false;
      for (let j = 0; j < taken.length; j++) {
        // console.log("in loop", (taken[j] == rand_index));
        if (taken[j] == rand_index || taken_names[j] == pointer.audioMessages[rand_index][0]){
          skip = true;
          break;
        }
      }
      if (skip) continue;

      taken.push(rand_index);
      taken_names.push(pointer.audioMessages[rand_index][0]);
      random[loop_index] = rand_index;
      loop_index++;
    }
    pointer.name_index = random;
    pointer.name1 = pointer.audioMessages[pointer.name_index[0]][0];
    pointer.name2 = pointer.audioMessages[pointer.name_index[1]][0];
    pointer.name3 = pointer.audioMessages[pointer.name_index[2]][0];
    pointer.audio_url = pointer.audioMessages[pointer.index][1];
    pointer.headphoneFlag = pointer.audioMessages[pointer.index][2] == 'true';
  }
}
