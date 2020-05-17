import { Component, OnInit, OnDestroy } from "@angular/core";
import noUiSlider from "nouislider";

@Component({
  selector: "app-index",
  templateUrl: "index.component.html",
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  constructor() {}
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

    let audio: any = document.getElementById("background_music");
    audio.play();

    var slider = document.getElementById("sliderRegular");

    noUiSlider.create(slider, {
      start: 40,
      connect: false,
      range: {
        min: 0,
        max: 100
      }
    });

    var slider2 = document.getElementById("sliderDouble");

    noUiSlider.create(slider2, {
      start: [20, 60],
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

  audiotoggle(){
    let audio:any = document.getElementById("background_music");
    let icon = document.getElementById("music_toggle_icon");
    if (audio.paused){
      audio.play();
      icon.className = "fa fa-volume-up fa-2x";
    }
    else{
      audio.pause();
      icon.className = "fa fa-play fa-2x";
    }
  }
}
