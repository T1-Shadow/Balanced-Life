import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { LocalNotifications } from '@capacitor/local-notifications';
import {  
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonAccordionGroup,
  IonAccordion,
  IonBadge,
  IonButtons,
  IonMenuButton } from '@ionic/angular/standalone';


interface ZonaLimpieza {
  id: number;
  nombre: string;
  frecuenciaDias: number;
  proximaFecha: string;
  ultimaFecha?: string;
  completadaHoy?: boolean;
}

@Component({
  selector: 'app-limpieza',
  templateUrl: './limpieza.page.html',
  styleUrls: ['./limpieza.page.scss'],
  standalone: true,
  imports: [ 
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonList,
    IonItem,
    IonLabel,
    IonAccordionGroup,
    IonAccordion,
    IonBadge,
    IonButtons,
    IonMenuButton],
})
export class LimpiezaPage implements OnInit {

  zonas: ZonaLimpieza[] = [];
  historial: { zona: string; fecha: string }[] = [];

  nuevaZonaNombre = '';
  nuevaZonaFrecuencia: number | null = null;

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    await this.cargarDatos();
    await this.pedirPermisosNotificaciones();
  }

  async pedirPermisosNotificaciones() {
    const perm = await LocalNotifications.checkPermissions();
    if (perm.display !== 'granted') {
      await LocalNotifications.requestPermissions();
    }
  }

  async cargarDatos() {
  this.zonas = await this.storage.get('limpieza_zonas') || [];

  const hoy = new Date().toISOString().split("T")[0];

  this.zonas.forEach(z => {
    if (z.ultimaFecha !== hoy) {
      z.completadaHoy = false;
    }
  });

  await this.storage.set('limpieza_zonas', this.zonas);

  this.historial = await this.storage.get('limpieza_historial') || [];

  this.ordenarZonas();
}

  formatoFecha(fechaISO: string) {
    return fechaISO;
  }

  async agregarZona() {
    if (!this.nuevaZonaNombre.trim() || !this.nuevaZonaFrecuencia || this.nuevaZonaFrecuencia <= 0) {
      return;
    }

    const hoy = new Date();
    const proxima = new Date();
    proxima.setDate(hoy.getDate() + this.nuevaZonaFrecuencia);

    const zona: ZonaLimpieza = {
      id: Date.now(),
      nombre: this.nuevaZonaNombre.trim(),
      frecuenciaDias: this.nuevaZonaFrecuencia,
      proximaFecha: proxima.toISOString().split('T')[0],
      ultimaFecha: hoy.toISOString().split('T')[0],
      completadaHoy: false
    };

    this.zonas.push(zona);
    await this.storage.set('limpieza_zonas', this.zonas);
    await this.programarNotificacion(zona);

    this.nuevaZonaNombre = '';
    this.nuevaZonaFrecuencia = null;
  }

  async marcarLimpiezaHoy(zona: ZonaLimpieza) {
    const hoy = new Date();
    const hoyStr = hoy.toISOString().split('T')[0];

    const historial = await this.storage.get("limpieza_historial") || [];
    historial.push({ zona: zona.nombre, fecha: hoyStr });
    await this.storage.set("limpieza_historial", historial);
    this.historial = historial;

    const proxima = new Date();
    proxima.setDate(hoy.getDate() + zona.frecuenciaDias);

    zona.ultimaFecha = hoyStr;
    zona.proximaFecha = proxima.toISOString().split('T')[0];
    zona.completadaHoy = true;

    await this.storage.set("limpieza_zonas", this.zonas);
    await this.programarNotificacion(zona);

    this.ordenarZonas();
  }
  async programarNotificacion(zona: ZonaLimpieza) {
    const fecha = new Date(zona.proximaFecha + 'T00:09:00');

    await LocalNotifications.schedule({
      notifications: [
        {
          id: zona.id,
          title: 'Limpieza pendiente',
          body: `Hoy toca limpiar: ${zona.nombre}`,
          schedule: {
            at: fecha,
          },
          sound: undefined,
        }
      ]
    });
  }

  ordenarZonas() {
  this.zonas.sort((a, b) => {
    if (a.completadaHoy === b.completadaHoy) return 0;
    return a.completadaHoy ? 1 : -1;
    });
  }
}
