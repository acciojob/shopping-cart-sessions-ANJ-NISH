// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
	{ id: 1, name: "Product 1", price: 10 },
	{ id: 2, name: "Product 2", price: 20 },
	{ id: 3, name: "Product 3", price: 30 },
	{ id: 4, name: "Product 4", price: 40 },
	{ id: 5, name: "Product 5", price: 50 },
  ];
  
  // DOM elements
  const productList = document.getElementById("product-list");
  let clist=document.getElementById("cart-list");
  
  // Render product list
  function renderProducts() {
	products.forEach((product) => {
	  const li = document.createElement("li");
	  li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
	  productList.appendChild(li);
	});
  }
  
  // Render cart list
  function renderCart() {
  
	clist.innerHTML="";
	  if(sessionStorage.getItem('cart'))
	  {
		  let prodarr=JSON.parse(sessionStorage.getItem('cart'));
  
		  prodarr.forEach((indiprod)=>
			  {
				  let litem=document.createElement('li');
				  litem.innerHTML=`${indiprod.name} - $${indiprod.price} <button id=${indiprod.id}>Remove from cart</button>`;
				  clist.appendChild(litem);		
			  }
			  )
	  }
  }
  
  // Add item to cart
  function addToCart(productId) {

	  let indiprod=products.filter((prod)=> parseInt(prod.id)===parseInt(productId));

	  let indiprodobj={id:indiprod[0].id,name:indiprod[0].name,price:indiprod[0].price};

	  if(sessionStorage.getItem('cart'))
	  {
		  let prodarr=JSON.parse(sessionStorage.getItem('cart'));
		  prodarr.push(indiprodobj);
		  sessionStorage.setItem('cart',JSON.stringify(prodarr));
	  }
	  else
	  {
		  sessionStorage.setItem('cart',JSON.stringify(indiprod));
	  }
	 renderCart();
  }
  
  // Remove item from cart
  function removeFromCart(productId) {
      
	let prodarr=JSON.parse(sessionStorage.getItem('cart'));

	let newprodarr=prodarr.filter((indiprod)=> parseInt(indiprod.id)!==parseInt(productId));

	sessionStorage.setItem('cart',JSON.stringify(newprodarr));

	renderCart();

  }
  
  // Clear cart
  function clearCart() {
     
	sessionStorage.removeItem('cart');
	renderCart();
  } 
  
  // Initial render
  renderProducts();
  renderCart();
  
  
  productList.addEventListener('click',(e)=>
	  {
		e.stopPropagation();
		  if(e.target.tagName==='BUTTON')
		  {
			  let id=e.target.getAttribute('data-id');
			  addToCart(id);
		  }
	  })


let clrbtn=document.getElementById('clear-cart-btn');

clrbtn.addEventListener('click',clearCart);

clist.addEventListener('click',(e)=>
{
	if(e.target.tagName==='BUTTON')
	{
		let pid=e.target.id;
		removeFromCart(pid);
	}
})