import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../post';
import { AuthService } from 'src/app/shared/auth.service';

    

@Component({

  selector: 'app-view',

  templateUrl: './view.component.html',

  styleUrls: ['./view.component.css']

})

export class ViewComponent implements OnInit {
  id!: number;
  post!: Post;
  fecha_fin?:Date;
  timer: string = '';
  loggedUser : any;

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private authService : AuthService,
   ) { }

   ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data: Post) => {
      this.getUserLogged();
      this.post = data;
      console.log(this.post);
  
      if (this.post.purge_id != null) {
        this.fecha_fin = this.post.purge.fecha_fin;
        console.log(this.fecha_fin);
  
        // Start the countdown timer
        this.startTimer();
      }

      //Comprobar que el titulo existe:
      console.log(this.post.purge.titulo);
      console.log(this.post.purge);
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

  startTimer() {
    const countDownDate = new Date(this.fecha_fin!).getTime();
    const cuenta = setInterval(() => {
      const now = new Date().getTime();
      const timeleft = countDownDate - now;
      if (timeleft <= 0) {
        clearInterval(cuenta);
        this.timer = "This Purge has Ended";
      } else {
        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        // Format the timer
        this.timer = `${days}:${hours}:${minutes}:${seconds}`;
      }
    }, 1000);

}

getUserLogged(){
  this.authService.profileUser().subscribe((data)=>{
    this.loggedUser = data;
    console.log(this.loggedUser)
  })
  console.log(this.loggedUser)
}

deletePost(id:number){
  this.postService.delete(id).subscribe(res => {
       console.log('Petition deleted successfully!');
       this.router.navigateByUrl('feed');
  })
}
}