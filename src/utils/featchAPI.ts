import { HOST } from '../settings/settings';
import { ErrorLoginEntity, LoginResponse, UserSettingsRequest } from 'types';

type FetchMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT' | undefined;

class FetchApi {
  private host: string;
  private ednpoint: string | null;
  private method: FetchMethod;
  private headers: Headers;
  private body: string | null;
  private settings: RequestInit | undefined;
  private token: string | null;

  constructor() {
    this.host = HOST;
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.body = null;
    this.ednpoint = null;
    this.token = null;
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

  private fetch = async <T>(): Promise<T | undefined> => {
    this.setHeaders();
    this.setSettings();

    const url = `${this.host}${this.ednpoint}`;
    const res = await fetch(url, this.settings);
    const contentType = res.headers.get("content-type");

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
    this.method = 'GET';
    this.ednpoint = endpoint;
    return await this.fetch<T>();
  };

  post = async <T>(endpoint: string, body: Object | null = null): Promise<T | undefined> => {
    this.method = 'POST';
    this.ednpoint = endpoint;
    this.body = (body) ? JSON.stringify(body) : null;
    return await this.fetch<T>();
  };

  delete = async (endpoint: string): Promise<void> => {
    this.method = 'DELETE';
    this.ednpoint = endpoint;
    await this.fetch();
  };

  put = async <T>(endpoint: string, body: Object | null = null ): Promise<T | undefined> => {
    this.method = 'PUT';
    this.ednpoint = endpoint;
    this.body = (body) ? JSON.stringify(body) : null;
    return await this.fetch<T>();
  };
}

export const fetchApi = new FetchApi();
