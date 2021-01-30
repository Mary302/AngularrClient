import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AuthenticationInterceptor } from '../interceptors/AuthenticationInterceptor';

import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";



import { LayoutComponent } from '../components/layout/layout.component';
import { AboutComponent } from '../components/about/about.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { LoginComponent } from '../components/login/login.component';
import { ProductPageComponent } from '../components/product-page/product-page.component';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from '../components/register-page/register-page.component';
import { RegistrycompletionComponent } from '../components/registrycompletion/registrycompletion.component';
import { InfoComponent } from '../components/info/info.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';
import { ProductsCategoryPipe } from '../pipes/ProductsCategoryPipe'
import { ProductsNamePipe } from '../pipes/ProductsNamePipe copy';
import { AdminComponent } from '../components/admin/admin.component';

@NgModule({
    declarations: [
        ProductsCategoryPipe,
        ProductsNamePipe,
        LayoutComponent,
        AboutComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        ProductPageComponent,
        RegisterPageComponent,
        RegistrycompletionComponent,
        InfoComponent,
        AdminComponent,
        CheckoutComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatToolbarModule,  
        MatIconModule,  
        MatButtonModule,  
        MatCardModule,  
        MatProgressBarModule ,
        MatInputModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule

    ],
    exports: [ FormsModule,
              
],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
    ],

    bootstrap: [LayoutComponent]
})
export class AppModule { }
