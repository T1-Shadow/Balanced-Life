import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonBackButton, 
  IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    CommonModule, 
    FormsModule, 
    IonBackButton,
    IonButtons]
})

export class RegistroPage {

  usuario = '';
  email = '';
  pass = '';
  mensaje = '';

  constructor(private auth: AuthService, private router: Router) {}

  async registrar() {

    if (!this.usuario.trim() || !this.email.trim() || !this.pass.trim()) {
      this.mensaje = 'Todos los campos son obligatorios.';
      return;
    }

    const resultado = await this.auth.registrarUsuario(this.usuario, this.email, this.pass);

    this.mensaje = resultado.mensaje;

    if (resultado.ok) {
      setTimeout(() => {
        this.router.navigate(['/inicio']);
      }, 1500);
    }
  }
}
