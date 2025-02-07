import { Component } from '@angular/core';
import { Studentroutes } from '../../pages/app.student.routes';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public menuItems = Studentroutes
    .flat()
    .filter((route) => route && route.path)
    .filter((route) => !route.path?.includes(':'))
    .filter((route) => !route.path?.includes('noPageFound') && !route.path?.includes('studentRegister'));

    public currentTitle: any;

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
      this.getTitle();

      // Escuchar los cambios en las rutas para actualizar el título dinámicamente
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.getTitle();
      });
    }

    // Función para obtener el título de la ruta activa
    private getTitle(): void {
      const activeRoute = this.getChildRoute(this.activatedRoute);
      this.currentTitle = activeRoute?.routeConfig?.title || 'Sin título';
      console.log('Título de la ruta actual: ', this.currentTitle);
    }

    // Función recursiva para obtener la ruta hija activa si es necesario
    private getChildRoute(route: ActivatedRoute): ActivatedRoute | null {
      if (route.firstChild) {
        return this.getChildRoute(route.firstChild);
      }
      return route;
    }
}
