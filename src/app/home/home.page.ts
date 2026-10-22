
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  navigateOutline,
  locationOutline,
  earthOutline,
  informationCircleOutline,
  locateOutline,
  mapOutline,
  chevronForwardOutline,
  gitBranchOutline,
  flagOutline,
  documentTextOutline,
  downloadOutline,
  navigateCircleOutline,
  sunnyOutline,
  moonOutline
} from 'ionicons/icons';

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
    IonCardContent,
    IonButton,
    IonIcon
  ]
})
export class HomePage {

  latitud: number | string = 'No obtenida aún';
  longitud: number | string = 'No obtenida aún';

  // Destino predefinido
  destinoLat = -0.208206;
  destinoLng = -78.490448;

  constructor(private gpsService: GpsService) {
    addIcons({
      navigateOutline,
      locationOutline,
      earthOutline,
      informationCircleOutline,
      locateOutline,
      mapOutline,
      chevronForwardOutline,
      gitBranchOutline,
      flagOutline,
      documentTextOutline,
      downloadOutline,
      navigateCircleOutline,
      sunnyOutline,
      moonOutline
    });

    this.obtenerUbicacionActual();
  }

  // cambiar tema 
  modoOscuro = localStorage.getItem('tema-gps') === 'oscuro';

  cambiarTema() {
    this.modoOscuro = !this.modoOscuro;

    localStorage.setItem(
      'tema-gps',
      this.modoOscuro ? 'oscuro' : 'claro'
    );

    console.log('Modo oscuro:', this.modoOscuro);
}

  async obtenerUbicacionActual() {
  try {
    const pos = await this.gpsService.obtenerPosicionActual();

    this.latitud = pos.lat;
    this.longitud = pos.lng;
  } catch (error) {
    console.error('Error al obtener la ubicación:', error);
  }
}

  // Abrir ubicación actual en Google Maps
  async abrirMapaUbicacion() {
  if (this.latitud === 'No obtenida aún') {
    await this.obtenerUbicacionActual();
  }

  if (
    this.latitud === 'No obtenida aún' ||
    this.longitud === 'No obtenida aún'
  ) {
    return;
  }

  const urlUbicacion =
    `https://www.google.com/maps/search/?api=1&query=${this.latitud},${this.longitud}`;

  window.open(urlUbicacion, '_blank');
}

  // Guardar ubicación en TXT
  async guardarUbicacionTxt() {
  if (this.latitud === 'No obtenida aún') {
    await this.obtenerUbicacionActual();
  }

  if (
    this.latitud === 'No obtenida aún' ||
    this.longitud === 'No obtenida aún'
  ) {
    return;
  }

  const urlUbicacion =
    `https://www.google.com/maps/search/?api=1&query=${this.latitud},${this.longitud}`;

  await this.gpsService.guardarEnArchivo(
    'ubicacion_gps.txt',
    urlUbicacion
  );
}

  // Abrir ruta desde la ubicación actual hasta el destino
  async abrirRutaCompleta() {
  if (this.latitud === 'No obtenida aún') {
    await this.obtenerUbicacionActual();
  }

  if (
    this.latitud === 'No obtenida aún' ||
    this.longitud === 'No obtenida aún'
  ) {
    return;
  }

  const urlRuta =
    `https://www.google.com/maps/dir/?api=1&origin=${this.latitud},${this.longitud}&destination=${this.destinoLat},${this.destinoLng}`;

  window.open(urlRuta, '_blank');
}

  // Guardar ruta completa en TXT
  async guardarRutaTxt() {
  if (this.latitud === 'No obtenida aún') {
    await this.obtenerUbicacionActual();
  }

  if (
    this.latitud === 'No obtenida aún' ||
    this.longitud === 'No obtenida aún'
  ) {
    return;
  }

  const urlRuta =
    `https://www.google.com/maps/dir/?api=1&origin=${this.latitud},${this.longitud}&destination=${this.destinoLat},${this.destinoLng}`;

  await this.gpsService.guardarEnArchivo(
    'ruta_gps.txt',
    urlRuta
  );
}
}
