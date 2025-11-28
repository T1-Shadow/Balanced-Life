import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonRange,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonToggle, 
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-hidratacion',
  templateUrl: './hidratacion.page.html',
  styleUrls: ['./hidratacion.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonRange,
    IonLabel,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonToggle, 
    IonIcon
  ]
})
export class HidratacionPage implements OnInit {

  meta = 8;
  hidratado = 0;
  intervalo = 60;
  modoNoche = false;

  gotasArray: number[] = [];
  ultimaFecha = '';

  constructor(
    private storage: Storage,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await this.storage.create();

    const datos = await this.storage.get('hidratacion') || {};

    this.meta = datos.meta || 8;
    this.hidratado = datos.hidratado || 0;
    this.intervalo = datos.intervalo || 60;
    this.modoNoche = datos.modoNoche || false;
    this.ultimaFecha = datos.ultimaFecha || '';

    this.actualizarGotas();
    this.verificarNuevoDia();
  }

  actualizarGotas() {
    this.gotasArray = Array(this.meta).fill(0);
  }

  actualizarMeta() {
    this.gotasArray = Array(this.meta).fill(0);
    this.guardar();
  }

  guardar() {
    this.storage.set('hidratacion', {
      meta: this.meta,
      hidratado: this.hidratado,
      intervalo: this.intervalo,
      modoNoche: this.modoNoche,
      ultimaFecha: this.obtenerFecha()
    });
  }

  obtenerFecha() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  }

  verificarNuevoDia() {
    const hoy = this.obtenerFecha();
    if (hoy !== this.ultimaFecha) {
      this.hidratado = 0;
      this.ultimaFecha = hoy;
      this.guardar();
    }
  }

  async toggleGota(i: number) {
    if (i < this.hidratado) {
      this.hidratado--;
    } else {
      this.hidratado++;
    }

    if (this.hidratado > this.meta) {
      this.hidratado = this.meta;
    }

    if (this.hidratado === this.meta) {
      await this.marcarDiaCompletado();
    }

    this.guardar();
  }

  async marcarDiaCompletado() {
    const alert = await this.alertCtrl.create({
      header: '¡Excelente!',
      message: 'Has cumplido tu meta diaria de hidratación 💧🎉',
      buttons: ['OK']
    });
    await alert.present();

    const prev = await this.storage.get('dias_cumplidos') || 0;
    await this.storage.set('dias_cumplidos', prev + 1);
  }

  programarRecordatorios() {
    this.guardar();
  }
}
