import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  map!: L.Map;

  constructor() { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    this.map = L.map('mapId').setView([0, 0], 13); // Inicializa el mapa con coordenadas iniciales (0, 0)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      this.map.setView([lat, lng], 13); 
      L.marker([lat, lng]).addTo(this.map)
        .bindPopup('Aqui estas tu')
        .openPopup();
    }, (error) => {
      console.error('Error getting location', error);
    });
  }
}

