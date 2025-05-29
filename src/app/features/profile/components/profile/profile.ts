import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BooksService, IBook } from '../../services/books.service';

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

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _booksService: BooksService
  ) {
    this.profileForm = this._formBuilder.group({
      name: [{ value: '', disabled: true }],
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
      });
  }

  public toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
      if (this.profileForm.valid) {
        this.onSubmit();
      }
    }
  }

  public onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.avatarUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  public removeAvatar(): void {
    this.avatarUrl = null;
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
    // В будущем здесь будет сохранение данных
  }
}
