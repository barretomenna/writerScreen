import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements AfterViewInit {

  // a reference to the canvas element from our template
  @ViewChild('canvas') public canvas: ElementRef;

  // setting a width and height for the canvas
  public width = window.innerWidth;
  public height = window.innerHeight;

  private cx: CanvasRenderingContext2D;

  constructor() { }

  ngAfterViewInit(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // set some default properties about the line
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    // we'll implement this method to start capturing mouse events
    this.touchMove(canvasEl);
    this.captureEvents(canvasEl);
  }

  touchMove(canvas: HTMLCanvasElement) {
    // pega o status de touch na tela e converte para clickOn do mouse
    canvas.addEventListener('touchstart', e => {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
    }, false);

    // pega o status de finalizar o touch e converte para clickOut do mouse
    canvas.addEventListener('touchend', e => {

      const mouseEvent = new MouseEvent('mouseup', {});
      canvas.dispatchEvent(mouseEvent);
    }, false);

    // pega o status de move do touch e converte para move do mouse
    canvas.addEventListener('touchmove', e => {
      const touches = e.touches[0];
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: touches.clientX,
        clientY: touches.clientY
      });

      console.log(mouseEvent.clientX, mouseEvent.clientY);

      canvas.dispatchEvent(mouseEvent);
    }, false);
  }

  getTouchPos(canvasDom, touchEvent) {
    const rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    };
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    Observable
      // this will capture all mousedown events from teh canvas element
      .fromEvent(canvasEl, 'mousedown')
      .switchMap((e) => {
        return Observable
          // after a mouse down, we'll record all mouse moves
          .fromEvent(canvasEl, 'mousemove')
          // we'll stop (and unsubscribe) once the user releases the mouse
          // this will trigger a mouseUp event
          .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
          // pairwise lets us get the previous value to draw a line from
          // the previous point to the current point
          .pairwise();
      })
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    // incase the context is not set
    if (!this.cx) { return; }

    // start our drawing path
    this.cx.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      // draws a line from the start pos until the current position
      this.cx.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.cx.stroke();
    }
  }
}
