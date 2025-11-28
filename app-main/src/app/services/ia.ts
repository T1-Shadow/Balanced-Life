import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IaService {
  private apiKey = '';

  constructor() {}

  async generarRespuesta(prompt: string): Promise<string> {
  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('Error IA:', res.status, errorData);
      return '⚠️ La IA no está disponible en este momento. Intenta nuevamente más tarde.';
    }

    const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta.';
    } catch (error) {
      console.error('Error de conexión:', error);
      return '❌ Error de conexión con la IA.';
    }
  }

}
