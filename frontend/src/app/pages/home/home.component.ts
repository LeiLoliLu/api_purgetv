import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/post/post';
import { PostService } from 'src/app/post/post.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSignedIn: boolean = false;
  myPosts: Post[] = [];
  allPosts: Post[] = [];
  newPostContent: string = '';
  selectedFile: File | null = null;
  postForm: any;
  loggedUser : any;

  constructor(private postService: PostService, private authStateService: AuthStateService, private formBuilder: FormBuilder, private authService : AuthService) { 
  }
  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      content: ['', Validators.required], // Campo de contenido requerido
      file: [null] // Campo de archivo opcional
    });
    this.authStateService.userAuthState.subscribe((val: boolean) => {
      this.isSignedIn = val;
      if (this.isSignedIn) {
        this.getUserLogged();
        this.loadMyPosts();
        this.loadAllPosts();
      } else {
        // Lógica adicional si el usuario no está autenticado
      }
    });
  }

  loadMyPosts() {
    this.postService.getMine().subscribe(
      (response) => {
        this.myPosts = response;
      },
      (error) => {
        console.error('Error loading my posts:', error);
        // Manejar el error según sea necesario
      }
    );
  }

  loadAllPosts() {
    this.postService.getAll().subscribe(
      (response) => {
        this.allPosts = response;
      },
      (error) => {
        console.error('Error loading all posts:', error);
        // Manejar el error según sea necesario
      }
    );
  }

  

  onSubmit(): void {
    if (this.postForm.valid) {
      const formData = new FormData();
      formData.append('content', this.postForm.value.content);
      formData.append('file', this.postForm.value.file);

      // Llamar al servicio para enviar el formulario
      this.postService.create(formData).subscribe(
        (response) => {
          console.log('Post creado exitosamente:', response);
          // Aquí puedes realizar cualquier acción adicional después de crear el post
        },
        (error) => {
          console.error('Error al crear el post:', error);
          // Manejar errores aquí si es necesario
        }
      );
    }
  }
  onFileSelected(event: any) {
    // Obtiene el archivo seleccionado y lo asigna al formulario
    this.postForm.patchValue({
      file: event.target.files[0]
    });
  }


  getUserLogged(){
    this.authService.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
    console.log(this.loggedUser)
  }
}
