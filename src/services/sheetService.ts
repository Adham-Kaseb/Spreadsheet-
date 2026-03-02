import Papa, { type ParseResult } from "papaparse";
import type { SheetData, FetchError } from "../types";

const SPREADSHEET_ID = "1aGoZhXyPQjSHbR3VTsJDTzJ6QoIhGcvjvOzODDHGaCI";
const GID = "1651906944";
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${GID}`;

export const fetchSheetData = async (): Promise<SheetData> => {
  try {
    const response = await fetch(CSV_URL);

    if (response.status === 401 || response.status === 403) {
      throw {
        message:
          'Access Restricted. Please make sure the Google Sheet is shared with "Anyone with the link can view".',
        status: response.status,
        isRestricted: true,
      } as FetchError;
    }

    if (!response.ok) {
      throw {
        message: `Failed to fetch data: ${response.statusText}`,
        status: response.status,
        isRestricted: false,
      } as FetchError;
    }

    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results: ParseResult<any>) => {
          resolve({
            headers: results.meta.fields || [],
            rows: results.data as Record<string, any>[],
            lastUpdated: new Date().toLocaleString(),
          });
        },
        error: (error: Error) => {
          reject({
            message: `Parsing Error: ${error.message}`,
            isRestricted: false,
          } as FetchError);
        },
      });
    });
  } catch (error) {
    if ((error as FetchError).message) {
      throw error;
    }
    throw {
      message: "Network Error. Please check your connection.",
      isRestricted: false,
    } as FetchError;
  }
};
