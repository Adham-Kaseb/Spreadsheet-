export interface SheetData {
  headers: string[];
  rows: Record<string, any>[];
  lastUpdated: string;
}

export interface FetchError {
  message: string;
  status?: number;
  isRestricted: boolean;
}

export interface AppState {
  data: SheetData | null;
  isLoading: boolean;
  error: FetchError | null;
}
