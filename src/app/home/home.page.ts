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

  constructor(private gpsService: GpsService) {
    this.obtenerUbicacionActual();
  }

  // Obtiene la ubicación y actualiza las variables en pantalla
  async obtenerUbicacionActual() {
    const pos = await this.gpsService.obtenerPosicionActual();
    this.latitud = pos.lat;
    this.longitud = pos.lng;
  }

  // 1. Abre Google Maps en el teléfono centrado en la ubicación actual
  async abrirMapaUbicacion() {
    if (this.latitud === 'No obtenida aún') {
      await this.obtenerUbicacionActual();
    }
    const url = `https://www.google.com/maps/@${this.latitud},${this.longitud},17z`;
    window.open(url, '_blank');
  }

  // 2. Abre Google Maps usando la posición actual como origen, permitiendo elegir destino
  async abrirRutaParaEscogerDestino() {
    if (this.latitud === 'No obtenida aún') {
      await this.obtenerUbicacionActual();
    }
    // Si dejamos el destination vacío o usamos la sintaxis de dirección desde origen actual:
    const urlRuta = `https://www.google.com/maps/dir/?api=1&origin=${this.latitud},${this.longitud}`;
    window.open(urlRuta, '_blank');
  }

  // 3. Guarda la ubicación actual en TXT
  async guardarUbicacionTxt() {
    const contenidoTxt = `=== MI UBICACIÓN GPS ACTUAL ===\nLatitud: ${this.latitud}\nLongitud: ${this.longitud}\nGoogle Maps: https://www.google.com/maps/@${this.latitud},${this.longitud}`;
    await this.gpsService.guardarEnArchivo('ubicacion_gps.txt', contenidoTxt);
  }

  // 4. Guarda la ruta en TXT
  async guardarRutaTxt() {
    const contenidoTxt = `=== RUTA DESDE MI POSICIÓN ===\nOrigen: ${this.latitud}, ${this.longitud}\nEnlace de origen para ruta: https://www.google.com/maps/dir/?api=1&origin=${this.latitud},${this.longitud}`;
    await this.gpsService.guardarEnArchivo('ruta_gps.txt', contenidoTxt);
  }
}