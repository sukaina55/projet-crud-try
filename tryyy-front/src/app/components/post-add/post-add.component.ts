import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { Zone } from '../../models/zone';
import { PetitPost } from '../../models/petit-post';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-add',
  standalone: true,
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css'],
  imports: [CommonModule, RouterLink, FormsModule] 
})
export class PostAddComponent {
  newPost: Post;

  constructor(private postService: PostService) {
    this.newPost = new Post();
  }

  addPost() {
    this.postService.createPost(this.newPost).subscribe(
      (createdPost: Post) => {
        console.log('Post créé avec succès:', createdPost);
        // Réinitialise le formulaire ou effectue d'autres actions nécessaires
        this.newPost = new Post();
      },
      (error) => {
        console.error('Erreur lors de la création du post:', error);
      }
    );
  }

  addZone() {
    const newZone = new Zone();
    this.newPost.zones.push(newZone);
  }

  addPetitPost(zone: Zone) {
    const newPetitPost = new PetitPost();
    zone.petitPosts.push(newPetitPost);
  }
}
