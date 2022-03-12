import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MintSectionComponent } from './components/mint-section/mint-section.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'gallery', component: GalleryComponent },
  {
    path: 'cartel-terms-and-conditions',
    component: TermsAndConditionComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
