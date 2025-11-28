import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { addIcons } from 'ionicons';
import { sunnyOutline, restaurantOutline, moonOutline } from 'ionicons/icons';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonSelect, 
  IonSelectOption, 
  IonInput, 
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon, 
  IonButtons, 
  IonMenuButton} from '@ionic/angular/standalone';

@Component({
  selector: 'app-planificador-comidas',
  templateUrl: './planificador-comidas.page.html',
  styleUrls: ['./planificador-comidas.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonSelect, 
    IonSelectOption, 
    IonInput,
    CommonModule, 
    FormsModule, 
    IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon, 
    IonButtons, 
    IonMenuButton],
})

export class PlanificadorComidasPage implements OnInit {

  dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

  plan: any = {};
  diaSeleccionado = 'lunes';

  desayuno = '';
  almuerzo = '';
  cena = '';

  constructor(private storage: Storage) {
    addIcons({
      sunnyOutline,
      restaurantOutline,
      moonOutline
    });
  }

  async ngOnInit() {
    await this.storage.create();
    this.plan = await this.storage.get("plan_comidas") || this.crearPlanVacio();
    this.cargarDelDia();
  }

  crearPlanVacio() {
    const base: any = {};
    this.dias.forEach(d => {
      base[d] = { desayuno: '', almuerzo: '', cena: '' };
    });
    return base;
  }

  cargarDelDia() {
    const d = this.plan[this.diaSeleccionado];
    this.desayuno = d.desayuno;
    this.almuerzo = d.almuerzo;
    this.cena = d.cena;
  }

  async guardar() {
    this.plan[this.diaSeleccionado] = {
      desayuno: this.desayuno,
      almuerzo: this.almuerzo,
      cena: this.cena
    };

    await this.storage.set("plan_comidas", this.plan);
  }

  
  trackDia(i: number, item: string) {
    return item;
  }

}
