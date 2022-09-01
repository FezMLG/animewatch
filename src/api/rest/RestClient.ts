import axios from "axios";

export class RestClient {
  constructor(private baseUrl: string) {}

  async get<T>(): Promise<T> {
    const { data, status } = await axios.get<T>(this.baseUrl, {
      headers: {
        Accept: "application/json",
      },
    });
    return data;
  }
}
