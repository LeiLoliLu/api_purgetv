import { Component, OnInit } from '@angular/core';

import { PurgeService } from '../purge.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Purge } from '../purge';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormGroup, Validators , FormControl, ReactiveFormsModule} from '@angular/forms';
import { PostService } from 'src/app/post/post.service';

    

@Component({

  selector: 'app-view',

  templateUrl: './view.component.html',

  styleUrls: ['./view.component.css']

})

export class ViewComponent implements OnInit {
  id!: number;
  purge!: Purge;
  timer: string = '';
  loggedUser : any;
  selectedImage: any;
  form!: FormGroup;

  constructor(
    public purgeService: PurgeService,
    private route: ActivatedRoute,
    private router: Router,
    private authService : AuthService,
    private postService : PostService,
    private formBuilder: FormBuilder
   ) { }

   ngOnInit(): void {
    this.form = new FormGroup({
      content: new FormControl('', [Validators.required]),
      file: new FormControl(''),
      purge_id:new FormControl('')
    });

    this.id = this.route.snapshot.params['purgeId'];
    this.purgeService.find(this.id).subscribe((data: Purge) => {
      this.getUserLogged();
      this.purge = data;
      console.log(this.purge);
      this.startTimer();
    });
    
  }

  startTimer() {
    const countDownDate = new Date(this.purge.fecha_fin).getTime();
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

deletePurge(id:number){
  this.purgeService.delete(id).subscribe(res => {
       console.log('Purge deleted successfully!');
       this.router.navigateByUrl('purges');
  })
}

onSubmit(form:FormGroup): void {
  const formData = new FormData();
  formData.append('content', form.value.content);
  formData.append('purge_id', this.purge.id.toString());

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
}