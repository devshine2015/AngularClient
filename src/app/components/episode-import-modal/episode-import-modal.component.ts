import { Component, OnInit} from '@angular/core';
import {EpisodeService} from '../../services/episode.service';
import {DateToStringService} from '../../services/date-to-string.service';
import { DialogRef, ModalComponent } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

export class CustomModalContext extends BSModalContext {
  public importEpisode:any;
  public id:number;

}

@Component({
  selector: 'app-episode-import-modal',
  templateUrl: './episode-import-modal.component.html',
  styleUrls: ['./episode-import-modal.component.css']
})
export class EpisodeImportModalComponent implements OnInit, ModalComponent<CustomModalContext> {

  context: CustomModalContext;
  episodes: any;

  constructor(
    private dateString:DateToStringService,
    public dialog: DialogRef<CustomModalContext>,
    private episodeService:EpisodeService,
) {
    this.context = dialog.context; // this is the dialog reference
   }

   ngOnInit(){
     this.episodeService.getAllEpisodes(this.context.id).subscribe(data => {
       this.episodes = data;
     }, err => {
       console.log(err);
       return false;
     });
   }

   cancelButton(){
     this.dialog.close()
   }

   importEpisode(id){
     this.context.importEpisode = id
     this.episodeService.importEpisode(id)
     this.dialog.close()
   }

}
