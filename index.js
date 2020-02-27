Vue.component('product-item',{
	props:['product'],
	template:'<li>{{product.productName}} - "{{product.description}}"</li>'
})
var app = new Vue({
	el: '#app',
	data:{
		isNew: true,
		isValid: true,
		id: null,
		productName: null,
		description: null,
		stock: 0,
		price: 0,
		categoryId: null,

		categories:[
		{id: 1, categoryName: 'Indoor'},
		{id: 2, categoryName: 'Outdoor'},
		{id: 3, categoryName: 'Both'}

		],
		products:[
			{
			id: 1,
			productName: 'Golf Club',
			description: 'Premium golf club',
			stock: 15,
			price: 122.50,
			category: 'Outdoor',
			selected: false,
			},
			{
			id: 2,
			productName: 'Tennis racket',
			description: 'Pro Version',
			stock: 5,
			price: 42.00,
			category: 'Indoor',
			selected: false,
			},
			{
			id: 3,
			productName: 'Football',
			description: 'Excellent for training',
			stock: 25,
			price: 7.25,
			category: 'Both',
			selected: false,
			},
			
		],


		//Use for search and sort
	originalProducts:[],
	//use for search
	search:{
		id: '',
		productName: '',
		description: '',
		stock: '',
		price: '',
		category: '',
	},
	// Use for sorting
	sortItem: {
		column: null,
		direction: null,
	},
	},
	
	computed:{
		productCount(){
			return this.products.length;
		},
		lowStock(){
			return !this.isNew && this.stock < 5;
		},
		sortIconId(){
			return this.sortIcon('id');
		},
		sortIconProductName(){
			return this.sortIcon('productName');
		},
		sortIconDescription(){
			return this.sortIcon('description');
		},
		sortIconStock(){
			return this.sortIcon('stock');
		},
		sortIconPrice(){
			return this.sortIcon('price');
		},
		sortIconCategory(){
			return this.sortIcon('category');
		},
	},
	methods:{
		productSearch(){
			if(this.originalProducts.length === 0){
				this.originalProducts = [...this.products];
			}
			results = this.products;
			if (this.search.id){
				results = results.filter((data)  => {
					return this.search.id == data.id;
				})
			}
		if (this.search.productName){
			results = results.filter((data) => {
				return this.search.productName === data.productName;
			})
		}
		if (this.search.description){
			results = results.filter((data) => {
				return this.search.description === data.description;
			})
		}
		if(this.search.stock){
			results = results.filter((data) => {
				return this.search.stock == data.stock;
			})
		}
		if(this.search.price){
			results = results.filter((data) => {
				return this.search.price == data.price;
			})
		}
		if(this.search.category){
			results = results.filter((data) => {
				return this.search.category == this.getCategoryId(data.category);
			})
		}
		this.products = results;
		},
		sortIcon(column){
			if (column === this.sortItem.column){
				if(this.sortItem.description === 'up'){
					return 'fas fa-sort-up';
				} else if(this.sortItem.description === 'down'){
					return 'fas fa-sort-down';
				}
			} else{
				return '';
			}
		},
		sortClick(column){
			if(this.originalProducts.length === 0){
				this.originalProducts = [...this.products];
			}
			this.sortItem.column = column;
			if(this.sortItem.direction === 'up'){
				this.sortItem.direction = 'down';
				this.products = this.products.sort(this.reverseCompare);
			}else{
				this.sortItem.description = 'up';
				this.products = this.products.sort(this.compare);
			}
		},
		compare(a, b){
			let itemA;
			let itemB;
			if(typeof a[this.sortItem.column] === 'string'){
				itemA = a[this.sortItem.column].toUpperCase();
				itemB = b[this.sortItem.column].toUpperCase();
			}else {
				itemA = a[this.sortItem.column];
				itemB = b[this.sortItem.column];
			}
			if (itemA > itemB){
				return 1;
			}else if (itemA < itemB){
				return -1;
			}else {
				//a equals b
				return 0;
			}
		},
		reverseCompare(a, b){
			return this.compare(b, a);
		},
		resetSearchSort(){
			if (this.originalProducts.length > 0){
				this.products = [...this.originalProducts];
			}
			this.search.id = '';
			this.search.productName = '';
			this.search.description = '';
			this.search.stock = '';
			this.search.price = '';
			this.search.category = '';
			this.search.column = null;
			this.search.direction = null;
		},
		validate(){
			this.isNew = false;
			category = this.categories.filter((category) =>{
				return category.id == this.categoryId;
				});
			//line 72 this.lowStock() wasn't wor	king
				if(!this.productName || this.productName.length < 3 || this.lowStock || this.price < 10 || category.length === 0){
					this.isValid = false;
				}	
				else{
					this.isValid = true;
				}
				return this.isValid;
		},
	
		addProduct(){
		if(!this.validate()){
			return;
		}
		newProduct = {
			id: this.getNextId(),
			productName: this.productName,
			description: this.description,
			stock: this.stock,
			price: this.price,
			category: category[0].categoryName,
		};
		this.products.push(newProduct);
		this.resetProduct2();
	},
	resetProduct2(){
		this.productName = null;
		this.description= null;
		this.stock  = 0;
		this.price = 0;
		this.categoryId = null;
	},
	deleteProduct(event, row){
		event.stopPropagation();
		if(confirm(`Are You Sure You Want To Delete The Product "${row.productName}"?`)){
			filteredProducts = this.products.filter((product) => {
				return product.id !== row.id;
			});
			this.products = filteredProducts;
		}
	},
	clickProduct(row){
		this.products.forEach((product) =>{
			product.selected = false;
		});
		row.selected = true;
		this.id = row.id;
		this.productName = row.productName;
		this.description = row.description;
		this.stock = row.stock;
		this.price = row.price;
		this.categoryId = this.getCategoryId(row.category);
	},
	updateProduct(){
		if (!this.id){
			alert('Please Select a product to update');
			return; //No product selected 
		}
		if(!this.validate()){
			return; //Not valid no more processing 
		}
		currentProduct = {
			id: this.id,
			productName: this.productName,
			description: this.description,
			stock: this.stock,
			price: this.price,
			category: category[0].categoryName,
		};
		let arrayIndex;
		for (i = 0; i < this.products.length; i++){
			if(this.products[i].id == this.id){
				arrayIndex = i;
				break;
			}
		}
		this.products[arrayIndex] = currentProduct;
		this.resetProduct1();
	},
	resetProduct(){
		this.isNew = true;
		this.id = null;
		this.productName = null;
		this.description = null;
		this.stock = 0;
		this,price = 0;
		this.categoryId = null;
	},
	deleteProduct(event, row){
		// stop propagation of the event to the table row
		event.stopPropagation();
		if(confirm(`Are you sure you want to delete the product "${row.productName}"?`)){
			filteredProducts = this.products.filter((product)  => { 
				return product.id !== row.id;
			});
			this.products = filteredProducts;
		}
	},
	getNextId(){
		let max = 0;
		this.products.forEach(product => {
			if(product.id > max){
				max = product.id;
			}
		});
		return max + 1;
	},
	getCategoryId(name){
		categoryIds = this.categories.filter((category) =>{
			return category.categoryName === name;
		});
		return categoryIds[0].id || null;
	},
},
});