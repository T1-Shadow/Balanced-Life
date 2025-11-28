import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuController } from '@ionic/angular';
import {
  IonApp,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonMenuToggle,
  IonLabel,
  IonIcon,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  imports: [
    CommonModule,
    RouterLink,
    IonApp,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonMenuToggle,
    IonLabel,
    IonIcon,
    IonRouterOutlet,
  ],
})
export class AppComponent {
  constructor(private menuCtrl: MenuController, private auth: AuthService, private router: Router) {}

  closeMenu() {
    this.menuCtrl.close();
  }

  async cerrarSesion() {
    await this.auth.cerrarSesion();
    this.router.navigate(['/inicio']);
  }
}
