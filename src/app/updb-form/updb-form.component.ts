import { Component, OnInit, Input } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../../Book';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
	selector: 'app-updb-form',
	templateUrl: './updb-form.component.html',
	styleUrls: ['./updb-form.component.css']
})
export class UpdbFormComponent implements OnInit {
	books: Observable<Book[]>;
	public id;
	public bookname;
	public authorname;
	public price;
	constructor(private bookService:BookService, private service: BookService, private route: ActivatedRoute, private router: Router) { 
	}

	ngOnInit() {
		this.route.paramMap
		.subscribe((params: ParamMap) => {
			this.bookname = params.get('bookname');
			this.authorname = params.get('authorname');
			this.price = params.get('price');
			this.id = params.get('id');
			return this.service.getBooks();
		});
	}

	updateBook2(event) {
		event.preventDefault();
		var book = {
			id: this.id,
			bookname: this.bookname,
			authorname: this.authorname,
			price: this.price
		}

		this.bookService.updateBook(book)
		.subscribe(data => {
			book.bookname = this.bookname;
			book.authorname = this.authorname;
			book.price = this.price;
			this.bookname = '';
			this.authorname = '';
			this.price = '';
			this.router.navigateByUrl('/app-the-form');
		});
	}
}
