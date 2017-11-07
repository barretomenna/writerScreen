import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  imageData: string;
  verificador;
  posicaoInicial: number;

  @ViewChild('meu') meu: HTMLElement;

  ngAfterViewInit(): void {
  }

  renderImage(ev): void {
    this.imageData = ev;
  }

  closeScreen() {
    console.log('fechou');
  }

  testando2(ev: PointerEvent) {
    this.posicaoInicial = ev.clientX;
  }

  testando(ev: PointerEvent) {
    if (this.posicaoInicial > ev.clientX) {
      alert('esquerda');
      return null;
    }

    if (this.posicaoInicial < ev.clientX) {
      alert('direita');
      return null;
    }
  }

}
