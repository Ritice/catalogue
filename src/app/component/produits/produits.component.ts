import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [NgFor,NgIf,NgClass, ReactiveFormsModule,JsonPipe ],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent implements OnInit{

  products!:Array<Product>;
  errorMessage!: string;
  searchFormGroup!:FormGroup;
   currentPage:number=0;
   pageSize:number=5;
   totalPage!:number;
   currentAction :string="all"
  


  constructor(private productService : ProductService, private fb:FormBuilder  ){}

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
        keyword:this.fb.control(null),
    })
       this.handleGetPageProducts();
  }

  gotoPage(i:number){
       this.currentPage=i;
       if(this.currentAction==='ll')
          this.handleGetPageProducts();
        else
          this.handleSearchProducts();
  }

  //methode qui appel le service pour la recherche d'un produit
  handleSearchProducts(){
    this.currentAction="search";
    this.currentPage=0;
     let keyword=this.searchFormGroup.value.keyword;
     this.productService.searchProducts(keyword,this.currentPage,this.pageSize).subscribe({
      next:(data)=>{
        this.products=data.products;
        this.totalPage=data.totalPages;
      }});
  }
 
  //methode qui permet de gerer la promotion des produits
  handleSetPromotion(p:Product) {
    let promo=p.promotion;
      this.productService.setPromotion(p.id).subscribe({
        next:(data)=>{
               p.promotion=!promo;
        },
        error:(error)=>{
          this.errorMessage;
        }
      })

  }
  
  handleGetPageProducts(){
    this.productService.getAllPageProducts(this.currentPage,this.pageSize) .subscribe({
      next:(data)=>{
        this.products=data.products;
        this.totalPage=data.totalPages;
      },
      error:(err) =>{
          this.errorMessage=err;
      },
     });
  }

  //methode qui appel le service et recuper tout les produits
  handleGetAllProducts(){
    this.productService.getAllProducts().subscribe({
      next:(data)=>{
        this.products=data;
      },
      error:(err) =>{
          this.errorMessage=err;
      },
     });
  }



  //methode qui apple le service pour supprimer un produit
  handleDelecteProduct(p:Product){
    let conf=confirm("are you sure...");
    if(conf==false) return;
    this.productService.deleteProduct(p.id).subscribe({
      next:(data)=>{
           let index= this.products.indexOf(p);
           this.products.splice(index,1)
      }
    })
  }
}
