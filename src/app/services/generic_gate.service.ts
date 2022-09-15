import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { serverURL } from 'src/environments/environment';

@Injectable()
export class GenericGateService {

  constructor(private http: HttpClient) {
  }

  public doHttpRequest(paramMethod: 'POST' | 'PUT' | 'GET' | 'DELETE', urlEndpoint: string,
    dataParam?: Object, headers?: Array<{ key: string, value: string | string[] }>,
    paramResponseType?: 'arraybuffer' | 'blob' | 'json' | 'text'): Promise<any> {
    let uri = serverURL + urlEndpoint;

    let httpRequest = new HttpRequest(paramMethod, uri, dataParam, { responseType: (paramResponseType || 'json') });

    if (headers && headers.length > 0) {
      headers.map((item) => {
        httpRequest = httpRequest.clone({
          headers: httpRequest.headers.set(item.key, item.value)
        });
      });
    }

    httpRequest = httpRequest.clone({
      headers: httpRequest.headers.set('Access-Control-Allow-Origin', '*')
    });
    httpRequest = httpRequest.clone({
      headers: httpRequest.headers.set('Content-Type', 'application/json')
    });

    return new Promise((resolve, reject) => {
      const rq = this.http.request(httpRequest);
      if (rq) {
        rq.toPromise().then(
          res => { // Success
            resolve(res);
          },
          msg => { // Error
            reject(msg);
          }
        );
      }

    });
  }
}
