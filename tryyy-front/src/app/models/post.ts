import { Zone } from "./zone";

export class Post {
    id: number = 0;
    name: string = '';
    zones: Zone[] = [];
   
  editingName?: boolean; // Ajout de la propriété editingName
addingZone: any;
  
    constructor() {
      this.zones = [];
    }
  }