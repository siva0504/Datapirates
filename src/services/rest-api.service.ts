import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { RestApi } from '../assets/api-constants';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private _jsonURL= '/assets/tableData.json'
  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data =>{
      console.log(data)
    })
   }

   public getJSON():Observable<any>{
     return this.http.get('/assets/tableData.json');
   }

  //  getApiData(){
  //    return this.http.get('/assets/')
  //  }
}
