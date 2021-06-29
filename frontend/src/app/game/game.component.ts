import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model'
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.printBaard();
    this.getUserName()
  }
  submitted: boolean = false;
  items = [];
  scores = [];
  count: number = 0;
  total: number = 0;
  score: number = 0;
  turn: number = 0;
  numTresure: number = 1;
  success: boolean = false;
  name: string;
  printBaard() {
    for (let i = 1; i < 26; i++) {
      let random: any = Math.floor(Math.random() * 3) + 1;
      if (random === 1 && this.numTresure < 4) {
        this.numTresure += 1;
        const treasure = "T";
        random = treasure;
      }
      this.items.push(random);
    };
  }

  show(event) {
    this.count += 1;
    if (this.count < 4) {
      if (event.target.children[0].innerText === "T") {
        event.target.classList.add("yellow");
        this.score += 1;
        if (this.score === 3) {
          this.success = true;
          event.target.children[0].classList.remove("d-none");
          event.target.setAttribute("disabled", "");
          document.querySelector(".board").innerHTML +=
            `<button class="btn p-0"></button>`;
        }
      }
      event.target.children[0].classList.remove("d-none");
      event.target.setAttribute("disabled", "");

      if (this.count === 3) {
        this.count = 0;
        this.count += 1;
        this.scores.push(this.count)
        console.log("NEW COUNT", this.count);
      }
    }
  }
  userModel = new User("")

  onSubmit() {
    this.submitted = true;
    this.userService.postPlayerName(this.userModel).subscribe(
      data => console.log("Success", data),
      error => console.log("Error", error),
    )
  }

  getUserName() {
    this.userService.getPlayerName().subscribe((res) => {
      this.userService.users = res;
    });
  }
}