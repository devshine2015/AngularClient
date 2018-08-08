import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {DropdownModule} from "ngx-dropdown";
import {Ng2PaginationModule} from 'ng2-pagination';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { FileSelectDirective } from 'ng2-file-upload';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';





import {AuthService} from './services/auth.service';
import {ValidateService} from './services/validate.service';
import {GetRolesService} from './services/get-roles.service';
import {DateToStringService} from './services/date-to-string.service';
import {ShowService} from './services/show.service';
import {UserService} from './services/user.service';
import {DateTimeService} from './services/date-time.service';
import {EpisodeService} from './services/episode.service';
import {NowPlayingService} from './services/now-playing.service';
import {PlaylistAndChartsService} from './services/playlist-and-charts.service';
import {StaticPagesService} from './services/static-pages.service';
import {AdService} from './services/ad.service';
import {CookieService} from './services/cookie.service';


import {AuthGuard} from './guards/auth.guard';
import {AdminGuard} from './guards/admin.guard';
import {AuthorGuard} from './guards/author.guard';
import {EditorGuard} from './guards/editor.guard';
import {ShowAdminGuard} from './guards/show-admin.guard';
import {DjGuard} from './guards/dj.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { RegisterUsersComponent } from './components/register-users/register-users.component';
import { DashboardNavbarComponent } from './components/dashboard-navbar/dashboard-navbar.component';
import { OrderByPipe } from './order-by.pipe';
import { NewArticleComponent } from './components/new-article/new-article.component';
import { MyDraftsComponent } from './components/my-drafts/my-drafts.component';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { ArticleReviewComponent } from './components/article-review/article-review.component';
import { ManagePublishedComponent } from './components/manage-published/manage-published.component';
import { ManageUnpublishedComponent } from './components/manage-unpublished/manage-unpublished.component';
import { ArticlePreviewComponent } from './components/article-preview/article-preview.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import {ReversePipe} from './reverse.pipe'
import { NewShowComponent } from './components/new-show/new-show.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ManageShowsComponent } from './components/manage-shows/manage-shows.component';
import { EditShowComponent } from './components/edit-show/edit-show.component';
import { ShowPageComponent } from './components/show-page/show-page.component';
import { MyShowsComponent } from './components/my-shows/my-shows.component';
import { ManageEpisodesComponent } from './components/manage-episodes/manage-episodes.component';
import { NewEpisodeComponent } from './components/new-episode/new-episode.component';
import { EditEpisodeComponent } from './components/edit-episode/edit-episode.component';
import { NowPlayingComponent } from './components/now-playing/now-playing.component';
import { NewPlaylistComponent } from './components/new-playlist/new-playlist.component';
import { NewChartComponent } from './components/new-chart/new-chart.component';
import { ShowsComponent } from './components/shows/shows.component';
import { ArchivedShowsComponent } from './components/archived-shows/archived-shows.component';
import { EpisodeComponent } from './components/episode/episode.component';
import { EpisodeImportModalComponent } from './components/episode-import-modal/episode-import-modal.component';
import { WeeklyCalendarComponent } from './components/weekly-calendar/weekly-calendar.component';
import { FrontPageChartsComponent } from './components/front-page-charts/front-page-charts.component';
import { Top30Component } from './components/top-30/top-30.component';
import { AdsComponent } from './components/ads/ads.component';
import { HipHopComponent } from './components/hip-hop/hip-hop.component';
import { HipHopAdsComponent } from './components/hip-hop-ads/hip-hop-ads.component';
import { RpmComponent } from './components/rpm/rpm.component';
import { RpmAdsComponent } from './components/rpm-ads/rpm-ads.component';
import { MetalComponent } from './components/metal/metal.component';
import { MetalAdsComponent } from './components/metal-ads/metal-ads.component';
import { WorldComponent } from './components/world/world.component';
import { WorldAdsComponent } from './components/world-ads/world-ads.component';
import { ChartComponent } from './components/chart/chart.component';
import { StaticPagesComponent } from './components/static-pages/static-pages.component';
import { NewStaticPageComponent } from './components/new-static-page/new-static-page.component';
import { EditStaticPageComponent } from './components/edit-static-page/edit-static-page.component';
import { StaticPagesPreviewComponent } from './components/static-pages-preview/static-pages-preview.component';
import { FooterComponent } from './components/footer/footer.component';
import { StaticPageComponent } from './components/static-page/static-page.component';
import { StaticPageReroutComponent } from './components/static-page-rerout/static-page-rerout.component';
import { NewAdComponent } from './components/new-ad/new-ad.component';
import { ManageAdsComponent } from './components/manage-ads/manage-ads.component';
import { EditAdsComponent } from './components/edit-ads/edit-ads.component';
import { ShowsForPlaylistComponent } from './components/shows-for-playlist/shows-for-playlist.component';
import { EpisodesForPlaylistComponent } from './components/episodes-for-playlist/episodes-for-playlist.component';
import { HomePageChartsComponent } from './components/home-page-charts/home-page-charts.component';
import { ArticleHighlightComponent } from './components/article-highlight/article-highlight.component';
import { UpcomingProgrammingComponent } from './components/upcoming-programming/upcoming-programming.component';
import { ComponentNameComponent } from './component-name/component-name.component';


