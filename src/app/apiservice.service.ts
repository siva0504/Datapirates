import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';



// import {} from '../assets/api-constants'
@Injectable({
  providedIn: 'root'
})  
export class ApiserviceService {
  name = 'NGX-UI-LOADER';

  constructor(private http: HttpClient,private ngxLoader: NgxUiLoaderService) {    
    this.getJSON().subscribe(data =>{
      console.log("service file calling",data)
    })
   }

  public getJSON():Observable<any>{
    return this.http.get('/assets/tableData.json');
  }

  public companyDetails(data):Observable<any>{      
    return this.http.post('http://172.27.138.45:5000/search',data)
  }
  

  
}


