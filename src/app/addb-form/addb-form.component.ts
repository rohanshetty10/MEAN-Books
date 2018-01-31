import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../../Book';
import { Router } from '@angular/router';


@Component({
	selector: 'app-addb-form',
	templateUrl: './addb-form.component.html',
	styleUrls: ['./addb-form.component.css']
})

export class AddbFormComponent implements OnInit {
	myForm : any = {
		bookname: String,
		authorname: String,
		price: String
	}

	books: Book[];
	bookname: string;
	authorname: string;
	price: string;

	constructor(private bookService:BookService, private router: Router) { 
		this.bookService.getBooks()
		.subscribe(books => {
			this.books = books;
		})
	}

	addBook(event){
		event.preventDefault();
		var newBook = {
			bookname: this.bookname,
			authorname: this.authorname,
			price: this.price
		}

		this.bookService.addBook(newBook)
		.subscribe(book => {
			this.books.push(book);
			this.bookname = '';
			this.authorname = '';
			this.price = '';
			this.router.navigateByUrl('/app-the-form');
		});
	}

	ngOnInit() {
	}

}
