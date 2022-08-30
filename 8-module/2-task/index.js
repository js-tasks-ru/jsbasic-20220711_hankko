import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  elem;
  productsFiltred;
  container;
  activeFilters = {};
  
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.render(this.products);
    this.productsFiltred = this.products;
  }

  ProductGridTemplate() {
    return `<div class="products-grid">
    <div class="products-grid__inner">
    </div>
  </div>`;  
  }

  render(products) {
    const productGridElem = createElement(this.ProductGridTemplate());
    this.container = productGridElem.querySelector('.products-grid__inner');
    this.createProductElements(products);
    return productGridElem;
  }

  createProductElements(products) {
    products.map((product) => {
      const productCardElem = new ProductCard(product);
      this.container.append(productCardElem.elem);
    });
  }

  updateFilter(filters) {
    this.productsFiltred = this.products;
    const activeFilters = this.activeFilters;

    Object.keys(filters).forEach(function eachKey(key) { 
      activeFilters[key] = filters[key];
    });

    if (activeFilters.noNuts) {this.productsFiltred = this.productsFiltred.filter((product) => 
        product.nuts === false || product.nuts === undefined)}

    if (activeFilters.vegeterianOnly) {this.productsFiltred = this.productsFiltred.filter((product) => 
        product.vegeterian === true)}

    if (activeFilters.maxSpiciness) {this.productsFiltred = this.productsFiltred.filter((product) =>
        product.spiciness <= activeFilters.maxSpiciness)}

    if (activeFilters.category) {this.productsFiltred = this.productsFiltred.filter((product) => 
        product.category === activeFilters.category)}

    this.container.innerHTML = '';
    this.createProductElements(this.productsFiltred);
  }

  get elem() {
    return this.elem;
  }
}