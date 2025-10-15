import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../env/enviroment';

export interface NewsItem {
  id?: number | string;
  title?: string;
  content?: string;
  date?: string;
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews(): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(`${environment.apiUrl}/news`).pipe(
      map(items => this.sortByNewest(items))
    );
  }

  private sortByNewest(items: NewsItem[]): NewsItem[] {
    const getTime = (n: NewsItem) =>
      new Date(n.date || 0).getTime();
    return [...items].sort((a, b) => getTime(b) - getTime(a));
  }
}
