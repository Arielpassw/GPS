import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonButton 
} from '@ionic/angular';
import { GpsService } from '../services/gps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton
  ]
})
export class HomePage {

  latitud: number | string = 'No obtenida aún';
  longitud: number | string = 'No obtenida aún';

  // Destino predefinido (puedes cambiarlo por el de tu casa, un parque o la universidad)
  destinoLat = -0.208206;
  destinoLng = -78.490448;

  constructor(private gpsService: GpsService) {
    this.obtenerUbicacionActual();
  }

  async obtenerUbicacionActual() {
    const pos = await this.gpsService.obtenerPosicionActual();
    this.latitud = pos.lat;
    this.longitud = pos.lng;
  }

  // 1. Ver Ubicación Actual en Google Maps
  async abrirMapaUbicacion() {
    if (this.latitud === 'No obtenida aún') {
      await this.obtenerUbicacionActual();
    }
    const urlUbicacion = `https://www.google.com/maps/search/?api=1&query=${this.latitud},${this.longitud}`;
    window.open(urlUbicacion, '_blank');
  }

  // 3. Guardar Ubicación Actual en TXT
  async guardarUbicacionTxt() {
    if (this.latitud === 'No obtenida aún') {
      await this.obtenerUbicacionActual();
    }
    const urlUbicacion = `https://www.google.com/maps/search/?api=1&query=${this.latitud},${this.longitud}`;
    await this.gpsService.guardarEnArchivo('ubicacion_gps.txt', urlUbicacion);
  }

  // 2. Ver Ruta Completa (Origen GPS Actual + Destino Predefinido)
  async abrirRutaCompleta() {
    if (this.latitud === 'No obtenida aún') {
      await this.obtenerUbicacionActual();
    }
    const urlRuta = `https://www.google.com/maps/dir/?api=1&origin=${this.latitud},${this.longitud}&destination=${this.destinoLat},${this.destinoLng}`;
    window.open(urlRuta, '_blank');
  }

  // 4. Guardar Ruta Completa en TXT
  async guardarRutaTxt() {
    if (this.latitud === 'No obtenida aún') {
      await this.obtenerUbicacionActual();
    }
    const urlRuta = `https://www.google.com/maps/dir/?api=1&origin=${this.latitud},${this.longitud}&destination=${this.destinoLat},${this.destinoLng}`;
    await this.gpsService.guardarEnArchivo('ruta_gps.txt', urlRuta);
  }
}