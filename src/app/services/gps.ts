import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  constructor(private platform: Platform) {}

  // Método para obtener la posición GPS actual del dispositivo
  async obtenerPosicionActual() {
    try {
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true
      });
      return {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      };
    } catch (error) {
      console.error('Error al obtener la geolocalización, usando valores por defecto', error);
      // Coordenadas por defecto (Quito) en caso de que el GPS esté apagado o se denieguen permisos
      return { lat: -0.2025464, lng: -78.4941719 };
    }
  }

  // Método para guardar cualquier texto/URL en un archivo .txt
  async guardarEnArchivo(nombreArchivo: string, contenido: string) {
    if (this.platform.is('hybrid')) {
      try {
        await Filesystem.writeFile({
          path: nombreArchivo,
          data: contenido,
          directory: Directory.Documents,
          encoding: Encoding.UTF8,
        });
        alert('Archivo guardado en Documentos: ' + nombreArchivo);
      } catch (e) {
        console.error('Error al guardar archivo en nativo', e);
      }
    } else {
      const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = nombreArchivo;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }
}