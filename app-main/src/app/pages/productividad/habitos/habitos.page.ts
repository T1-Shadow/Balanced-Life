import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IaService } from 'src/app/services/ia';
import { MarkdownModule } from 'ngx-markdown';
import { NgModule } from '@angular/core';
import { HabitosService } from 'src/app/services/habitos';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonMenuButton, 
  IonInput, 
  IonText, 
  IonItem } from '@ionic/angular/standalone';

@NgModule({
  imports: [
    MarkdownModule.forRoot()
  ],
  exports: [MarkdownModule]
})
export class SharedMarkdownModule {}

@Component({
  selector: 'app-habitos',
  templateUrl: './habitos.page.html',
  styleUrls: ['./habitos.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonButtons, 
    IonMenuButton, 
    IonInput, 
    IonText, 
    SharedMarkdownModule, 
    IonItem],
})
export class HabitosPage {

  prompt = '';
  respuesta = '';

  constructor(private iaService: IaService, private habitosService: HabitosService) {}

  async generarPlan() {
    if (!this.prompt || this.prompt.trim() === '') {
      this.respuesta = 'Por favor, escribe un hábito antes de continuar.';
      return;
    }
    this.habitosService.guardarHabito(this.prompt);

    this.respuesta = 'Pensando...';
    this.respuesta = await this.iaService.generarRespuesta(
      `Escribe en formato HTML, con una lista numerada clara y uso de <strong> para resaltar.
      Resume en máximo 5 pasos cómo empezar a cumplir el hábito: ${this.prompt}.
      No incluyas saludos ni introducciones.`
    );
  }
}
