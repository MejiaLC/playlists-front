import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Playlist } from '../interfaces/PlayListInterface';

@Component({
  standalone: true,
  selector: 'app-playlist-detail',
  imports: [CommonModule],
  templateUrl: './playlist-detail.html',
  styleUrl: './playlist-detail.css'
})
export class PlaylistDetail {
  playlist: Playlist = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    const nombre = this.route.snapshot.paramMap.get('nombre') ?? "";

    if (!nombre) {
      this.router.navigate(['/playlists']);
      return;
    }
    
    if (nombre) {
      this.http.get(`http://localhost:8080/api/v1/playlist/${encodeURIComponent(nombre)}`)
        .subscribe({
          next: data => this.playlist = data,
          error: () => this.router.navigate(['/playlists'])
        });
    }
  }

  eliminarPlaylist(nombre: string) {
    this.http.delete(`http://localhost:8080/api/v1/playlist/${encodeURIComponent(nombre)}`)
      .subscribe({
        next: () => {
          alert('Playlist eliminada.');
          this.router.navigate(['/playlists']);
        },
        error: () => alert('No se pudo eliminar la playlist.')
      });
  }
}
