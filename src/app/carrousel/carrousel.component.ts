import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {
  @ViewChild("img1Container") img1Container: ElementRef;
  @ViewChild("img2Container") img2Container: ElementRef;
  @ViewChild("img3Container") img3Container: ElementRef;

  posicao = 0;

  images = [
    'https://i.ytimg.com/vi/UvNnqWLruXA/maxresdefault.jpg',
    'http://saladadecinema.com.br/wp-content/uploads/2017/10/ThorRagnarok.jpg'
  ];

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.changeImage();
    }, 3000);
  }

  changeImage(): void {
    this.posicao = this.posicao === 3 ? 0 : this.posicao;
    this.img1Container.nativeElement.style.left = `-${this.posicao * 100}%`;
    this.img2Container.nativeElement.style.left = `-${this.posicao * 100}%`;
    this.img3Container.nativeElement.style.left = `-${this.posicao * 100}%`;
    this.posicao++;
  }

}
