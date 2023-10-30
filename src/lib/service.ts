
export const Fetch = {
  request: async (
    method: string,
    url: string,
    params?: Record<string, any>,
    headers: Record<string, string> = {}
  ) => {
    let options: any = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    let requestUrl = url;
    if (method.toUpperCase() === "GET") {
      requestUrl += `?${new URLSearchParams(params).toString()}`;
    } else {
      options = { ...options, body: JSON.stringify(params) };
    }

    // console.log(options);
    return await fetch(requestUrl, options);
  },
};

export class ServiceError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const Service = {
  // 내부 API호출의 경우 정해진 결과포맷을 활용
  // { success: true/false } 항목을 필수로 갖는다고 가정
  GET: async (endpoint: string, params: Record<string, any> ) => {
    const res = await Fetch.request("GET", endpoint, params);
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      // throw new Error(data.message);
      throw new ServiceError(res.status, data.message);
    }
  },
  POST: async (endpoint: string, body?: Record<string, any>) => {
    const res = await Fetch.request("POST", endpoint, body);
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      // throw new Error(data.message);
      throw new ServiceError(res.status, data.message);
    }
  },
  PUT: async (endpoint: string, body?: Record<string, any>) => {
    const res = await Fetch.request("PUT", endpoint, body);
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      // throw new Error(data.message);
      throw new ServiceError(res.status, data.message);
    }
  },
  DELETE: async (endpoint: string, body?: Record<string, any>) => {
    const res = await Fetch.request("DELETE", endpoint, body);
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      // throw new Error(data.message);
      throw new ServiceError(res.status, data.message);
    }
  },

  getCards: async (page: number, limit: number) => {
    console.log('page', page)
    return await Service.GET(`/api/card`, {
      page, limit
    });
  },
};
