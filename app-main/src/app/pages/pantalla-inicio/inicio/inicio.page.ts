import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    CommonModule, 
    FormsModule]
})

export class InicioPage {

  usuario = '';
  pass = '';
  mensaje = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private menuCtrl: MenuController) {}

  async ionViewWillEnter() {
    this.menuCtrl.enable(false, 'main');
    this.menuCtrl.swipeGesture(false, 'main');

    const sesion = await this.auth.obtenerSesion();
    if (sesion) {
      this.router.navigate(['/habitos']);
    }
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true, 'main');
    this.menuCtrl.swipeGesture(true, 'main');
  }

  async ingresar() {
    if (!this.usuario.trim() || !this.pass.trim()) {
      this.mensaje = 'Completa todos los campos.';
      return;
    }

    const resultado = await this.auth.login(this.usuario, this.pass);

    if (!resultado.ok) {
      this.mensaje = resultado.mensaje ?? 'Error Desconocido';
      return;
    }
    this.mensaje = '';
    this.router.navigate(['/habitos']);
  }
}
