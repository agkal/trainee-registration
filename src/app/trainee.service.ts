import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TraineeService {
  url = "http://localhost:3000/students";
  data2:any;
  constructor(private http: HttpClient) { }

  getList() {
    return this.http.get(this.url);
  }
  saveTrainee(data) {
    console.log("value service: ", data);
    this.data2 = data;
    this.data2['phone'] = data.country_phone.phone;
    console.warn("service: ",data);

    return this.http.post(this.url, data);
  }
}
