import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabitosService } from 'src/app/services/habitos';
import { Storage } from '@ionic/storage-angular';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonMenuButton, 
  IonItem, 
  IonLabel,  
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-logros',
  templateUrl: './logros.page.html',
  styleUrls: ['./logros.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    IonButtons, 
    IonMenuButton, 
    IonItem, 
    IonLabel],
})
export class LogrosPage implements OnInit {

  habitos: any[] = [];

  diasHidratacion = 0;
  metaAnual = 365;

  constructor(
    private habitosService: HabitosService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    this.habitos = this.habitosService.getHabitos();
    this.diasHidratacion = await this.storage['get']('dias_cumplidos') || 0;
    await this.storage.create();
    
  }

  marcarCumplido(habitoId: number) {
    const hoy = new Date().toLocaleDateString();
    const habito = this.habitos.find(h => h.id === habitoId);

    if (!habito.progreso.includes(hoy)) {
      habito.progreso.push(hoy);
      this.habitosService.actualizarHabitos(this.habitos);
    }
  }

  calcularProgreso(habito: any) {
    const diasCumplidos = habito.progreso.length;
    return (diasCumplidos / 7) * 100;
  }

  progresoHidratacion() {
    return (this.diasHidratacion / this.metaAnual) * 100;
  }
}
