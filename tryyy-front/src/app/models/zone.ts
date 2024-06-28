import { PetitPost } from "./petit-post";

export class Zone {
    id: number = 0;
    name: string = '';
    petitPosts: PetitPost[] = [];
    
  editingName?: boolean;
  postId: any;
  
    constructor() {
      this.petitPosts = [];
    }
  }