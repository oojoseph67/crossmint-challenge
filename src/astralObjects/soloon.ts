import axios from "axios";
import { Position, ApiResponse, SoloonColor, AstralObject } from "../types";

export class Soloon implements AstralObject {
  private static readonly BASE_URL =
    "https://challenge.crossmint.io/api/soloons";
  private readonly candidateId: string;
  private readonly color: SoloonColor;

  constructor(candidateId: string, color: SoloonColor) {
    this.candidateId = candidateId;
    this.color = color;
  }

  async create(position: Position): Promise<ApiResponse> {
    try {
      await axios.post(Soloon.BASE_URL, {
        candidateId: this.candidateId,
        row: position.row,
        column: position.column,
        color: this.color,
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async delete(position: Position): Promise<ApiResponse> {
    try {
      await axios.delete(Soloon.BASE_URL, {
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
