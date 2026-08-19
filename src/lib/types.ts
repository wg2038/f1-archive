export interface DriverSeasonRecord {
  season: number;
  position: number | string;
  points: number;
  wins: number;
  podiums: number;
  poles: number;
  fastest_laps: number;
  constructor_id: string;
  team_name: string;
  team_name_cn?: string;
}

export interface Driver {
  driver_id: string;
  full_name: string;
  name_cn?: string;
  first_name: string;
  last_name: string;
  code: string;
  nationality: string;
  nationality_cn?: string;
  date_of_birth: string;
  seasons: number[];
  teams: string[];
  teams_cn?: string[];
  championships: number;
  championship_years?: number[];
  wins: number;
  podiums: number;
  poles: number;
  fastest_laps: number;
  points: number;
  entries: number;
  image: string | null;
  season_records: DriverSeasonRecord[];
  recent_races?: Array<any>;
}

export interface ConstructorSeasonHistory {
  season: number;
  position: number | string;
  points: number;
  wins: number;
  podiums: number;
  poles: number;
}

export interface Team {
  constructor_id: string;
  name: string;
  name_cn?: string;
  nationality: string;
  nationality_cn?: string;
  headquarters: string;
  lineage: string | null;
  active_seasons: number[];
  championships: number;
  championship_years?: number[];
  wins: number;
  podiums: number;
  poles: number;
  points: number;
  seasons_history: ConstructorSeasonHistory[];
  cars: Array<{
    season: number;
    chassis: string;
    engine_supplier: string;
    engine_model: string;
    engine_era: string;
  }>;
  drivers: string[];
}

export interface Circuit {
  circuit_id: string;
  official_name: string;
  name_cn?: string;
  country_cn?: string;
  city: string;
  country: string;
  location: {
    lat: number;
    lng: number;
  };
  track_type: string;
  direction: string;
  current_length_km: number;
  current_corners: number;
  race_laps: number;
  race_distance_km: number;
  first_f1_race: number;
  last_f1_race: number;
  image: string | null;
  lap_record: {
    time: string;
    driver: string;
    car: string;
    year: number;
  } | null;
  historical_layouts: Array<{
    era: string;
    length_km: number;
    corners: number;
    description: string;
    lap_record: {
      time: string;
      driver: string;
      year: number;
    } | null;
  }>;
  total_grands_prix: number;
  races_history: Array<{
    season: number;
    round: number;
    race_name: string;
    race_name_cn?: string;
    race_slug: string;
    date: string;
    circuit_name: string;
    circuit_name_cn?: string;
    circuit_id: string;
    country: string;
    winner: {
      driver_id: string;
      name: string;
      name_cn?: string;
      team: string;
      team_cn?: string;
      constructor_id: string;
    } | null;
  }>;
}

export interface Car {
  slug: string;
  year: number;
  constructor_id: string;
  team_name: string;
  team_name_cn?: string;
  chassis: string;
  engine_supplier: string;
  engine_model: string;
  engine_era: string;
  drivers: Array<{
    driver_id: string;
    number: number;
  }>;
  image: string | null;
  season_rank: number | string;
  season_points: number;
  season_wins: number;
  season_podiums: number;
  season_poles: number;
}

export interface RaceResult {
  position: number | string;
  positionText: string;
  points: number;
  driver_id: string;
  driver_name: string;
  driver_name_cn?: string;
  driver_code?: string;
  driver_nationality?: string;
  driver_nationality_cn?: string;
  constructor_id: string;
  team_name: string;
  team_name_cn?: string;
  grid: number | string;
  laps: number | string;
  status: string;
  status_cn?: string;
  time: string;
  fastest_lap?: {
    rank: string | number;
    lap: string | number;
    Time: {
      time: string;
    };
    AverageSpeed?: {
      units: string;
      speed: string;
    };
  } | null;
}

export interface QualifyingResult {
  position: number | string;
  number: string;
  driver_id: string;
  driver_name: string;
  driver_name_cn?: string;
  driver_code?: string;
  driver_nationality?: string;
  driver_nationality_cn?: string;
  constructor_id: string;
  team_name: string;
  team_name_cn?: string;
  q1?: string;
  q2?: string;
  q3?: string;
}

export interface SprintResult {
  position: number | string;
  positionText: string;
  points: number;
  driver_id: string;
  driver_name: string;
  driver_name_cn?: string;
  driver_code?: string;
  constructor_id: string;
  team_name: string;
  team_name_cn?: string;
  grid: number | string;
  laps: number | string;
  status: string;
  status_cn?: string;
  time: string;
}

