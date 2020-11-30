import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ApiserviceService } from './apiservice.service';
import { NgxUiLoaderService } from "ngx-ui-loader";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  name = 'NGX-UI-LOADER';

  showmore = false;
  dataExists = false;
  dataExistsInDB = false;
  content_details = false;
  show_company_details = false;
  Modal_window = false;
  imgage_over = true;


  public company_name = '';
  public company_location = '';

  public filter_companies = []

  @ViewChild('companyForm') companyForm: NgForm
  @ViewChild('searchForm') searchForm: NgForm
  public show_country = true;
  public show_state = true;
  public show_city = true;

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  public companies = []
  public companies_drop = [
    { name: "HCL" },
    { name: "HCl" },
    { name: "Merit" },
    { name: "TCS" }
  ]

  text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`;

  public data = {
    "company_name_1": '',
    "address_1": '',
    "address_2": '',
    "address_3": '',
    "city": '',
    "state": '',
    "postal_code": '',
    "country": '',
    "website": '',
    "industry_type": '',
    "head_office": '',
    "logo": '',
    "extract_from": '',
    "Phone": '',
    "currency": ''
  };
  filter_default_value = false;
  filter = {}
  filter_state = {}
  filter_city = {}
  unique_country = []
  unique_state = []
  unique_city = []
  // Do some stuff
  options = {
    componentRestrictions: { country: 'IN' }
  }

  constructor(public apiService: ApiserviceService, private ngxLoader: NgxUiLoaderService) { }
  public handleAddressChange(address: any) {
    console.log("Address", address)
  }
  onSubmit() {
    this.ngxLoader.start();
    console.log("Data for Database Query", JSON.stringify(this.payload()))
    this.apiService.companyDetails(this.transPayload())
      .subscribe(res => {   
        // this.Modal_window = false;     
        if (res.length>=1) {
          this.Modal_window = false;                
          this.show_company_details = false; 
          this.imgage_over = false;         
          // check condition to check key and make div show
          this.dataExists = true
          console.log("Data from Api#####", JSON.stringify(res))
          this.ngxLoader.stop();
          this.companies = res;
          console.log("companies", JSON.stringify(this.companies))
          this.filter_companies = res;


          //  uniqueue country for check box filter
          this.unique_country = this.filter_companies.map(item => item.country).filter((value, index, self) => self.indexOf(value) === index)
          this.unique_country.forEach(item => this.filter[item] = this.filter_default_value)
          this.unique_country = this.unique_country.filter(function (e) { return e });

          console.log("###########################", JSON.stringify(this.unique_country))

          // uniqueue state for check box filter

          this.unique_state = this.filter_companies.map(item => item.state).filter((value, index, self) => self.indexOf(value) === index)
          this.unique_state.forEach(item => this.filter_state[item] = this.filter_default_value)
          this.unique_state = this.unique_state.filter(function (e) { return e });

          // uniqueue city for check box filter

          this.unique_city = this.filter_companies.map(item => item.city).filter((value, index, self) => self.indexOf(value) === index)
          this.unique_city.forEach(item => this.filter_city[item] = this.filter_default_value)
          this.unique_city = this.unique_city.filter(function (e) { return e });
                    
        } else {
          console.log('Ifffffffffff',res)
          this.ngxLoader.stop();
          this.Modal_window = true;
          this.dataExists = false;
          this.imgage_over = false;          
          
        }
      })
  }

  public transPayload() {
    return {
      "compay_name": this.company_name,
      "location": this.company_location
    }
  }

  public payload() {
    return {
      "query":
      {
        "terms":
        {
          "compay_name": this.company_name,
          "location": this.company_location
        }
      }
    }
  }

  public restForm() {

    this.companyForm.resetForm()

  }

  public showDetails(data) {

    this.show_company_details = true;
    this.data = data.details

    console.log("data#####", JSON.stringify(this.data))
  }




  filterChange() {
    let check_keys = Object.keys(this.filter).every((k) => !this.filter[k])
    if (check_keys) {
      this.companies = this.filter_companies
    }
    else {
      this.companies = this.filter_companies.filter(x =>
        (x.country in this.filter && this.filter[x.country])
      );
    }
  }

  filter_state_Change() {
    let check_keys = Object.keys(this.filter_state).every((k) => !this.filter_state[k])
    if (check_keys) {
      this.companies = this.filter_companies
    }
    else {
      this.companies = this.filter_companies.filter(x =>
        (x.state in this.filter_state && this.filter_state[x.state])
      );
    }
  }

  filter_city_Change() {

    let check_keys = Object.keys(this.filter_city).every((k) => !this.filter_city[k])
    if (check_keys) {
      this.companies = this.filter_companies
    }
    else {
      this.companies = this.filter_companies.filter(x =>
        (x.city in this.filter_city && this.filter_city[x.city])
      );
    }

  }

  rest_value() {
    this.dataExists = false;
    this.show_company_details = false;
    this.Modal_window = false;
    this.imgage_over = true;
    this.data = {
      "company_name_1": '',
      "address_1": '',
      "address_2": '',
      "address_3": '',
      "city": '',
      "state": '',
      "postal_code": '',
      "country": '',
      "website": '',
      "industry_type": '',
      "head_office": '',
      "logo": '',
      "extract_from": '',
      "currency": '',
      "Phone": ''
    };
    window.location.reload();
  }

}
