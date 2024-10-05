export interface Position {
  row: number;
  column: number;
}

export interface ApiResponse {
  success: boolean;
  error?: string;
}

export type SoloonColor = "blue" | "red" | "purple" | "white";
export type ComethDirection = "up" | "down" | "right" | "left";

export interface AstralObject {
  create(position: Position): Promise<ApiResponse>;
  delete(position: Position): Promise<ApiResponse>;
}

export type Cell =
  | "SPACE"
  | "POLYANET"
  | `SOLOON_${SoloonColor}`
  | `COMETH_${ComethDirection}`
  | "BLUE_SOLOON"
  | "RED_SOLOON"
  | "PURPLE_SOLOON"
  | "WHITE_SOLOON"
  | "UP_COMETH"
  | "DOWN_COMETH"
  | "RIGHT_COMETH"
  | "LEFT_COMETH";

export interface GoalData {
  goal: Cell[][];
}
