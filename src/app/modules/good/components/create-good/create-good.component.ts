import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { catchError, first, map } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/helpers/error.handler';
import { Good } from '../../models/good.model';
import { GoodService } from '../../services/good.service';
import { Section } from '../../models/section.model';
import { Category } from '../../models/category.model';
import { UploadService } from '../../services/upload.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'app-create-good',
  templateUrl: './create-good.component.html',
  styleUrls: ['./create-good.component.scss']
})
export class CreateGoodComponent implements OnInit {

  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef;
  files = [];

  goodForm: FormGroup;
  good: Good;
  sections: Section[];
  categories: Category[];

  errors: any = {};
  error = false;
  errorMsg: string;

  srcResult: string;

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: "Ajouter",
    spinnerSize: 19,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'primary',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate'
  }

  constructor(
    private _fromBuilder: FormBuilder,
    private _router: Router,
    private _goodService: GoodService,
    private _uploadService: UploadService,
    private _errorHandler: ErrorHandler,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this._goodService.getSection().subscribe(x => this.sections = x);
    this._goodService.getCategory().subscribe(x => this.categories = x);

    this.goodForm = this._fromBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', Validators.required],
      state: ['', [Validators.required]], // TODO ajout des différents etats
      amountPerDay: ['', [Validators.min(0), Validators.max(100000)]],
      amountPerWeek: ['', [Validators.min(0), Validators.max(100000)]],
      amountPerMonth: ['', [Validators.min(0), Validators.max(100000)]],
      street: ['', [Validators.required, Validators.maxLength(120)]],
      number: ['', [Validators.required, Validators.maxLength(10)]],
      box: ['', [Validators.maxLength(10)]],
      postCode: ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      picture: ['', [Validators.required, Validators.maxLength(320)]],
      section: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
    
    this._errorHandler.handleErrors(this.goodForm, this.errors);
  }
  
  get f() { return this.goodForm.controls; }
  
  onSubmit() {
    this.error = false;
    this.errorMsg = "";
    this.spinnerButtonOptions.active = true;
    
    if (this.checkform())
    {
      this._goodService.create(this.good)
        .pipe(first())
        .subscribe(
          data => {
            this._router.navigate(['/annonce/annonces']);
          },
          error => {
            this._snackBar.open(error, 'Annuler', { panelClass: ['colored-snackbar'] });
            this.spinnerButtonOptions.active = false;
          }
        )
      }
    else {
      this.error = true;
      this.errorMsg = "Un montant doit être indiqué";
      this._snackBar.open(this.errorMsg, 'Annuler', { panelClass: ['colored-snackbar'] });
      this.spinnerButtonOptions.active = false;
    }
  }

  checkform(): boolean{
    if (this.goodForm.value.amountPerDay && this.goodForm.value.amountPerWeek && this.goodForm.value.amountPerMonth == null) {
      return false;
    }
    else {
      return true;
    }
  }

  uploadFile(file) {  
    const formData = new FormData();  
    formData.append('file', file.data);  
    file.inProgress = true;  
    this._uploadService.upload(formData).pipe(  
      map(event => {  
        switch (event.type) {  
          case HttpEventType.UploadProgress:  
            file.progress = Math.round(event.loaded * 100 / event.total);  
            break;  
          case HttpEventType.Response:  
            return event;  
        }  
      }),  
      catchError((error: HttpErrorResponse) => {  
        file.inProgress = false;  
        return of(`${file.data.name} upload failed.`);  
      })).subscribe((event: any) => {  
        if (typeof (event) === 'object') {  
          console.log(event.body);  
        }  
      });  
  }

  private uploadFiles() {  
    this.fileUpload.nativeElement.value = '';  
    this.files.forEach(file => {  
      this.uploadFile(file);  
    });  
  }

  onClick() {  
    const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {  
    for (let index = 0; index < fileUpload.files.length; index++)  
    {  
     const file = fileUpload.files[index];  
     this.files.push({ data: file, inProgress: false, progress: 0});  
    }  
      this.uploadFiles();  
    };  
    fileUpload.click();  
  }
}
