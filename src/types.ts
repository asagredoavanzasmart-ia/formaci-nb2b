export interface CompanyData {
  name: string;
  industry: string;
  size: string;
  revenue: string;
  geography: string;
  context: string;
  mainProblem: string;
  kpis: string;
  prerequisites: string;
  buyerProfile: string;
  pains: string[];
  results: string[];
}

export interface SegmentData {
  id: string;
  name: string;
  description: string;
  dominantPain: string;
  message: string;
}

export interface BuyerPersona {
  id: string;
  role: string;
  objectives: string;
  fears: string;
  language: string;
  resonance: string;
}

export interface PersonaData {
  decisor: string;
  influencer: string;
  budgetOwner: string;
  mainPain: string;
  antiIcp: string;
}

export interface IceData {
  impact: number;
  confidence: number;
  ease: number;
  evidence: boolean;
}

export interface CompleteICP {
  id: string;
  company: CompanyData;
  persona: PersonaData;
  segments: SegmentData[];
  buyerPersonas: BuyerPersona[];
  ice: IceData;
}

export interface OfferData {
  valueProposition: string;
  differentiators: string[];
  pricingModel: string;
  roiEstimate: string;
  mainPromise: string;
}
