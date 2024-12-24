export interface ICity{
    name : string
    id : number
}

interface ICord{
    lon : number
    lat : number
}
export interface ICityFullDetail{
    id : number
    name : string
    state : string
    country : string
    coord : ICord
}

  
  export interface IWeather {
    id: number
    main: string
    description: string
    icon: string
  }
  
  export interface Main {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  
  export interface Wind {
    speed: number
    deg: number
    gust: number
  }
  
  export interface Clouds {
    all: number
  }
  
  export interface Sys {
    country: string
    sunrise: number
    sunset: number
  }

export interface IWeatherDetail {
    coord: ICord
    weather: IWeather[]
    base: string
    main: Main
    visibility: number
    wind: Wind
    clouds: Clouds
    dt: number
    sys: Sys
    timezone: number
    id: number
    name: string
    cod: number
  }
  
 
  

// Function to get a list of { id, name } from city.list.json
export const getCityIdNameList = async (): Promise<ICity[]> => {
    try {
      const response = await fetch('/city.list.json');
      if (!response.ok) {
        throw new Error(`Error fetching city list: ${response.statusText}`);
      }
  
      const cities = await response.json();
      console.log(cities,'cities#')
      // Extract only id and name
      const cityList: ICity[] = cities.map((city: ICityFullDetail) => ({
        id: city.id,
        name: city.name,
      }));
  
      return cityList;
    } catch (error) {
      console.error('Error fetching city list:', error);
      return [];
    }
  };