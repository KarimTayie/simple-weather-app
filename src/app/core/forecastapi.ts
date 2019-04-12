export interface Forecastapi {
  city: {id: number, name: string, coord: {lon: number, lat: number}, country: string, population: number};
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number,
    main: {
      temp: number,
      temp_min: number,
      temp_max: number,
      pressure: number,
      sea_level: number,
      grnd_level: number,
      humidity: number,
      temp_kf: number
    },
    weather: {id: number, main: string, description: string, icon: string}[],
    clouds: {all: number},
    wind: {speed: number, deg: number},
    sys: {pod: string},
    dt_txt: string
  }[];
}
