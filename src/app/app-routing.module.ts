import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductItemDetailComponent } from './product-item-detail/product-item-detail.component';
import { CheckoutSuccessComponent } from "./checkout-success/checkout-success.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'success/:firstName/:totalPrice', component: CheckoutSuccessComponent},
  {path: 'cart', component: CartComponent},
  {path: 'product/:id', component: ProductItemDetailComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
