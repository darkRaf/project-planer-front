import { HOST } from '../settings/settings';
import { ErrorLoginEntity, LoginResponse } from 'types';

type FetchMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT' | undefined;
type FetchTemp = {
  endpoint: string | null;
  settings: RequestInit | undefined;
}
class FetchApi {
  private host: string;
  private method: FetchMethod;
  private endpoint: string | null;
  private headers: Headers;
  private body: string | null;
  private settings: RequestInit | undefined;
  private token: string | null;
  private isRefresh: boolean;
  private temp: FetchTemp[];

  constructor() {
    this.host = HOST;
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.body = null;
    this.endpoint = null;
    this.token = null;
    this.isRefresh = false;
    this.temp = [];
  }

  private setHeaders = (): void => {
    this.headers.delete('authorization');
    if (this.token) this.headers.append('authorization', `Bearer ${this.token}`);
  };

  private setSettings = (): void => {
    this.settings = {
      method: this.method,
      headers: this.headers,
      credentials: 'include',
    };
    if (this.body) this.settings.body = this.body;
  };

  private addToTemp = () => {
    const fetchData = {
      endpoint: JSON.parse(JSON.stringify(this.endpoint)),
      settings: JSON.parse(JSON.stringify(this.settings)),
    } as FetchTemp;

    this.temp.push(fetchData);
  }

  private fetch = async <T>(): Promise<T | undefined> => {
    this.setHeaders();
    this.setSettings();

    const url = `${this.host}${this.endpoint}`;
    const res = await fetch(url, this.settings);
    const contentType = res.headers.get("content-type");

    if ([401, 403].includes(res.status) && !this.isRefresh) {
      this.isRefresh = true;
      this.addToTemp();

      const { accessToken } = await this.refreshToken();
      if (!accessToken) throw new Error('Dostęp zabroniony.');

      this.setToken(accessToken);

      for (const t of this.temp) {
        this.endpoint = t.endpoint;
        this.method = t.settings?.method as FetchMethod;
        this.body = t.settings?.body as string | null;
        this.isRefresh = false;

        const index = this.temp.indexOf(t);
        this.temp.splice(index, 1);

        return await this.fetch<T>();
      }
    }

    if (res.ok) {
      this.settings = undefined;
      this.body = null;

      if (contentType && contentType.indexOf("application/json") !== -1) {
        return await res.json();
      }
    }

    if (contentType && contentType.indexOf("application/json") !== -1) {
      const jsonData = await res.json();

      if (Array.isArray(jsonData.message)) {
        throw new Error((jsonData.message as ErrorLoginEntity[]).map((err) => err.message).join('\n'));
      } else {
        throw new Error(jsonData.message);
      }
    }
  };

  refreshToken = async (): Promise<LoginResponse> => {
    return await this.get('/refresh-token') as LoginResponse;
  };

  setToken = (token: string): void => {
    this.token = token;
  };

  get = async <T>(endpoint: string): Promise<T | undefined> => {
    this.body = null;
    this.method = 'GET';
    this.endpoint = endpoint;
    return await this.fetch<T>();
  };

  post = async <T>(endpoint: string, body: Object | null = null): Promise<T | undefined> => {
    this.method = 'POST';
    this.endpoint = endpoint;
    this.body = (body) ? JSON.stringify(body) : null;
    return await this.fetch<T>();
  };

  delete = async <T>(endpoint: string): Promise<T | undefined> => {
    this.method = 'DELETE';
    this.endpoint = endpoint;
    return await this.fetch<T>();
  };

  put = async <T>(endpoint: string, body: Object | null = null): Promise<T | undefined> => {
    this.method = 'PUT';
    this.endpoint = endpoint;
    this.body = (body) ? JSON.stringify(body) : null;
    return await this.fetch<T>();
  };
}

export const fetchApi = new FetchApi();
