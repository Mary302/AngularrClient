import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ProductPageComponent } from '../components/product-page/product-page.component';
import { RegisterPageComponent } from '../components/register-page/register-page.component';
import { RegistrycompletionComponent } from '../components/registrycompletion/registrycompletion.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { AdminComponent } from '../components/admin/admin.component';
import { AboutComponent } from '../components/about/about.component';



const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "prefix" }, // pathMatch = התאמת המחרוזת הריקה לכלל הנתיב
    { path: "products", component: ProductPageComponent, 
    children: [
        { path: 'admin', component: AdminComponent },
        { path: 'about', component: AboutComponent }
      ] },     
    { path: "RegisterComplete", component: RegistrycompletionComponent },
    { path: "RegisterPage", component: RegisterPageComponent },
    { path: "login", component: LoginComponent },
    { path: "checkout", component: CheckoutComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
              
    exports: [RouterModule]
})
export class AppRoutingModule { }
