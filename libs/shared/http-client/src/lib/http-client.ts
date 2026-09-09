type RequestOptions = Omit<RequestInit, "body" | "method">;

export class HttpError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

function getErrorMessage(body: unknown) {
  if (
    typeof body === "object" &&
    body !== null &&
    "message" in body &&
    typeof body.message === "string"
  ) {
    return body.message;
  }

  return "انجام درخواست با خطا مواجه شد";
}

async function readBody(response: Response) {
  if (response.status === 204) return undefined;

  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    const text = await response.text();
    return text || undefined;
  }

  try {
    return await response.json();
  } catch {
    throw new HttpError("پاسخ سرویس معتبر نیست", response.status, undefined);
  }
}

async function request<T>(url: string, init: RequestInit) {
  const response = await fetch(url, init);
  const body = await readBody(response);

  if (!response.ok) {
    throw new HttpError(getErrorMessage(body), response.status, body);
  }

  return body as T;
}

function requestWithJsonBody<TResponse, TBody>(
  method: "POST" | "PUT" | "PATCH",
  url: string,
  body: TBody,
  options: RequestOptions = {},
) {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  return request<TResponse>(url, {
    ...options,
    method,
    headers,
    body: JSON.stringify(body),
  });
}

export const httpClient = {
  get<T>(url: string, options: RequestOptions = {}) {
    return request<T>(url, { ...options, method: "GET" });
  },
  post<TResponse, TBody>(url: string, body: TBody, options: RequestOptions = {}) {
    return requestWithJsonBody<TResponse, TBody>("POST", url, body, options);
  },
  put<TResponse, TBody>(url: string, body: TBody, options: RequestOptions = {}) {
    return requestWithJsonBody<TResponse, TBody>("PUT", url, body, options);
  },
  patch<TResponse, TBody>(url: string, body: TBody, options: RequestOptions = {}) {
    return requestWithJsonBody<TResponse, TBody>("PATCH", url, body, options);
  },
  delete<T>(url: string, options: RequestOptions = {}) {
    return request<T>(url, { ...options, method: "DELETE" });
  },
};
