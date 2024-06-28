import { Routes } from '@angular/router';
import { PostAddComponent} from './components/post-add/post-add.component';
import { PostListComponent } from './components/post-list/post-list.component';



export const routes: Routes = [
    {path: 'post-list', component: PostListComponent},
    {path: 'post-add', component: PostAddComponent},
    {path: '**', component: PostAddComponent},
    { path: '', redirectTo: '/post-add', pathMatch: 'full' }, 
];
