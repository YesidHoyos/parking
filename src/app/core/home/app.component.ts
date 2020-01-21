import { Component } from '@angular/core';
import { slideInAnimation } from '../../shared/animations/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'parking';

  links = [
    ['Vehicles', '/vehicles'], 
    ['Enter Vehicle', '/enter-vehicle'],
    ['Take Out Vehicle', '/take-out-vehicle']
  ];

  activeLink = this.links[0][0];

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
