import axios from "axios";
import { Position, SoloonColor, ComethDirection, Cell } from "./types";

export class MegaverseV2 {
  private readonly candidateId: string;
  private readonly goal: Cell[][];
  private readonly maxRetries: number = 5;
  private readonly retryDelay: number = 1000; // 1 second

  constructor(candidateId: string, goal: Cell[][]) {
    this.candidateId = candidateId;
    this.goal = goal;
  }

  async createMegaverse(): Promise<void> {
    for (let row = 0; row < this.goal.length; row++) {
      for (let col = 0; col < this.goal[row].length; col++) {
        await this.processColumnWithRetry(row, col);
      }
    }
    console.log("Megaverse creation completed.");
  }

  private async processColumnWithRetry(
    row: number,
    col: number
  ): Promise<void> {
    let retries = 0;
    while (retries < this.maxRetries) {
      try {
        await this.processCell(row, col);
        return; // Success, exit the retry loop
      } catch (error: any) {
        console.error(
          `Error processing cell at row ${row}, column ${col}: ${error.message}`
        );
        retries++;
        if (retries < this.maxRetries) {
          console.log(
            `Retrying in ${this.retryDelay / 1000} seconds... (Attempt ${
              retries + 1
            }/${this.maxRetries})`
          );
          await this.delay(this.retryDelay);
        } else {
          console.error(
            `Max retries reached for cell at row ${row}, column ${col}. Moving to next cell.`
          );
        }
      }
    }
  }

  private async processCell(row: number, col: number): Promise<void> {
    const currentCell = this.goal[row][col];
    const position: Position = { row, column: col };

    console.log(`Processing cell at row: ${row}, column: ${col}`);

    if (currentCell === "POLYANET") {
      await this.createPolyanet(position);
    } else if (currentCell.endsWith("_SOLOON")) {
      const color = currentCell.split("_")[0].toLowerCase() as SoloonColor;
      await this.createSoloon(position, color);
    } else if (currentCell.endsWith("_COMETH")) {
      const direction = currentCell
        .split("_")[0]
        .toLowerCase() as ComethDirection;
      await this.createCometh(position, direction);
    } else {
      console.log(`Skipping cell at row: ${row}, column: ${col}`);
    }
  }

  private async createPolyanet(position: Position): Promise<void> {
    await axios.post("https://challenge.crossmint.io/api/polyanets", {
      candidateId: this.candidateId,
      row: position.row,
      column: position.column,
    });
    console.log(
      `Created Polyanet at row ${position.row}, column ${position.column}`
    );
  }

  private async createSoloon(
    position: Position,
    color: SoloonColor
  ): Promise<void> {
    await axios.post("https://challenge.crossmint.io/api/soloons", {
      candidateId: this.candidateId,
      row: position.row,
      column: position.column,
      color: color,
    });
    console.log(
      `Created ${color} Soloon at row ${position.row}, column ${position.column}`
    );
  }

  private async createCometh(
    position: Position,
    direction: ComethDirection
  ): Promise<void> {
    await axios.post("https://challenge.crossmint.io/api/comeths", {
      candidateId: this.candidateId,
      row: position.row,
      column: position.column,
      direction: direction,
    });
    console.log(
      `Created ${direction} Cometh at row ${position.row}, column ${position.column}`
    );
  }

  async deleteMegaverse(): Promise<void> {
    for (let row = 0; row < this.goal.length; row++) {
      for (let col = 0; col < this.goal[row].length; col++) {
        await this.deleteColumnWithRetry(row, col);
      }
    }
    console.log("Megaverse deletion completed.");
  }

  private async deleteColumnWithRetry(row: number, col: number): Promise<void> {
    let retries = 0;
    while (retries < this.maxRetries) {
      try {
        await this.deleteCell(row, col);
        return; // Success, exit the retry loop
      } catch (error: any) {
        console.error(
          `Error deleting cell at row ${row}, column ${col}: ${error.message}`
        );
        retries++;
        if (retries < this.maxRetries) {
          console.log(
            `Retrying in ${this.retryDelay / 1000} seconds... (Attempt ${
              retries + 1
            }/${this.maxRetries})`
          );
          await this.delay(this.retryDelay);
        } else {
          console.error(
            `Max retries reached for deleting cell at row ${row}, column ${col}. Moving to next cell.`
          );
        }
      }
    }
  }

  private async deleteCell(row: number, col: number): Promise<void> {
    const position: Position = { row, column: col };

    await this.deletePolyanet(position);
    await this.deleteSoloon(position);
    await this.deleteCometh(position);
  }

  private async deletePolyanet(position: Position): Promise<void> {
    await axios.delete("https://challenge.crossmint.io/api/polyanets", {
      data: {
        candidateId: this.candidateId,
        row: position.row,
        column: position.column,
      },
    });
    console.log(
      `Deleted Polyanet at row ${position.row}, column ${position.column}`
    );
  }

  private async deleteSoloon(position: Position): Promise<void> {
    await axios.delete("https://challenge.crossmint.io/api/soloons", {
      data: {
        candidateId: this.candidateId,
        row: position.row,
        column: position.column,
      },
    });
    console.log(
      `Deleted Soloon at row ${position.row}, column ${position.column}`
    );
  }

  private async deleteCometh(position: Position): Promise<void> {
    await axios.delete("https://challenge.crossmint.io/api/comeths", {
      data: {
        candidateId: this.candidateId,
        row: position.row,
        column: position.column,
      },
    });
    console.log(
      `Deleted Cometh at row ${position.row}, column ${position.column}`
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
