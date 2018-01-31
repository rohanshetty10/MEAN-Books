import { Component } from '@angular/core';
import { BookService } from './services/book.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styles: [
	"../node_modules/bulma/css/bulma.css",
	"styles.css"
	],
	providers:[BookService]
})
export class AppComponent {
	title = 'app';
}
