import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Playlist, Songs } from '../interfaces/PlayListInterface';

@Component({
  standalone: true,
  selector: 'app-playlists',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './playlists.html',
  styleUrl: './playlists.css'
})
export class Playlists {
  playlists: Playlist[] = [];
  nombre = '';
  descripcion = '';
  canciones: Songs[] = [];

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('auth');

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.cargarPlaylists();
  }

  cargarPlaylists() {
    this.http.get<any[]>('http://localhost:8080/api/v1/playlist/list')
        .subscribe({
          next: data => this.playlists = data,
          error: () => this.router.navigate(['/login'])
    });
  }

  crearPlaylist() {
    const playlist = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      canciones: this.canciones // puedes dejarlo vacío por ahora
    };

    if(this?.canciones?.length <= 0) {
      alert("Agrega almenos una cancion para la playlist");
      return;
    }
    
    const invalidFields = this.canciones.some(c => !c.titulo.trim() || !c.artista.trim());

    if (invalidFields) {
      alert('Cada canción debe tener un título y un artista.');
      return;
    }

    this.http.post<any>('http://localhost:8080/api/v1/playlist/create', playlist)
      .subscribe({
        next: (newPlaylist) => {
          this.playlists.push(newPlaylist);
          this.nombre = '';
          this.descripcion = '';
          this.canciones = [];
        },
        error: (err) => {
          console.error('Error al crear playlist', err);
          alert('No se pudo crear la playlist.');
      }
    });   
  };

  agregarCancion() {
    this.canciones.push({
      titulo: '',
      artista: '',
      album: '',
      anno: '',
      genero: ''
    });
  }

  eliminarCancion(index: number) {
    this.canciones.splice(index, 1);
  }
}

