import { Vec2 } from "./vec2";

export class Cell {
        constructor(private coords: Vec2, character: string) { }
        checkConstraint(anotherT: Cell): boolean {
                console.log(this.coords.x);
                
                if (this.coords.x === anotherT.coords.x && this.coords.y === anotherT.coords.y) {
                        return true;
                } else if (this.coords.x === anotherT.coords.x && (this.coords.y === anotherT.coords.y - 1 ||
                        this.coords.y === anotherT.coords.y + 1)) {
                        return true;
                } else if (this.coords.y === anotherT.coords.y && (this.coords.x === anotherT.coords.x - 1 ||
                        this.coords.x === anotherT.coords.x + 1)) {
                        return true;
                }
                return false
        }

        checkCollsion(anotherCell: Cell): boolean {
                return this.coords.x === anotherCell.coords.x && this.coords.y === anotherCell.coords.y;
        }
        get coordinates() {
                return this.coords;
        }
}