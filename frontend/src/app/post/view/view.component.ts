import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../post';

    

@Component({

  selector: 'app-view',

  templateUrl: './view.component.html',

  styleUrls: ['./view.component.css']

})

export class ViewComponent implements OnInit {
  id!: number;
  post!: Post;

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
   ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data: Post)=>{
      console.log(data);
      this.post = data;
    });
    

  }

  likePost(postId: number) {
    this.postService.likePost(postId).subscribe(
      response => {
        console.log('Me gusta agregado exitosamente', response);
        // Realiza cualquier acción adicional después de que el "Me gusta" sea exitoso
      },
      error => {
        console.error('Error al dar Me gusta', error);
        // Maneja el error de manera apropiada
      }
    );
  }

}