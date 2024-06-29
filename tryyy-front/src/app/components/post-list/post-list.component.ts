import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ZoneService } from '../../services/zone.service';
import { PetitPostService } from '../../services/petitpost.service';
import { Post } from '../../models/post';
import { Zone } from '../../models/zone';
import { PetitPost } from '../../models/petit-post';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  standalone: true,
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  imports: [CommonModule, RouterLink, FormsModule]
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  errorMessage: string | null = null;

  constructor(
    private postService: PostService,
    private zoneService: ZoneService,
    private petitPostService: PetitPostService
  ) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(data => {
      this.posts = data.map(post => ({
        ...post,
        editingName: false,
        zones: post.zones.map(zone => ({
          ...zone,
          editingName: false,
          petitPosts: zone.petitPosts.map(petitPost => ({
            ...petitPost,
            editingName: false
          }))
        }))
      }));
    }, error => {
      this.errorMessage = error.message;
    });
  }

  editPost(post: Post): void {
    this.postService.updatePost(post.id, post).subscribe(() => {
      post.editingName = false;
    }, error => {
      this.errorMessage = error.message;
    });
  }

  editZone(post: Post, zone: Zone): void {
    this.zoneService.updateZone(zone.postId, zone).subscribe(() => {
      zone.editingName = false;
    }, error => {
      this.errorMessage = error.message;
    });
  }

  editPetitPost(post: Post, zone: Zone, petitPost: PetitPost): void {
    this.petitPostService.updatePetitPost(petitPost.zoneId, petitPost).subscribe(() => {
      petitPost.editingName = false;
    }, error => {
      this.errorMessage = error.message;
    });
  }

  deletePost(post: Post): void {
    if (post.id) {
      this.postService.deletePost(post.id).subscribe(() => {
        this.posts = this.posts.filter(p => p !== post);
      }, error => {
        this.errorMessage = error.message;
      });
    }
  }

  
  deleteZone(post: Post, zone: Zone): void {
    if (zone.id) {
      this.zoneService.deleteZone(zone.id).subscribe(() => {
        post.zones = post.zones.filter(z => z !== zone);
      }, error => {
        this.errorMessage = error.message;
      });
    }
  }

  deletePetitPost(zone: Zone, petitPost: PetitPost, post: Post): void {
    if (petitPost.id) {
      this.petitPostService.deletePetitPost(petitPost.id).subscribe(() => {
        zone.petitPosts = zone.petitPosts.filter(pp => pp !== petitPost);
      }, error => {
        this.errorMessage = error.message;
      });
    }
  }

  addZone(post: Post): void {
    post.zones.push({
      id: 0,
      name: '',
      postId: post.id,
      editingName: false,
      petitPosts: []
    });
  }

  addPetitPost(zone: Zone): void {
    zone.petitPosts.push({
      id: 0,
      name: '',
      zoneId: zone.id,
      editingName: false,
      postId: undefined
    });
  }
}
