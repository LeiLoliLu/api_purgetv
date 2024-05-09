import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { Purge } from 'src/app/purge/purge';
import { PurgeService } from 'src/app/purge/purge.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  isSignedIn: boolean = false;
  newPostContent: string = '';
  loggedUser : any;
  selectedImage: any;
  form!: FormGroup;
  

  constructor(private purgeService: PurgeService, private authStateService: AuthStateService, private formBuilder: FormBuilder, private authService : AuthService, private router: Router) { 
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      file: new FormControl(''),
      fecha_fin:new FormControl(''),
      fase:new FormControl(''),
      purge_id:new FormControl('')
    });
  }


  

  onSubmit(form:FormGroup): void {
      const formData = new FormData();
      formData.append('titulo', form.value.titulo);
      formData.append('fase', form.value.fase);
      formData.append('fecha_fin', form.value.fecha_fin);
      formData.append('purge_id', form.value.purge_id);

      if(this.selectedImage!=null){
        formData.append('file',this.selectedImage);
      }else{
        console.log("imagen nula");
      }
      this.purgeService.create(formData).subscribe(
        (response) => {
          console.log('Purge creado exitosamente:', response);
          this.router.navigateByUrl('purges/');
        },
        (error) => {
          console.error('Error al crear el purge:', error);
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
