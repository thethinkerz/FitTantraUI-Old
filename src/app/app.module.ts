import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { RedactComponent } from './Component/redact/redact.component';
import { LoginComponent } from './Component/login/login.component';
import { HeaderComponent } from './Component/header/header.component';
import { FooterComponent } from './Component/footer/footer.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { InterceptorService } from '@app/Service/interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { TagsComponent } from './Component/tags/tags.component';
import { TagComponent } from './Component/tag/tag.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatternComponent } from './Component/pattern/pattern.component';
import { LoaderService } from '@app/Service/loader.service';
import { LoaderInterceptorService } from '@app/Service/loader-interceptor.service';
import { LoaderComponent } from './Component/loader/loader.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GrouppatternComponent } from './Component/grouppattern/grouppattern.component';

@NgModule({
  declarations: [
    AppComponent,
    RedactComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    TagsComponent,
    TagComponent,
    PatternComponent,
    LoaderComponent,
    GrouppatternComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: false,
      enableHtml: true,
      positionClass: 'toast-top-right'
      
    }),
    //NgxExtendedPdfViewerModule
  ],
  providers: [ LoaderService, {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
