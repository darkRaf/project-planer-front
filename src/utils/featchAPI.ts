import { HOST } from '../settings/settings';
import { LoginResponse } from 'types';

type FetchMethod = 'GET' | 'POST' | 'DELETE' | 'UPDATE' | 'PUT' | undefined;

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
    this.headers.delete('athorization');
    if (this.token) this.headers.append('athorization', `Bearer ${this.token}`);
  };

  private setSettings = (): void => {
    this.settings = {
      method: this.method,
      headers: this.headers,
      credentials: 'include',
    };
    if (this.body) this.settings.body = this.body;
  };

  private fetch = async (): Promise<Object> => {
    this.setHeaders();
    this.setSettings();

    const url = `${this.host}${this.ednpoint}`;
    const res = await fetch(url, this.settings);
    const jsonData = await res.json();

    if (res.ok) {
      this.settings = undefined;
      this.body = null;

      return jsonData
    }
    
    throw new Error(jsonData.message);
  };

  refreshToken = async (): Promise<LoginResponse> => {
    return await this.get('/refresh-token') as LoginResponse;
  };

  setToken = (token: string): void => {
    this.token = token;
  };

  get = async (endpoint: string): Promise<Object> => {
    this.method = 'GET';
    this.ednpoint = endpoint;
    return await this.fetch();
  };

  post = async (endpoint: string, body: Object | null = null): Promise<Object> => {
    this.method = 'POST';
    this.ednpoint = endpoint;
    this.body = (body) ? JSON.stringify(body) : null;
    return await this.fetch();
  };

  delete = async (endpoint: string): Promise<Object> => {
    this.method = 'DELETE';
    this.ednpoint = endpoint;
    return await this.fetch();
  };

  update = async (endpoint: string, body = ''): Promise<Object> => {
    this.method = 'UPDATE';
    this.ednpoint = endpoint;
    this.body = (body) ? JSON.stringify(body) : null;
    return await this.fetch();
  };
}

export const fetchApi = new FetchApi();
