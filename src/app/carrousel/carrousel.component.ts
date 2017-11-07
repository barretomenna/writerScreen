import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {
  @ViewChild('img1Container') img1Container: ElementRef;
  @ViewChild('img2Container') img2Container: ElementRef;
  @ViewChild('img3Container') img3Container: ElementRef;

  posicao: number;
  tempoTransicao = 5000;
  tempoImage1 = 0;
  tempoImage2 = 0;
  tempoImage3 = 0;
  initialPosition: number;
  carrossel: any;
  barra1: any;
  barra2: any;
  barra3: any;


  images = [
    'https://bloginterocitro.files.wordpress.com/2014/01/liga-da-justic3a7a.jpg',
    'https://www.fatosdesconhecidos.com.br/wp-content/uploads/2017/09/https-2F2Fs3-ap-southeast-2.amazonaws.com2Fvms-tv-images-prod2F20172F022F586212FPOKE_Pokemon_1920.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/91f4I48GiSL._SY445_.jpg'
  ];

  constructor() { }

  ngOnInit() {
    this.startCarrossel();
  }

  startCarrossel() {
    console.log('iniciou');
    this.carrossel = setInterval(() => {
      this.slideRigth();
    }, this.tempoTransicao);
  }

  setInitialPosition(ev: TouchEvent) {
    this.initialPosition = ev.changedTouches[0].clientX;
  }

  slide(ev: TouchEvent) {
    clearInterval(this.carrossel);
    const finalPosition = ev.changedTouches[0].clientX;
    if (this.initialPosition > finalPosition) {
      this.slideRigth();
      this.startCarrossel();
      return null;
    }
    this.slideLeft();
    this.startCarrossel();
  }

  slideLeft() {
    this.posicao--;
    this.posicao = this.posicao < 0 ? 2 : this.posicao;
    console.log(this.posicao);
    this.changeImage();
  }

  slideRigth() {
    if (this.posicao === undefined) {
      this.posicao = 0;
    } else {
      this.posicao++;
    }

    this.posicao = this.posicao > 2 ? 0 : this.posicao;
    console.log(this.posicao);
    this.changeImage();
  }

  changeImage(): void {
    this.chargeBar(this.posicao);
    this.img1Container.nativeElement.style.left = `-${this.posicao * 100}%`;
    this.img2Container.nativeElement.style.left = `-${this.posicao * 100}%`;
    this.img3Container.nativeElement.style.left = `-${this.posicao * 100}%`;
  }

  chargeBar(posicao: number): void {
    console.log(posicao);
    if (posicao === 0) {
      this.chargeBar1();
      return null;
    }

    if (posicao === 1) {
      this.chargeBar2();
      return null;
    }

    this.chargeBar3();
  }


  chargeBar1(): void {
    this.tempoImage2 = this.tempoImage3 = 0;
    clearInterval(this.barra2);
    clearInterval(this.barra3);
    console.log('barra1');
    this.barra1 = setInterval(() => { this.tempoImage1++; }, (this.tempoTransicao / 100));
  }

  chargeBar2(): void {
    this.tempoImage1 = this.tempoImage3 = 0;
    clearInterval(this.barra1);
    clearInterval(this.barra3);
    console.log('barra2');
    this.barra2 = setInterval(() => { this.tempoImage2++; }, (this.tempoTransicao / 100));
  }

  chargeBar3(): void {
    this.tempoImage1 = this.tempoImage2 = 0;
    clearInterval(this.barra1);
    clearInterval(this.barra2);
    console.log('barra3');
    this.barra3 = setInterval(() => { this.tempoImage3++; }, (this.tempoTransicao / 100));
  }

}
