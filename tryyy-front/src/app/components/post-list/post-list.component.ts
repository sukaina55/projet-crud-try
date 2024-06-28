import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PetitPost } from '../../models/petit-post';
import { Zone } from '../../models/zone';

@Component({
  selector: 'app-post-list',
  standalone: true,
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  imports: [CommonModule, RouterLink, FormsModule]
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(data => {
      // Initialiser editingName pour chaque post, zone et petit post
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
    });
  }

  editPost(post: Post): void {
    this.postService.updatePost(post.id, post).subscribe(() => {
      post.editingName = false;
    });
  }

  deletePost(post: Post): void {
    if (post.id) {
      this.postService.deletePost(post.id).subscribe(() => {
        this.posts = this.posts.filter(p => p !== post);
      });
    }
  }

  addZone(post: Post): void {
    post.zones.push({
      name: '', petitPosts: [], editingName: false,
      id: 0,
      postId: undefined
    });
  }

  addPetitPost(zone: Zone): void {
    zone.petitPosts.push({
      name: '', editingName: false,
      id: 0,
      postId: undefined,
      zoneId: undefined
    });
  }

  editZone(post: Post, zone: Zone): void {
    this.postService.updateZone(post.id, zone).subscribe(() => {
      zone.editingName = false;
    });
  }

  deleteZone(post: Post, zone: Zone): void {
    post.zones = post.zones.filter(z => z !== zone);
    this.editPost(post);
  }

  editPetitPost(post: Post, zone: Zone, petitPost: PetitPost): void {
    this.postService.updatePetitPost(post.id, zone.id, petitPost).subscribe(() => {
      petitPost.editingName = false;
    });
  }

  deletePetitPost(zone: Zone, petitPost: PetitPost, post: Post): void {
    zone.petitPosts = zone.petitPosts.filter(pp => pp !== petitPost);
    this.editPost(post);
  }
}
