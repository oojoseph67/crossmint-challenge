import axios from "axios";
import { Position, ApiResponse } from "./types";

export class Polyanet {
  private static readonly BASE_URL = "https://challenge.crossmint.io/api";
  private readonly candidateId: string;

  constructor(candidateId: string) {
    this.candidateId = candidateId;
  }

  async create(position: Position): Promise<ApiResponse> {
    try {
      await axios.post(`${Polyanet.BASE_URL}/polyanets`, {
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
      await axios.delete(`${Polyanet.BASE_URL}/polyanets`, {
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
