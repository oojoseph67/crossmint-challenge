import axios from "axios";
import { Position, ApiResponse, AstralObject } from "../types";

export class Polyanet implements AstralObject {
  private static readonly BASE_URL =
    "https://challenge.crossmint.io/api/polyanets";
  private readonly candidateId: string;

  constructor(candidateId: string) {
    this.candidateId = candidateId;
  }

  async create(position: Position): Promise<ApiResponse> {
    try {
      await axios.post(Polyanet.BASE_URL, {
        candidateId: this.candidateId,
        row: position.row,
        column: position.column,
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async delete(position: Position): Promise<ApiResponse> {
    try {
      await axios.delete(Polyanet.BASE_URL, {
        data: {
          candidateId: this.candidateId,
          row: position.row,
          column: position.column,
        },
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}