export interface PracticeLap {
  position: number | string;
  number: string;
  driver_name: string;
  driver_name_cn?: string;
  driver_code: string;
  team_name: string;
  team_name_cn?: string;
  time: string;
  laps: string | number;
}

export interface Race {
  season: number;
  round: number | string;
  race_name: string;
  race_name_cn?: string;
  race_slug: string;
  date: string;
  time?: string;
  circuit: {
    circuitId: string;
    circuitName: string;
    circuitName_cn?: string;
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
      country_cn?: string;
    };
  };
  winner: {
    driver_id: string;
    name: string;
    name_cn?: string;
    team: string;
    team_cn?: string;
    constructor_id: string;
  } | null;
  pole: {
    driver_id: string;
    name: string;
    name_cn?: string;
    team: string;
    team_cn?: string;
    constructor_id: string;
  } | null;
  fastest_lap: {
    driver_id: string;
    name: string;
    name_cn?: string;
    team: string;
    team_cn?: string;
    lap: string | number;
    time: string;
    speed?: string;
  } | null;
  results: RaceResult[];
  qualifying: QualifyingResult[];
  sprint: SprintResult[];
  practices: {
    fp1?: PracticeLap[];
    fp2?: PracticeLap[];
    fp3?: PracticeLap[];
  };
}

export interface DriverStanding {
  position: number | string;
  positionText: string;
  points: number;
  wins: number;
  podiums: number;
  poles: number;
  fastest_laps: number;
  driver_id: string;
  driver_name: string;
  driver_name_cn?: string;
  driver_code?: string;
  driver_nationality?: string;
  driver_nationality_cn?: string;
  constructor_id: string;
  team_name: string;
  team_name_cn?: string;
  image: string | null;
}

export interface ConstructorStanding {
  position: number | string;
  positionText: string;
  points: number;
  wins: number;
  podiums: number;
  poles: number;
  constructor_id: string;
  team_name: string;
  team_name_cn?: string;
  nationality?: string;
  nationality_cn?: string;
}

export interface ProgressionDataPoint {
  round: number;
  race_name: string;
  race_name_cn?: string;
  [driver_id: string]: number | string | undefined;
}

export interface SeasonSummary {
  season: number;
  total_grands_prix: number;
  total_drivers: number;
  total_constructors: number;
  drivers_champion: {
    driver_id: string;
    name: string;
    name_cn?: string;
    team: string;
    team_cn?: string;
    nationality: string;
    nationality_cn?: string;
    points: number;
    wins: number;
    car: string;
    engine: string;
  };
  constructors_champion: {
    constructor_id: string;
    team_name: string;
    team_name_cn?: string;
    nationality: string;
    nationality_cn?: string;
    points: number;
    wins: number;
    car: string;
    engine: string;
  };
  engine_era: string;
  point_system_rule: string;
}

export interface SeasonDetail extends SeasonSummary {
  fastest_lap_rule: string;
  sprint_rule: string;
  cars_grid: Array<{
    constructor_id: string;
    team_name: string;
    team_name_cn?: string;
    chassis: string;
    engine_supplier: string;
    engine_model: string;
    engine_era: string;
    drivers: Array<{
      driver_id: string;
      number: number;
    }>;
  }>;
  driver_standings: DriverStanding[];
  constructor_standings: ConstructorStanding[];
  progression_data: ProgressionDataPoint[];
  races: Race[];
}

export interface StatisticsData {
  most_championships_drivers: Driver[];
  most_wins_drivers: Driver[];
  most_podiums_drivers: Driver[];
  most_poles_drivers: Driver[];
  most_fastest_laps_drivers: Driver[];
  most_points_drivers: Driver[];
  most_starts_drivers: Driver[];
  most_championships_teams: Team[];
  most_wins_teams: Team[];
  dominant_seasons: Array<{
    year: number;
    champion_driver: string;
    champion_driver_cn?: string;
    champion_team: string;
    champion_team_cn?: string;
    driver_wins: number;
    total_gps: number;
    win_percentage: number;
  }>;
}

export interface SearchItem {
  id: string;
  title: string;
  title_cn?: string;
  subtitle: string;
  type: string;
  url: string;
}

export interface SearchSummary {
  drivers: SearchItem[];
  teams: SearchItem[];
  circuits: SearchItem[];
  cars: SearchItem[];
  seasons: SearchItem[];
}
