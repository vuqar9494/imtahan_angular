import { Component } from '@angular/core';
import { LoaderService } from '../shared/loader.service';

import { trigger, state, style, transition, animate, group } from '@angular/animations';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('openClose', [
      state('false', style({ 'height': '0px', 'display': 'none' })),
      state('true', style({ 'height': '*' })),

      transition('false => true', [
        style({ 'display': 'block' }),
        animate('300ms ease-in')
      ]),

      transition('true => false', [
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class HeaderComponent {
  
  showProgress: boolean = true;
  constructor(public loaderService: LoaderService,
    ) {
     
      this.loaderService.isLoading.subscribe((v) => {
        this.showProgress = v;
      });
    }

     myFunction() {
      var x = document.getElementById("myTopnav");
      if (!(x.className.includes(" responsive"))) {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }
}
