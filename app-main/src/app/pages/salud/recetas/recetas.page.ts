import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { IaService } from 'src/app/services/ia';
import { MarkdownModule } from 'ngx-markdown';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonInput, 
  IonChip, 
  IonIcon, 
  IonCard, 
  IonCardContent, 
  IonButtons, 
  IonMenuButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    MarkdownModule, 
    IonInput,
    IonChip,
    IonIcon,
    IonCard,
    IonCardContent, 
    IonButtons, 
    IonMenuButton],
})

export class RecetasPage implements OnInit {

  nuevoIngrediente = '';
  ingredientes: string[] = [];
  recetaGenerada = '';

  constructor(private storage: Storage, private ia: IaService) {}

  async ngOnInit() {
    await this.storage.create();
    this.ingredientes = await this.storage.get("ingredientes") || [];
  }

  async agregarIngrediente() {
    if (!this.nuevoIngrediente.trim()) return;

    this.ingredientes.push(this.nuevoIngrediente.trim());
    await this.storage.set("ingredientes", this.ingredientes);

    this.nuevoIngrediente = "";
  }

  async eliminarIngrediente(index: number) {
    this.ingredientes.splice(index, 1);
    await this.storage.set("ingredientes", this.ingredientes);
  }

  async generarRecetaIA() {
    if (this.ingredientes.length === 0) {
      this.recetaGenerada = "Agrega al menos un ingrediente.";
      return;
    }

    const prompt = `
      Tengo estos ingredientes disponibles: ${this.ingredientes.join(", ")}.
      Dime una receta realista que pueda cocinar.
      Incluye:
      - Un título atractivo
      - Ingredientes necesarios
      - Tiempo estimado de preparación
      - Pasos claros y numerados
      Formato bonito en Markdown.`;

    this.recetaGenerada = "Pensando...";

    const respuesta = await this.ia.generarRespuesta(prompt);

    this.recetaGenerada = respuesta || "No pude generar una receta.";
  }

}
