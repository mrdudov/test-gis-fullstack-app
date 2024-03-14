import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../services/map.service';
import { LayersService } from '../services/layers.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  constructor(
    private mapService: MapService,
    private layerService: LayersService,
    ) { }

  private initMap(): void {
    this.mapService.map = L.map('map', {
      center: [ 55.75, 37.61 ],
      zoom: 12
    });
  }

  private initBaseLayer(): void {
    this.mapService.map.addLayer(this.layerService.tiles);
  }

  private initDataLayer(): void {
    this.layerService.fetchLayer().subscribe(data => {
      const layer = L.geoJSON(data, {style: {color: "red", fillOpacity: 0.5, weight: 3}});
      this.mapService.map.addLayer(layer);
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.initBaseLayer();
    this.initDataLayer();
  }
}
