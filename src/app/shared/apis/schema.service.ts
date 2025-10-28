import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Schema } from '../types';
import { SCHEMAS } from '../data';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  getSchemas(): Observable<Schema[]> {
    return of(SCHEMAS).pipe(delay(300))
  }

}
