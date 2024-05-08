import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../post';

import { FormGroup, FormControl, Validators} from '@angular/forms';

     

@Component({

  selector: 'app-edit',

  templateUrl: './edit.component.html',

  styleUrls: ['./edit.component.css']

})

export class EditComponent implements OnInit {
  
  id!: number;
  post!: Post;
  form!: FormGroup;
  selectedImage: any;

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data: Post)=>{
      this.post = data;
    }); 

    this.form = new FormGroup({
      content: new FormControl('', [Validators.required]),
      file: new FormControl('')
    });
  }

  get f(){
    return this.form.controls;
  }

  onSubmit(form:FormGroup): void {

    this.postService.update(this.post.id, this.form.value).subscribe(
      (response) => {
        console.log('Post creado exitosamente:', response);
        this.router.navigateByUrl('post/'+response.post.id+'/view');
      },
      (error) => {
        console.error('Error al crear el post:', error);
        // Manejar errores aquí si es necesario
      }
    );
}

  onSelectFile(event:any){
    if(event.target.files.length>0){
      const file= event.target.files[0];
      this.selectedImage=file;
    }
  }
}