import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../services/map.service';
import { LayersService } from '../services/layers.service';
import { Observable } from 'rxjs';
import { GeoJSON } from 'geojson';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  constructor(
    private mapService: MapService,
    private layerService: LayersService
  ) {}

  private initMap(): void {
    this.mapService.map = L.map('map', {
      center: [55.75, 37.61],
      zoom: 12,
    });
  }

  private initBaseLayer(): void {
    this.mapService.map.addLayer(this.layerService.tiles);
  }

  clearLayout() {
    this.mapService.map.eachLayer((a) => {
      this.mapService.map.removeLayer(a);
    });
  }

  addLayouts(layouts: { endpoint: Observable<GeoJSON>; color: string }[]) {
    for (let layout of layouts) {
      layout.endpoint.subscribe((data) => {
        const layer = L.geoJSON(data, {
          style: { color: layout.color, fillOpacity: 0.5, weight: 3 },
        });
        this.mapService.map.addLayer(layer);
      });
    }
  }

  set_selectedView(data: string) {
    this.clearLayout();
    this.initBaseLayer();
    if (data == 'A-only') {
      this.addLayouts([
        { endpoint: this.layerService.fetch_a(), color: 'red' },
      ]);
    }
    if (data == 'B-only') {
      this.addLayouts([
        { endpoint: this.layerService.fetch_b(), color: 'green' },
      ]);
    }
    if (data == 'A-and-B') {
      this.addLayouts([
        { endpoint: this.layerService.fetch_a(), color: 'red' },
        { endpoint: this.layerService.fetch_b(), color: 'green' },
      ]);
    }
    if (data == 'A-intersect-B') {
      this.addLayouts([
        { endpoint: this.layerService.fetchIntersection(), color: 'blue' },
      ]);
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.initBaseLayer();
  }
}
