import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  imageData: string;
  verificador;

  ngOnInit(): void {

  }

  renderImage(ev): void {
    console.log(ev, 'teste');
  }
}
