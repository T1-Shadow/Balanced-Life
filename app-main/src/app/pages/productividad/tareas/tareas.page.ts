import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import {   
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonCheckbox,
  IonAccordionGroup,
  IonAccordion,
  IonLabel,
  IonButtons,
  IonMenuButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonButton,
    IonList,
    IonItem,
    IonCheckbox,
    IonAccordionGroup,
    IonAccordion,
    IonLabel,
    IonButtons,
    IonMenuButton],
})

export class TareasPage implements OnInit {

  nuevaTarea = '';
  tareas: any[] = [];
  historial: any[] = [];

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    await this.migrarPendientes();
    await this.cargarTareasHoy();
    await this.cargarHistorial();
  }

  getClaveHoy() {
    const hoy = new Date().toISOString().split('T')[0];
    return `tareas_${hoy}`;
  }

  async cargarTareasHoy() {
    const clave = this.getClaveHoy();
    this.tareas = await this.storage.get(clave) || [];
  }

  async cargarHistorial() {
    this.historial = await this.storage.get("historial_tareas") || [];
  }

  async agregarTarea() {
    if (!this.nuevaTarea.trim()) return;
    const tarea = {
      id: Date.now(),
      texto: this.nuevaTarea,
      completa: false
    };
    this.tareas.push(tarea);

    const clave = this.getClaveHoy();
    await this.storage.set(clave, this.tareas);

    this.nuevaTarea = "";
  }

  async completarTarea(tarea: any) {
    this.tareas = this.tareas.filter(t => t.id !== tarea.id);
    const clave = this.getClaveHoy();
    await this.storage.set(clave, this.tareas);

    const historial = await this.storage.get("historial_tareas") || [];

    historial.push({
      texto: tarea.texto,
      fecha: new Date().toISOString().split("T")[0]
    });

    await this.storage.set("historial_tareas", historial);
    await this.cargarHistorial();
  }

  async migrarPendientes() {
    const hoyClave = this.getClaveHoy();
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    const ayerClave = `tareas_${ayer.toISOString().split('T')[0]}`;

    const tareasAyer = await this.storage.get(ayerClave);
    if (!tareasAyer) return;

    const pendientes = tareasAyer.filter((t: any) => !t.completa);
    const tareasHoy = await this.storage.get(hoyClave) || [];
    const nuevas = [...pendientes, ...tareasHoy];
    await this.storage.set(hoyClave, nuevas);
    await this.storage.remove(ayerClave);
  }
}
