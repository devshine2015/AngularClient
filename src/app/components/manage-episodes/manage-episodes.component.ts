import { Component, OnInit } from '@angular/core';
import {ShowService} from '../../services/show.service';
import {AuthService} from '../../services/auth.service';
import {EpisodeService} from '../../services/episode.service';
import {DateToStringService} from '../../services/date-to-string.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-manage-episodes',
  templateUrl: './manage-episodes.component.html',
  styleUrls: ['./manage-episodes.component.css']
})
export class ManageEpisodesComponent implements OnInit {

  pastEpisodes:any;
  upcomingEpisodes:any;
  showId:number;
  show:any;

  constructor(
    private dateString:DateToStringService,
    private authService:AuthService,
    private showService:ShowService,
    private flashMessage:FlashMessagesService,
    private episodeService:EpisodeService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {

    this.showId = this.route.snapshot.params['id'];

    this.showService.getShowById(this.showId).subscribe(data => {
      this.show = data
    },
    err => {
      console.log(err)
      return false
    });

    this.episodeService.getUpcoming(this.showId).subscribe(data => {
      this.upcomingEpisodes = data
    },
    err => {
      console.log(err)
      return false
    });

    this.episodeService.getPast(this.showId).subscribe(data => {
      this.pastEpisodes = data
    },
    err => {
      console.log(err)
      return false
    });

  }

  newEpisode(){
    this.router.navigate(['new-episode', this.showId])
  }

  deleteEpisode(episode, status){
    this.episodeService.deleteEpisode(episode._id).subscribe(data => {
      if (data.success){
        this.flashMessage.show('Episode and associated tracks have been deleted', {cssClass: 'alert-success', timeout: 5000})
        if (status === 'upcoming') {
          this.upcomingEpisodes = this.upcomingEpisodes.filter(h => h !== episode);
        } else if (status === 'past') {
          this.pastEpisodes = this.pastEpisodes.filter(h => h !== episode);
        }
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 5000});
        return false
      }
    })
  }

}
