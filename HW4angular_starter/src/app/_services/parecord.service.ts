
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {AuthService} from './auth.service';
import {PARecord} from '../_models/PARecord';




@Injectable({ providedIn: 'root' })
export class PArecordService {
  constructor(private http: HttpClient, private auth: AuthService) { }

  getAll() {
      return this.http.get<PARecord[]>(`http://localhost:3030/parecord/getparecords`);
  }

  add(cost: number, createdDate: Date, category: number, name: String, group: String) {
    const parecord = {
          cost,
          createdDate,
          category,
          name,
          group
        };


    return this.http.post(`http://localhost:3030/parecord/addparecord`, parecord);

  }

  update(newCost: number, newCreatedDate: Date, newCategory: number, newName: String) {
    const parecord = {
      newCost,
      newCreatedDate,
      newCategory,
      newName
    }

    return this.http.post('http://localhost:3030/parecord/updateparecord', parecord)

  }
  delete(date: string) {
    return this.http.delete(`http://localhost:3030/parecord/${date}`);

  }

  deleteGroup(group: String) {
    console.log(group);
    return this.http.delete(`http://localhost:3030/parecord/delete/${group}`);
  }

}
