export interface Songs {
  titulo: string,
  artista: string,
  album: string,
  anno: string,
  genero: string
}

export interface Playlist {
  nombre?: string,
  descripcion?: string,
  canciones?: Songs[]
}