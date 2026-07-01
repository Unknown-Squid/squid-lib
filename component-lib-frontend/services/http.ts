export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type JsonInit = Omit<RequestInit, "body"> & {
  body?: unknown;
};

const defaultHeaders: HeadersInit = {
  Accept: "application/json",
};

/**
 * Thin fetch wrapper — centralize base URL, auth headers, and errors here.
 */
export async function jsonRequest<T>(
  path: string,
  method: HttpMethod,
  init: JsonInit = {},
): Promise<T> {
  const { body, headers, ...rest } = init;
  const res = await fetch(path, {
    ...rest,
    method,
    headers: {
      ...defaultHeaders,
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as T;
}
