import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AlmacenamientoService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async guardar(key: string, valor: any) {
    await this._storage?.set(key, valor);
  }

  async obtener(key: string) {
    return await this._storage?.get(key);
  }

  async eliminar(key: string) {
    await this._storage?.remove(key);
  }
}
