import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private storageKey = 'usuarios';
  private sesionKey = 'sesionActiva';

  constructor(private storage: Storage) {
    this.storage.create();
  }

  private hashPassword(pass: string): string {
    return btoa(pass);
  }

  async registrarUsuario(usuario: string, email: string, pass: string) {
    const usuarios = (await this.storage.get(this.storageKey)) || [];

    const existe = usuarios.find((u: any) => u.usuario === usuario || u.email === email);
    if (existe) {
      return { ok: false, mensaje: 'El usuario o email ya está registrado.' };
    }
    
    const nuevoUsuario = {
      usuario,
      email,
      pass: this.hashPassword(pass)
    };

    usuarios.push(nuevoUsuario);
    await this.storage.set(this.storageKey, usuarios);

    return { ok: true, mensaje: 'Usuario registrado con éxito.' };
  }

  async login(usuario: string, pass: string) {
    const usuarios = (await this.storage.get(this.storageKey)) || [];
    const passHasheada = this.hashPassword(pass);

    const existe = usuarios.find(
      (u: any) => u.usuario === usuario && u.pass === passHasheada
    );

    if (!existe) return { ok: false, mensaje: 'Usuario o contraseña incorrectos.' };

    await this.storage.set(this.sesionKey, usuario);

    return { ok: true };
  }

  async obtenerSesion() {
    return await this.storage.get(this.sesionKey);
  }

  async cerrarSesion() {
    return await this.storage.remove(this.sesionKey);
  }
}
