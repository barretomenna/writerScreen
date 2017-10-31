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

  posicao = 0;
  tempoTransicao = 5000;
  tempoImage1 = 0;
  tempoImage2 = 0;
  tempoImage3 = 0;
  barra1: any;
  barra2: any;
  barra3: any;


  images = [
    'https://i.ytimg.com/vi/UvNnqWLruXA/maxresdefault.jpg',
    'http://saladadecinema.com.br/wp-content/uploads/2017/10/ThorRagnarok.jpg',
    'https://i0.wp.com/ovicio.com.br/wp-content/uploads/league-unite1.jpg?resize=820%2C431'
  ];

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.changeImage();
    }, this.tempoTransicao);
  }

  changeImage(): void {
    this.posicao = this.posicao === 3 ? 0 : this.posicao;
    this.chargeBar(this.posicao);
    this.img1Container.nativeElement.style.left = `-${this.posicao * 100}%`;
    this.img2Container.nativeElement.style.left = `-${this.posicao * 100}%`;
    this.img3Container.nativeElement.style.left = `-${this.posicao * 100}%`;
    this.posicao++;
  }

  chargeBar(posicao: number): void {
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
    this.barra1 = setInterval(() => { this.tempoImage1++; }, (this.tempoTransicao / 100));
  }

  chargeBar2(): void {
    this.tempoImage1 = this.tempoImage3 = 0;
    clearInterval(this.barra1);
    clearInterval(this.barra3);
    this.barra2 = setInterval(() => { this.tempoImage2++; }, (this.tempoTransicao / 100));
  }

  chargeBar3(): void {
    this.tempoImage1 = this.tempoImage2 = 0;
    clearInterval(this.barra1);
    clearInterval(this.barra2);
    this.barra3 = setInterval(() => { this.tempoImage3++; }, (this.tempoTransicao / 100));
  }

}
