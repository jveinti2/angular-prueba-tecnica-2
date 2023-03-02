import { Component, HostBinding, OnInit } from '@angular/core';
// import {NgModel} from '@angular/forms'
import { Game } from 'src/app/models/Game';
import { GamesService } from '../../services/games.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css'],
})
export class GameFormComponent {
  @HostBinding('class') classes = 'row';

  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date(),
  };

  edit: boolean = false;

  constructor(
    private gamesService: GamesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      this.gamesService.getGame(id).subscribe(
        (res) => {
          console.log(res);
          this.game = res;
          this.edit = true;
        },
        (err) => console.log(err)
      );
    }
  }

  saveNewGame() {
    delete this.game.created_at;
    delete this.game.id;
    this.gamesService.saveGame(this.game).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/games']);
      },
      (err) => console.log(err)
    );
  }

  updateGame() {
    delete this.game.created_at;
    this.gamesService.updateGame(this.game.id!, this.game).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/games']);
      },
      (err) => console.log(err)
    );
  }
}
