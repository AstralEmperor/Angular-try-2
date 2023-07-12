import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LatLng, LatLngTuple, Map, marker, Marker, icon, map, tileLayer, LatLngExpression, LeafletMouseEvent } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{

  @Input()
  order!:Order;
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl: 'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42], //ancor point on the map (sharp part)
  });
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62]; //default location

  @ViewChild('map', {static:true}) //makes it available in ngInit
  mapRef!:ElementRef;
  map!:Map;
  currentMarker!:Marker;

  constructor(private locationService: LocationService){}
  ngOnInit(): void {
    this.initializeMap();
  }
  initializeMap(){
    if(this.map) return; //if map is initialised, return
    else{
      this.map = map(this.mapRef.nativeElement,  {
        attributionControl: false
      }).setView(this.DEFAULT_LATLNG, 1) //zoom level = 1

        tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map); //osm = open street map = free

        this.map.on('click', (e: LeafletMouseEvent) => {
          this.setMarker(e.latlng);
        })
    }
  }
  findMyLocation(){
      this.locationService.getCurrentLocation().subscribe({
        next: (latlng) => {
          this.map.setView(latlng, this.MARKER_ZOOM_LEVEL)
          this.setMarker(latlng)
        }
      })
  }
  setMarker(latLng:LatLngExpression){
    this.addressLatLng = latLng as LatLng;
    if(this.currentMarker){
      this.currentMarker.setLatLng(latLng)
      return;
    }
    this.currentMarker = marker(latLng, {
      draggable:true,
      icon:this.MARKER_ICON
    }).addTo(this.map);

    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    })
  }
  //future proof for MongoDB
   set addressLatLng(latlng: LatLng){
    if(!latlng.lat.toFixed) return;

    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  get addressLatLng(){
    return this.order.addressLatLng!;
  }
}
