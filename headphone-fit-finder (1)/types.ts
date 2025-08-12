
export interface UserInput {
  features: string;
  useCase: string[];
  comfort: string;
  style: string;
  budget: string;
  preferredType: string;
  desiredFeatures: string[];
  platformCompatibility: string[];
  batteryLife: string;
  micQuality: string;
}

export interface Recommendation {
  productName: string;
  type: string;
  fitReason: string;
  comfort: string;
  sound: string;
  pros: string[];
  cons: string[];
  fitConfidenceScore: number;
  productUrl: string;
}

export interface AnalysisResponse {
  recommendations: Recommendation[];
}
