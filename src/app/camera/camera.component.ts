import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  @ViewChild('video') video: HTMLVideoElement;
  @ViewChild('canvas') canvas: HTMLCanvasElement;
  constructor() { }

  ngOnInit() {
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  }

}
