import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestApiService } from '../services/rest-api.service';
import bootstrap from "bootstrap";
import { ApiserviceService } from './apiservice.service';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {FormsModule} from '@angular/forms';
import { FilterPipe } from './filter.pipe';
// import {NgxUiLoaderConfig, NgxUiLoaderModule} from 'ngx-ui-loader';
import {NgxUiLoaderHttpModule} from 'ngx-ui-loader'
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION
} from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "red",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 5,
  "fgsColor": "#ff0000",
  "fgsPosition": "center-center",
  "fgsSize": 150,
  "fgsType": "three-strings",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "red",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "Loading.......",
  "textColor": "#FFFFFF",
  "textPosition": "center-center"
}

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    GooglePlaceModule,
    FormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true })
  ],
  providers: [RestApiService,ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
