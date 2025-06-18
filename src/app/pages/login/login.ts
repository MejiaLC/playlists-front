import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

    login() {
      const token = btoa(`${this.username}:${this.password}`);
      const headers = new HttpHeaders({
        Authorization: `Basic ${token}`
      });

      this.http.get('http://localhost:8080/api/v1/playlist/list', { headers })
        .subscribe({
          next: () => {
            localStorage.setItem('auth', `Basic ${token}`);
            this.router.navigate(['/playlists']);
          },
          error: () => {
            this.error = 'Credenciales inválidas';
          }
      });
  }
}
