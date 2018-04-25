import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {

  chatURL = '/chat/';
  constructor(private http: Http) { }

  getChatByRoom(room) {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      //   let data = [{"_id":"5adb806ed1c13309079cd89e","room":"Javascript","nickname":"alok","message":"hello","__v":0,"updated_at":"2018-04-21T18:18:22.463Z"},{"_id":"5adb8086d1c13309079cd89f","room":"Javascript","nickname":"sunny","message":"asaladja","__v":0,"updated_at":"2018-04-21T18:18:46.805Z"},{"_id":"5adb80e3d1c13309079cd8a0","room":"Javascript","nickname":"alok","message":"ttttttttt","__v":0,"updated_at":"2018-04-21T18:20:19.655Z"}];
      //   resolve(data);
      // },10);
      this.http.get(this.chatURL + room)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  showChat(id) {
    return new Promise((resolve, reject) => {
        this.http.get(this.chatURL + id)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

  saveChat(data) {
    return new Promise((resolve, reject) => {
        this.http.post(this.chatURL, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  updateChat(id, data) {
    return new Promise((resolve, reject) => {
        this.http.put(this.chatURL +id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  deleteChat(id) {
    return new Promise((resolve, reject) => {
        this.http.delete(this.chatURL+id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
