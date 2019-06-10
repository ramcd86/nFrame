import { Component, Input } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webApp';

  @Input()
  public incoming: string;

  constructor() {
    console.log(this.incoming);
    this.init();
  }

  public init() {
    $('#jqueryTag').append('jquery tag');
  }
}

