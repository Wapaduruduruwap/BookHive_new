import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BooksService, IBook } from '../../services/books.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public avatarUrl: string | null = null;
  public isEditing: boolean = false;
  public searchResults: IBook[] = [];
  public selectedBooks: IBook[] = [];
  public isLoadingAvatar: boolean = false;

  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB
  private readonly allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _booksService: BooksService,
    private readonly _snackBar: MatSnackBar,
    private readonly _cdr: ChangeDetectorRef
  ) {
    this.profileForm = this._formBuilder.group({
      name: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(2)]],
      email: [{ value: '', disabled: true }],
      favoriteQuote: [{ value: '', disabled: true }],
      bookSearch: [''],
      customBook: this._formBuilder.group({
        title: [''],
        author: ['']
      })
    });
  }

  public ngOnInit(): void {
    this.profileForm.get('bookSearch')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => this._booksService.searchBooks(term))
      )
      .subscribe(books => {
        this.searchResults = books;
        this._cdr.markForCheck();
      });
  }

  public toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.profileForm.enable();
    } else {
      if (this.profileForm.valid) {
        this.onSubmit();
        this.profileForm.disable();
      } else {
        this._snackBar.open('', '', {
          duration: 3000
        });
        this.isEditing = true;
      }
    }
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > this.maxFileSize) {
      this._snackBar.open('', '', {
        duration: 3000
      });
      return;
    }

    if (!this.allowedFileTypes.includes(file.type)) {
      this._snackBar.open('', '', {
        duration: 3000
      });
      return;
    }

    this.isLoadingAvatar = true;
    this._cdr.markForCheck();

    const reader = new FileReader();
    
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.avatarUrl = e.target?.result as string;
      this.isLoadingAvatar = false;
      this._cdr.markForCheck();
      this._snackBar.open('', '', {
        duration: 2000
      });
    };

    reader.onerror = () => {
      this.isLoadingAvatar = false;
      this._cdr.markForCheck();
      this._snackBar.open('', '', {
        duration: 3000
      });
    };

    reader.readAsDataURL(file);
  }

  public removeAvatar(): void {
    this.avatarUrl = null;
    this._cdr.markForCheck();
    this._snackBar.open('', '', {
      duration: 2000
    });
  }

  public addBook(book: IBook): void {
    if (!this.selectedBooks.find(b => b.id === book.id)) {
      this.selectedBooks.push(book);
    }
    this.profileForm.get('bookSearch')?.setValue('');
    this.searchResults = [];
  }

  public addCustomBook(): void {
    const customBookForm = this.profileForm.get('customBook');
    if (customBookForm?.valid) {
      const { title, author } = customBookForm.value;
      this.selectedBooks.push({
        title,
        authors: [author],
        id: Date.now().toString()
      });
      customBookForm.reset();
    }
  }

  public removeBook(bookId: string): void {
    this.selectedBooks = this.selectedBooks.filter(book => book.id !== bookId);
  }

  private onSubmit(): void {
    console.log({
      ...this.profileForm.value,
      books: this.selectedBooks
    });
  }
}
