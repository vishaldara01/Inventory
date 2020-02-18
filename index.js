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
	},
	computed:{
		productCount(){
			return this.products.length;
		},
		lowStock(){
			return !this.isNew && this.stock < 5;
		},
	},
	methods:{
		lowStock(){
			return this.stock < 1;
		},
		validate(){
			this.isNew = false;
			category = this.categories.filter((category) =>{
				return category.id == this.categoryId;
				});
			//line 72 this.lowStock() wasn't wor	king
				if(!this.productName || this.productName.length < 3 || this.lowStock() || this.price < 10 || category.length === 0){
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
		this.resetProduct();
	},
	resetProduct(){
		this.productName = null;
		this.description= null;
		this.stock  = 0,
		this.price = 0,
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
		this.resetProduct();
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