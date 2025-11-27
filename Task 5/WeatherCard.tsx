import { WeatherData } from '@/services/weatherService';
import { Cloud, Droplets, Wind, MapPin } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <div className="glass-card rounded-3xl p-8 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">
          {weather.location}, {weather.country}
        </h2>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-7xl font-bold text-primary mb-2">
            {weather.temperature}°
          </div>
          <p className="text-xl text-muted-foreground capitalize">
            {weather.description}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Feels like {weather.feelsLike}°
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col items-center p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
          <Cloud className="w-8 h-8 text-primary mb-2" />
          <p className="text-sm text-muted-foreground">Condition</p>
          <p className="text-lg font-semibold text-foreground">{weather.condition}</p>
        </div>

        <div className="flex flex-col items-center p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
          <Droplets className="w-8 h-8 text-primary mb-2" />
          <p className="text-sm text-muted-foreground">Humidity</p>
          <p className="text-lg font-semibold text-foreground">{weather.humidity}%</p>
        </div>

        <div className="flex flex-col items-center p-4 rounded-2xl bg-secondary/30 backdrop-blur-sm">
          <Wind className="w-8 h-8 text-primary mb-2" />
          <p className="text-sm text-muted-foreground">Wind</p>
          <p className="text-lg font-semibold text-foreground">{weather.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
};
