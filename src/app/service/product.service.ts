import { Injectable } from '@angular/core';
import { Observable, of, throwError,  } from 'rxjs';
import { PageProduct, Product } from '../model/product.model';
import { UUID} from 'angular2-uuid';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products!:Array<Product>;

  constructor() {
    this.products=[
      {id:UUID.UUID(), name:"telephone",price:150000,promotion:true},
      {id:UUID.UUID(), name:"ordinateur",price:200000,promotion:false},
      {id:UUID.UUID(),name:"frigo",price:42000,promotion:true},
      {id:UUID.UUID(), name:"souris",price:150000,promotion:true},
      {id:UUID.UUID(), name:"wifi",price:200000,promotion:false},
      {id:UUID.UUID(),name:"frigo",price:42000,promotion:true},
      {id:UUID.UUID(), name:"telephone",price:150000,promotion:true},
      {id:UUID.UUID(), name:"ordinateur",price:200000,promotion:false},
      {id:UUID.UUID(),name:"frigo",price:42000,promotion:true},
      {id:UUID.UUID(), name:"souris",price:150000,promotion:true},
      {id:UUID.UUID(), name:"ordinateur",price:200000,promotion:false},
      {id:UUID.UUID(), name:"wifi",price:150000,promotion:true},
      {id:UUID.UUID(), name:"ordinateur",price:200000,promotion:false},
      {id:UUID.UUID(),name:"frigo",price:42000,promotion:true},
      {id:UUID.UUID(), name:"telephone",price:150000,promotion:true},
      {id:UUID.UUID(), name:"ordinateur",price:200000,promotion:false},
      {id:UUID.UUID(),name:"frigo",price:42000,promotion:true},
      {id:UUID.UUID(),name:"frigo",price:42000,promotion:true},
    ]
   }

   //service qui permet de rechercher un produit
   public searchProducts(keyword:string,page:number,size:number):Observable<PageProduct >{
    let result= this.products.filter(p=>p.name.includes(keyword));

    let index =page*size;
    let totalPages= ~~(result.length/size);
    if(this.products.length/size!=0)
    totalPages++;
     let pageProduct=result.slice(index, index+size);

     return of({ page:page, size:size, totalPages:totalPages, products:pageProduct });
   }

   //service qui permet de gerer la promotion d'un 
   public setPromotion(id:string): Observable<boolean>{
     let product=this.products.find(p=>p.id==id);
     if(product!=undefined){
        product.promotion!=product.promotion;
        return of(true)
     }else return throwError(()=>Error("produit not found"))
   }

    // service qui affiche tout les pagination
    public getAllPageProducts(page:number, size:number):Observable<PageProduct> {
      let index =page*size;
      let totalPages= ~~(this.products.length/size);
      if(this.products.length/size!=0)
      totalPages++;
       let pageProduct=this.products.slice(index, index+size);
       return of({ page:page, size:size, totalPages:totalPages, products:pageProduct });
     }

  // service qui affiche tout les produits
   public getAllProducts():Observable<Product[]> {
    return of(this.products);
   }
 
  
   //service  qui permet de supprimer un produit
   public deleteProduct(id:string): Observable<boolean>{
    this.products.filter(p=>p.id!=id);
    return of(true)

   } 
 
}

 
