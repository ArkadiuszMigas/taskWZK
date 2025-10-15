import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { NewsItem, NewsService } from '../../services/news.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  loadingNews = false;
  error: string | null = null;
  news: NewsItem[] = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private newsService: NewsService
  ) {}

  fetchNews(): void {
    this.error = null;

    this.newsService.getNews().subscribe({
      next: (items) => {
        this.news = items;
        console.log('Fetched news items:', items);
      },
      error: (err) => {
        console.error('[news] error', err);
        this.error = err?.error?.message || 'Nie udało się pobrać newsów.';
      },
    });
  }

  ngOnInit(): void {
    if (!this.loginService.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    } else {
      this.loadingNews = true;
      const promise = new Promise<boolean>((resolve) => {
        this.loginService.fetchCurrentUser().subscribe({
          next: (user) => console.log('Current user:', user),
          error: (err) => console.error('Failed to load user', err),
        });
        this.fetchNews();
        resolve(false);
      });

      promise.then(() => {
        setTimeout(() => {
          this.loadingNews = false;
          console.log('User data fetch attempt finished.');
        }, 500);
      });
    }
  }
}
