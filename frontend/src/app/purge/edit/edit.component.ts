import { Component, OnInit } from '@angular/core';

import { PurgeService } from '../purge.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Purge } from '../purge';

import { FormGroup, FormControl, Validators} from '@angular/forms';

     

@Component({

  selector: 'app-edit',

  templateUrl: './edit.component.html',

  styleUrls: ['./edit.component.css']

})

export class EditComponent implements OnInit {
  
  id!: number;
  purge!: Purge;
  form!: FormGroup;
  selectedImage: any;

  constructor(
    public purgeService: PurgeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['purgeId'];
    this.purgeService.find(this.id).subscribe((data: Purge)=>{
      this.purge = data;
    }); 

    this.form = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      file: new FormControl(''),
      fecha_fin:new FormControl(''),
      fase:new FormControl(''),
      purge_id:new FormControl('')
    });
  }

  get f(){
    return this.form.controls;
  }

  onSubmit(form:FormGroup): void {
    this.purgeService.update(this.purge.id, this.form.value).subscribe(
      (response) => {
        console.log('Purge creado exitosamente:', response);
        this.router.navigateByUrl('purges/all');
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