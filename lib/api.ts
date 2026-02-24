const BASE_URL = process.env.ZEE_API_URL ?? "http://localhost:8000";

export class ZeeApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly path: string
  ) {
    super(`ZEE API ${status} — ${path}`);
    this.name = "ZeeApiError";
  }
}

export async function fetchZee<T>(path: string, revalidate = 86400): Promise<T> {
  let res: Response;

  try {
    res = await fetch(`${BASE_URL}${path}`, { next: { revalidate } });
  } catch {
    // Network-level failure (DNS, connection refused, etc.)
    throw new ZeeApiError(0, path);
  }

  if (!res.ok) {
    throw new ZeeApiError(res.status, path);
  }

  return res.json() as Promise<T>;
}
