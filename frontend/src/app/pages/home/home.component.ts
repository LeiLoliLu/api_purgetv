import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import { Router } from '@angular/router';
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
  loggedUser : any;
  selectedImage: any;
  form!: FormGroup;
  

  constructor(private postService: PostService, private authStateService: AuthStateService, private formBuilder: FormBuilder, private authService : AuthService, private router: Router) { 
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      content: new FormControl('', [Validators.required]),
      file: new FormControl('')
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
          this.myPosts=response
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

  

  onSubmit(form:FormGroup): void {
      const formData = new FormData();
      formData.append('content', form.value.content);

      if(this.selectedImage!=null){
        formData.append('file',this.selectedImage);
      }else{
        console.log("imagen nula");
      }
      this.postService.create(formData).subscribe(
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


  getUserLogged(){
    this.authService.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
    console.log(this.loggedUser)
  }
}
