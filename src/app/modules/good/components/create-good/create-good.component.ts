import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { ImageService } from './../../services/image.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { first, catchError, map } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/helpers/error.handler';
import { Good } from '../../models/good.model';
import { GoodService } from '../../services/good.service';
import { Section } from '../../models/section.model';
import { Category } from '../../models/category.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-create-good',
  templateUrl: './create-good.component.html',
  styleUrls: ['./create-good.component.scss'],
})
export class CreateGoodComponent implements OnInit {
  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  files = [];

  private imageFile: File;
  private file: string = null;
  showImg: string = null;
  image: any;

  picture: string;
  images: object[] = [];

  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();

  goodForm: FormGroup;
  good: Good;
  sections: Section[];
  categories: Category[];
  isSectionSelected: boolean = false;

  errors: any = {};
  error = false;
  errorMsg: string;

  srcResult: string;

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Ajouter',
    spinnerSize: 19,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'primary',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
  };

  constructor(
    private _fromBuilder: FormBuilder,
    private _imageService: ImageService,
    private _router: Router,
    private _goodService: GoodService,
    private _errorHandler: ErrorHandler,
    private _snackBar: MatSnackBar,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._goodService.getSection().subscribe((x) => (this.sections = x));
    this._goodService.getCategory().subscribe((x) => (this.categories = x));

    this.goodForm = this._fromBuilder.group({
      name: ['Un objet à louer', [Validators.required, Validators.maxLength(50)]],
      description: ['Une description...', Validators.required],
      state: ['Neuf', [Validators.required]],
      amountPerDay: [15, [Validators.min(0), Validators.max(100000)]],
      amountPerWeek: [null, [Validators.min(0), Validators.max(100000)]],
      amountPerMonth: [null, [Validators.min(0), Validators.max(100000)]],
      street: ['Rue du test', [Validators.required, Validators.maxLength(120)]],
      number: ['1', [Validators.required, Validators.maxLength(10)]],
      box: [null, [Validators.maxLength(10)]],
      postCode: [1000, [Validators.required, Validators.min(1000), Validators.max(9999)]],
      city: ['Bruxelles', [Validators.required, Validators.maxLength(50)]],
      picture: [null, [Validators.required, Validators.maxLength(320)]],
      sectionId: [null, [Validators.required]],
      categoryId: [null, [Validators.required]],
      userId: [this._authService.userValue.id],
    });

    this._errorHandler.handleErrors(this.goodForm, this.errors);
  }

  get f() {
    return this.goodForm.controls;
  }

  onSubmit(): void {
    this.error = false;
    this.errorMsg = '';
    this.spinnerButtonOptions.active = true;

    if (this.checkform()) {
      this._goodService
        .create(this.goodForm.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this._router.navigate(['/annonce/annonces']);
          },
          (error) => {
            this._snackBar.open(error.message, 'Annuler', {
              panelClass: ['colored-snackbar'],
            });
            this.spinnerButtonOptions.active = false;
          }
        );
    } else {
      this.error = true;
      this.errorMsg = 'Un montant doit être indiqué';
      this._snackBar.open(this.errorMsg, 'Annuler', {
        panelClass: ['colored-snackbar'],
      });
      this.spinnerButtonOptions.active = false;
    }
  }

  checkform(): boolean {
    if (
      this.goodForm.value.amountPerDay === null &&
      this.goodForm.value.amountPerWeek === null &&
      this.goodForm.value.amountPerMonth === null
    ) {
      return false;
    } else {
      return true;
    }
  }

  getAllImages() {
    this.images = this._imageService.getImage();
  }

  imageProgress: number;

  addImage(image) {
    const formData = new FormData();
    formData.append('image', image.data);
    image.inProgress = true;
    this._imageService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.imageProgress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        image.inProgress = false;
        return of(`${image.data.name} upload failed.`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
          this.message = 'Chargement réussi';
          let imgLink = event.body.data.link;
          this.goodForm.controls['picture'].setValue(imgLink);
          this.showImg = imgLink;
        }
      });
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      console.log(file);
      this.addImage(file);
    });
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  onSectionChangeAction(sectionId: number) {
    this.isSectionSelected = false;
    this._goodService
      .getCategoriesBySection(sectionId)
      .subscribe((categories) => (this.categories = categories));

    for (let category of this.categories) {
      if (true) {
        this.isSectionSelected = true;
      } else {
        this.isSectionSelected = false;
      }
    }
  }
}
