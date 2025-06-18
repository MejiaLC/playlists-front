import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Playlists } from './pages/playlists/playlists';
import { authGuard } from './auth.guard';
import { PlaylistDetail } from './pages/playlist_details/playlist-detail';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: "playlists", component: Playlists, canActivate: [authGuard]},
    { path: 'playlists/:nombre', component: PlaylistDetail, canActivate: [authGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
