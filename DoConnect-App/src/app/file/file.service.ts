import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseUrl = "http://localhost:8080/api/image"

  constructor(private httpClient: HttpClient) { }

  uploadImage(file: File): Observable<any>{
    let formData = new FormData();
    formData.append("file", file);
    return this.httpClient.post(`${this.baseUrl}/upload`, formData);
  }

  getImage(filename: string): Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/files/${filename}`, { responseType: 'blob'});
  }
}
