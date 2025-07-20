export function getErrorMessage(error: unknown): string {
  if (!error) return "Unknown error";

  if ("status" in (error as any)) {
    const fetchError = error as any;
    if (typeof fetchError.data === "string") return fetchError.data;
    if (fetchError.data && typeof fetchError.data === "object" && "message" in fetchError.data) {
      return fetchError.data.message;
    }
    return `Error status: ${fetchError.status}`;
  }

  if ("message" in (error as any)) {
    return (error as any).message;
  }

  return JSON.stringify(error);
}
