import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {
	constructor(private http:Http) {
		console.log("Book Service Initialized!");
	}

	getBooks(){
		return this.http.get('http://localhost:27017/book').map(res => res.json());
	}

	addBook(newBook){
		var headers= new Headers();
		headers.append('Content-Type','application/json');
		return this.http.post('http://localhost:27017/book', JSON.stringify(newBook), {headers: headers})
		.map(res => res.json());
	}

	deleteBook(bookname) {
		return this.http.delete('http://localhost:27017/book/'+bookname)
		.map(res => res.json());
	}

	updateBook(book) {
		var headers= new Headers();
		headers.append('Content-Type','application/json');
		return this.http.put('http://localhost:27017/book', JSON.stringify(book), {headers: headers})
		.map(res => res.json());
	}
}