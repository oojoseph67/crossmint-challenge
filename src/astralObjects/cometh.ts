import axios from "axios";
import { Position, ApiResponse, ComethDirection, AstralObject } from "../types";

export class Cometh implements AstralObject {
  private static readonly BASE_URL =
    "https://challenge.crossmint.io/api/comeths";
  private readonly candidateId: string;
  private readonly direction: ComethDirection;

  constructor(candidateId: string, direction: ComethDirection) {
    this.candidateId = candidateId;
    this.direction = direction;
  }

  async create(position: Position): Promise<ApiResponse> {
    try {
      await axios.post(Cometh.BASE_URL, {
        candidateId: this.candidateId,
        row: position.row,
        column: position.column,
        direction: this.direction,
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async delete(position: Position): Promise<ApiResponse> {
    try {
      await axios.delete(Cometh.BASE_URL, {
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
