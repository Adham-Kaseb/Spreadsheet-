import Papa, { type ParseResult } from "papaparse";
import type { SheetData, FetchError } from "../types";

export const DEFAULT_SPREADSHEET_ID =
  "1aGoZhXyPQjSHbR3VTsJDTzJ6QoIhGcvjvOzODDHGaCI";
export const DEFAULT_GID = "1651906944";

const extractUrlParts = (url: string) => {
  try {
    const idMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    const gidMatch = url.match(/[#&]gid=([0-9]+)/);

    return {
      id: idMatch ? idMatch[1] : DEFAULT_SPREADSHEET_ID,
      gid: gidMatch ? gidMatch[1] : DEFAULT_GID,
    };
  } catch {
    return { id: DEFAULT_SPREADSHEET_ID, gid: DEFAULT_GID };
  }
};

export const fetchSheetData = async (sheetUrl?: string): Promise<SheetData> => {
  let url = `https://docs.google.com/spreadsheets/d/${DEFAULT_SPREADSHEET_ID}/export?format=csv&gid=${DEFAULT_GID}`;

  if (sheetUrl) {
    const { id, gid } = extractUrlParts(sheetUrl);
    url = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`;
  }

  try {
    const response = await fetch(url);

    if (response.status === 401 || response.status === 403) {
      throw {
        message:
          'الوصول مقيد. يرجى التأكد من مشاركة الجدول كـ "أي شخص لديه الرابط يمكنه العرض".',
        status: response.status,
        isRestricted: true,
      } as FetchError;
    }

    if (!response.ok) {
      throw {
        message: `فشل جلب البيانات: ${response.statusText}`,
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
            lastUpdated: new Date().toLocaleString("ar-EG"),
          });
        },
        error: (error: Error) => {
          reject({
            message: `خطأ في تحليل البيانات: ${error.message}`,
            isRestricted: false,
          } as FetchError);
        },
      });
    });
  } catch (error: any) {
    if (error.message) throw error;
    throw {
      message: "خطأ في الشبكة. يرجى التحقق من اتصالك.",
      isRestricted: false,
    } as FetchError;
  }
};
