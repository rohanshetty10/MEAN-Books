import { Component, OnInit, Output } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../../Book';
import { Router } from '@angular/router';

@Component({
	selector: 'app-the-form',
	templateUrl: './the-form.component.html',
	styleUrls: ['./the-form.component.css']
})

export class TheFormComponent implements OnInit {
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

	ngOnInit() {
		console.log("Form Initialized");
	}

	deleteBook(bookname) {
		var books = this.books;
		this.bookService.deleteBook(bookname).subscribe(data => {
			for(var i=0; i<books.length; i++) {
				if(books[i].bookname == bookname) {
					books.splice(i, 1);
				}
			}
		});
	}

	callUpdateBook(book) {
		console.log("Book = "+ JSON.stringify(book) );
		this.router.navigate(['/app-updb-form',{ bookname: book.bookname, authorname: book.authorname, price: book.price, id: book._id}]);
	}
}


