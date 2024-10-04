import { Polyanet } from "./polyanet";
import { Position } from "./types";

export class Megaverse {
  private readonly polyanet: Polyanet;
  private readonly size: number;
  private readonly positions: Position[];

  constructor(candidateId: string, size: number) {
    this.polyanet = new Polyanet(candidateId);
    this.size = size;
    this.positions = [
      { row: 2, column: 2 },
      { row: 2, column: 8 },
      { row: 3, column: 3 },
      { row: 3, column: 7 },
      { row: 4, column: 4 },
      { row: 4, column: 6 },
      { row: 5, column: 5 },
      { row: 6, column: 4 },
      { row: 6, column: 6 },
      { row: 7, column: 3 },
      { row: 7, column: 7 },
      { row: 8, column: 2 },
      { row: 8, column: 8 },
    ];
  }

  async createXShape(): Promise<void> {
    for (const position of this.positions) {
      const result = await this.polyanet.create(position);
      if (result.success) {
        console.log(
          `Created Polyanet at row ${position.row}, column ${position.column}`
        );
      } else {
        console.error(
          `Failed to create Polyanet at row ${position.row}, column ${position.column}: ${result.error}`
        );
      }
    }
  }

  async deleteAllPolyanets(): Promise<void> {
    for (let row = 0; row < this.size; row++) {
      for (let column = 0; column < this.size; column++) {
        const result = await this.polyanet.delete({ row, column });
        if (result.success) {
          console.log(`Deleted Polyanet at row ${row}, column ${column}`);
        } else {
          console.error(
            `Failed to delete Polyanet at row ${row}, column ${column}: ${result.error}`
          );
        }
      }
    }
  }
}

// import { Polyanet } from "./polyanet";
// import { Position } from "./types";

// export class Megaverse {
//   private readonly polyanet: Polyanet;
//   private readonly size: number;

//   constructor(candidateId: string, size: number) {
//     this.polyanet = new Polyanet(candidateId);
//     this.size = size;
//   }

//   private isXPosition(row: number, col: number): boolean {
//     return row === col || row === this.size - col - 1;
//   }

//   async createXShape(): Promise<void> {
//     const positions: Position[] = [];

//     for (let row = 0; row < this.size; row++) {
//       for (let col = 0; col < this.size; col++) {
//         if (this.isXPosition(row, col)) {
//           positions.push({ row, column: col });
//         }
//       }
//     }

//     for (const position of positions) {
//       const result = await this.polyanet.create(position);
//     //   console.log({ result });
//       if (!result.success) {
//         console.error(
//           `Failed to create Polyanet at (${position.row}, ${position.column}): ${result.error}`
//         );
//       }
//     }
//   }
// }
