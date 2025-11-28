import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HabitosService {
  private key = 'habitos';

  getHabitos(): any[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  guardarHabito(nombre: string) {
    const habitos = this.getHabitos();
    const nuevoHabito = {
      id: Date.now(),
      nombre,
      progreso: []
    };
    habitos.push(nuevoHabito);
    localStorage.setItem(this.key, JSON.stringify(habitos));
  }

  actualizarHabitos(habitos: any[]) {
    localStorage.setItem(this.key, JSON.stringify(habitos));
  }
}
