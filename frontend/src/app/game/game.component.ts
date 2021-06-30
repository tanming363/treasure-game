import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) { }
  users: any[] = [];
  submitted: boolean = false;
  boardBoxes = [];
  count: number = 0;
  score: number = 0;
  numTresure: number = 1;
  success: boolean = false;
  start: boolean = false;
  userForm = new FormGroup({
    name: new FormControl('', Validators.nullValidator && Validators.required),
  });

  ngOnInit() {
    this.printBaard();
    this.getAllUsers();
  }

  // BOARD GENEARATION
  printBaard() {
    for (let i = 1; i < 26; i++) {
      let random: any = Math.floor(Math.random() * 3) + 1;
      if (random === 1 && this.numTresure < 4) {
        this.numTresure += 1;
        const treasure = "T";
        random = treasure;
      }
      this.boardBoxes.push(random);
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
        console.log("NEW COUNT", this.count / 3);
        this.users.push(this.count)
        this.count = 0;
      }
    }
  }

  destroy$: Subject<boolean> = new Subject<boolean>();

  onSubmit() {
    this.userService.addUser(this.userForm.value).pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.userForm.reset();
      });
    this.start = true;
    this.getAllUsers();
  }
  getAllUsers() {
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any[]) => {
        this.users = users;
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}