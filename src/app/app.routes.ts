import { Routes } from '@angular/router';
import { CustomerComponent } from './component/customer/customer.component';
import { ProduitsComponent } from './component/produits/produits.component';

export const routes: Routes = [
    {
        path:"products", 
        component : ProduitsComponent
    },

    {
        path:"customer",
        component : CustomerComponent 
    },
];
