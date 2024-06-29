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
  formSubmitted: boolean = false;
  successMessage: string | null = null;

  constructor(private postService: PostService) {
    this.newPost = new Post();
  }

  addPost() {
    this.formSubmitted = true; // Marque le formulaire comme soumis
    if (!this.isFormValid()) {
      return; // Arrête la soumission si le formulaire n'est pas valide
    }

    this.postService.createPost(this.newPost).subscribe(
      (createdPost: Post) => {
        console.log('Post créé avec succès:', createdPost);
        this.successMessage = "Le post a été créé avec succès."; // Définit le message de succès
        this.resetForm(); // Réinitialise le formulaire après une soumission réussie
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

  private isFormValid(): boolean {
    // Vérifie si tous les champs requis sont remplis
    return !!this.newPost.name &&
      this.newPost.zones.every(zone =>
        !!zone.name &&
        zone.petitPosts.every(petitPost => !!petitPost.name)
      );
  }

  private resetForm() {
    this.newPost = new Post();
    this.formSubmitted = false;
    // Supprime le message de succès après un certain temps
    setTimeout(() => {
      this.successMessage = null;
    }, 3000); // Le message disparaîtra après 3 secondes
  }
}
