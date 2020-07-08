import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMovie } from 'app/shared/model/movie.model';

type EntityResponseType = HttpResponse<IMovie>;
type EntityArrayResponseType = HttpResponse<IMovie[]>;

@Injectable({ providedIn: 'root' })
export class MovieService {
  public resourceUrl = SERVER_API_URL + 'api/movies';

  constructor(protected http: HttpClient) {}

  create(movie: IMovie): Observable<EntityResponseType> {
    return this.http.post<IMovie>(this.resourceUrl, movie, { observe: 'response' });
  }

  update(movie: IMovie): Observable<EntityResponseType> {
    return this.http.put<IMovie>(this.resourceUrl, movie, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IMovie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findDirector(director: string): Observable<IMovie> {
    return this.http.get<IMovie>(`${this.resourceUrl}/director/${director}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMovie[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryRating(rating: number): Observable<EntityArrayResponseType> {
    return this.http.get<IMovie[]>(`${this.resourceUrl}/rating/${rating}`, { observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