const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'register-users', component: RegisterUsersComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'manage-users', component: ManageUsersComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'new-article', component: NewArticleComponent, canActivate: [AuthGuard, AuthorGuard]},
  {path: 'my-drafts', component: MyDraftsComponent, canActivate: [AuthGuard, AuthorGuard]},
  {path: 'articles/edit/:id', component: EditArticleComponent, canActivate: [AuthGuard]},
  {path: 'articles/review', component: ArticleReviewComponent, canActivate: [AuthGuard, EditorGuard]},
  {path: 'articles/manage-published', component: ManagePublishedComponent, canActivate: [AuthGuard, EditorGuard]},
  {path: 'articles/manage-unpublished', component: ManageUnpublishedComponent, canActivate: [AuthGuard, EditorGuard]},
  {path: 'articles/preview/:id', component: ArticlePreviewComponent, canActivate: [AuthGuard]},
  {path: 'calendar', component: CalendarComponent},
  {path: 'new-show', component: NewShowComponent, canActivate: [ShowAdminGuard, AuthGuard]},
  {path: 'manage-shows', component: ManageShowsComponent, canActivate: [ShowAdminGuard, AuthGuard]},
  {path: 'shows/edit/:id', component: EditShowComponent, canActivate: [AuthGuard, ShowAdminGuard]},
  {path: 'show/:id', component: ShowPageComponent},
  {path: 'my-shows', component: MyShowsComponent, canActivate: [AuthGuard, DjGuard]},
  {path: 'manage-episodes/:id', component: ManageEpisodesComponent, canActivate: [AuthGuard, DjGuard]},
  {path: 'new-episode/:id', component: NewEpisodeComponent, canActivate: [AuthGuard, DjGuard]},
  {path: 'edit-episode/:id', component: EditEpisodeComponent, canActivate: [AuthGuard, DjGuard]},
  {path: 'new-playlist', component: NewPlaylistComponent, canActivate: [AuthGuard, ShowAdminGuard]},
  {path: 'new-chart', component: NewChartComponent, canActivate: [AuthGuard, ShowAdminGuard]},
  {path: 'shows', component: ShowsComponent},
  {path: 'old-shows', component: ArchivedShowsComponent},
  {path: 'episode/:id', component: EpisodeComponent},
  {path: 'front-page-charts', component: FrontPageChartsComponent, canActivate: [AuthGuard, ShowAdminGuard]},
  {path: 'top-30', component: Top30Component, canActivate: [AuthGuard, ShowAdminGuard]},
  {path: 'ads', component: AdsComponent, canActivate: [AuthGuard, ShowAdminGuard]},
  {path: 'hip-hop', component: HipHopComponent, canActivate: [AuthGuard, ShowAdminGuard]},
  {path: 'hip-hop-ads', component: HipHopAdsComponent, canActivate: [AuthGuard, ShowAdminGuard]},
  {path: 'rpm', component: RpmComponent, canActivate: [AuthGuard, ShowAdminGuard]},
  {path: 'rpm-ads', component: RpmAdsComponent, canActivate: [AuthGuard, ShowAdminGuard]},
  {path: 'metal', component: MetalComponent, canActivate: [AuthGuard, ShowAdminGuard]},
  {path: 'metal-ads', component: MetalAdsComponent, canActivate: [AuthGuard, ShowAdminGuard]},
  {path: 'world', component: WorldComponent, canActivate: [AuthGuard, ShowAdminGuard]},
  {path: 'world-ads', component: WorldAdsComponent, canActivate: [AuthGuard, ShowAdminGuard]},
  {path: 'charts', component: ChartComponent},
  {path: 'static-page/:id', component: StaticPageComponent},
  {path: 'static-pages', component: StaticPagesComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'new-static-page', component: NewStaticPageComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'static-pages/edit/:id', component: EditStaticPageComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'static-pages/preview/:id', component: StaticPagesPreviewComponent, canActivate: [AuthGuard]},
  {path: 'static-page-rerout/:id', component: StaticPageReroutComponent},
  {path: 'new-ad', component: NewAdComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'manage-ads', component: ManageAdsComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'ads/edit/:id', component: EditAdsComponent, canActivate: [AuthGuard, AdminGuard]}


]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    ManageUsersComponent,
    RegisterUsersComponent,
    DashboardNavbarComponent,
    OrderByPipe,
    NewArticleComponent,
    MyDraftsComponent,
    EditArticleComponent,
    FileSelectDirective,
    ArticleReviewComponent,
    ManagePublishedComponent,
    ManageUnpublishedComponent,
    ArticlePreviewComponent,
    SafeHtmlPipe,
    ReversePipe,
    NewShowComponent,
    CalendarComponent,
    ManageShowsComponent,
    EditShowComponent,
    ShowPageComponent,
    MyShowsComponent,
    ManageEpisodesComponent,
    NewEpisodeComponent,
    EditEpisodeComponent,
    NowPlayingComponent,
    NewPlaylistComponent,
    NewChartComponent,
    ShowsComponent,
    ArchivedShowsComponent,
    EpisodeComponent,
    EpisodeImportModalComponent,
    WeeklyCalendarComponent,
    FrontPageChartsComponent,
    Top30Component,
    AdsComponent,
    HipHopComponent,
    HipHopAdsComponent,
    RpmComponent,
    RpmAdsComponent,
    MetalComponent,
    MetalAdsComponent,
    WorldComponent,
    WorldAdsComponent,
    ChartComponent,
    StaticPagesComponent,
    NewStaticPageComponent,
    EditStaticPageComponent,
    StaticPagesPreviewComponent,
    FooterComponent,
    StaticPageComponent,
    StaticPageReroutComponent,
    NewAdComponent,
    ManageAdsComponent,
    EditAdsComponent,
    ShowsForPlaylistComponent,
    EpisodesForPlaylistComponent,
    HomePageChartsComponent,
    ArticleHighlightComponent,
    UpcomingProgrammingComponent,
    ComponentNameComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
    NguiDatetimePickerModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    FlashMessagesModule,
    DropdownModule,
    Ng2PaginationModule,
    MultiselectDropdownModule,
    TagInputModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [
    AuthService,
    ShowService,
    PlaylistAndChartsService,
    NowPlayingService,
    EpisodeService,
    DateTimeService,
    UserService,
    ValidateService,
    GetRolesService,
    AuthGuard,
    DjGuard,
    AdminGuard,
    AuthorGuard,
    ShowAdminGuard,
    EditorGuard,
    DateToStringService,
    StaticPagesService,
    CookieService,
    AdService],

  bootstrap: [AppComponent],

 entryComponents: [ EpisodeImportModalComponent ]
})
export class AppModule { }
