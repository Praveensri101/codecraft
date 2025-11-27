import { useState, useEffect } from 'react';
import { WeatherScene } from '@/components/weather/WeatherScene';
import { WeatherCard } from '@/components/weather/WeatherCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { fetchWeatherByCity, fetchWeatherByCoords, WeatherData } from '@/services/weatherService';
import { Search, MapPin } from 'lucide-react';

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Auto-fetch weather on page load using geolocation
  useEffect(() => {
    handleLocationDetect();
  }, []);

  const getWeatherGradient = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return 'weather-gradient-sunny';
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return 'weather-gradient-rainy';
    } else if (conditionLower.includes('snow')) {
      return 'weather-gradient-snowy';
    } else if (conditionLower.includes('cloud')) {
      return 'weather-gradient-cloudy';
    }
    return 'weather-gradient-clear';
  };

  const handleSearch = async () => {
    if (!city.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a city name',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
      toast({
        title: 'Success',
        description: `Weather data loaded for ${data.location}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to fetch weather data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLocationDetect = async () => {
    if (!navigator.geolocation) {
      toast({
        title: 'Error',
        description: 'Geolocation is not supported by your browser',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          setWeather(data);
          toast({
            title: 'Success',
            description: `Weather data loaded for ${data.location}`,
          });
        } catch (error) {
          toast({
            title: 'Error',
            description: error instanceof Error ? error.message : 'Failed to fetch weather data',
            variant: 'destructive',
          });
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
        toast({
          title: 'Location Access',
          description: 'Please allow location access or search for a city manually.',
        });
      }
    );
  };

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${
        weather ? getWeatherGradient(weather.condition) : 'weather-gradient-clear'
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
              3D Weather Experience
            </h1>
            <p className="text-xl text-white/90 drop-shadow">
              Immersive weather visualization
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex gap-4 mb-8 animate-fade-in">
            <Input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="glass-card border-white/20 text-white placeholder:text-white/60 text-lg py-6"
            />
            <Button
              onClick={handleSearch}
              disabled={loading}
              size="lg"
              className="bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-sm px-8"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
            <Button
              onClick={handleLocationDetect}
              disabled={loading}
              size="lg"
              className="bg-white/20 hover:bg-white/30 text-white border border-white/20 backdrop-blur-sm px-8"
            >
              <MapPin className="w-5 h-5 mr-2" />
              My Location
            </Button>
          </div>

          {/* Content */}
          {weather ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 3D Scene */}
              <div className="glass-card rounded-3xl overflow-hidden h-[500px] animate-fade-in">
                <WeatherScene condition={weather.condition} />
              </div>

              {/* Weather Info */}
              <div className="flex flex-col justify-center">
                <WeatherCard weather={weather} />
              </div>
            </div>
          ) : (
            <div className="text-center py-20 animate-fade-in">
              <div className="glass-card rounded-3xl p-12 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-4">
                  {loading ? 'Loading your weather...' : 'Welcome to 3D Weather'}
                </h2>
                <p className="text-xl text-white/80">
                  {loading
                    ? 'Fetching weather data for your location'
                    : 'Search for a city or use your location to see immersive 3D weather'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
