import { fetchApi } from './featchAPI'

class WeatherApi {
  private latitude: number;
  private longitude: number;
  private temp: number;
  private city: string;
  private imgNum: number;
  private description: string;
  private isDay: boolean;

  constructor() {
    this.latitude = 52.2298;
    this.longitude = 21.0118;
    this.temp = 0;
    this.city = '';
    this.imgNum = 800;
    this.description = '';
    this.isDay = true;

    this.getGeo();
  }

  getGeo = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showLocation, this.errorHandler);
    }
  }

  showLocation = (e: GeolocationPosition): void => {
    this.latitude = e.coords.latitude;
    this.longitude = e.coords.longitude;
    this.getWeather();
  }

  errorHandler = (err: GeolocationPositionError): void => {
    throw new Error('Błąd pobierania geolokalizcji.');
  }

  getWeather = async (): Promise<void> => {
    const data = await fetchApi.get(`/weather/${this.latitude}/${this.longitude}`) as any;
    const status = Object.assign({}, ...data.weather);

    this.temp = data.main.temp;
    this.city = data.name;
    this.imgNum = status.id;
    this.description = status.description;
  }

  checkIsDay = (): void => {
    const now = new Date();
    const h = now.getHours();
    this.isDay = (h > 6 && h < 19);
  }

  getTemp = (): string => this.temp.toFixed(1);
  getCity = (): string => this.city;
  getDescription = (): string => this.description;

  getImgName = (): string => {
    this.checkIsDay();

    if (this.imgNum >= 200 && this.imgNum <= 232) return 'thunderstorm.svg';
    if (this.imgNum >= 300 && this.imgNum <= 321) return 'drizzle.svg';
    if (this.imgNum >= 500 && this.imgNum <= 531) return 'rain.svg';
    if (this.imgNum >= 600 && this.imgNum <= 622) return 'snow.svg';
    if (this.imgNum >= 701 && this.imgNum <= 781) return 'fog.svg';
    if (this.imgNum === 800 && this.isDay) return 'sun.svg';
    if (this.imgNum === 800 && !this.isDay) return 'moon.svg';
    if (this.imgNum >= 801 && this.imgNum <= 804) return 'cloud.svg';

    return 'question.svg';
  }
}

export const weatherApi = new WeatherApi()