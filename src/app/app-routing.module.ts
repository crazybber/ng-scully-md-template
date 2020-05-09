import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },

{ path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule { }
