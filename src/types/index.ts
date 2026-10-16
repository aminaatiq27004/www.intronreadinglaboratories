export type AppCategory = 'Core Theory' | 'Genomics' | 'Literature Lab' | 'Cognitive Reading' | 'Bioinformatics' | 'Global Network';

export type InductionStatus = 'published' | 'staged' | 'ready_to_induct';

export type ResearcherRole =
  | 'molecular_geneticist'
  | 'genetic_engineer'
  | 'molecular_biologist'
  | 'horizon_physicist'
  | 'global_oracle';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'researcher_broadcast';
  authorName?: string;
  institution?: string;
  location?: string;
  content: string;
  timestamp: string;
  specialistRole?: ResearcherRole;
  postulateAnchor?: string;
  sequenceContext?: string;
  upliftCategory?: 'post_corona' | 'hidden_universe' | 'utct_mechanics' | 'synthetic_aso';
  tags?: string[];
}

export interface GlobalResearchNode {
  id: string;
  institution: string;
  city: string;
  country: string;
  leadInvestigator: string;
  activeFocus: string;
  status: 'active_transmitting' | 'sequencing' | 'peer_reviewing';
  latencyMs: number;
}

export interface LabApp {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: AppCategory;
  routeSlug: string;
  inductionStatus: InductionStatus;
  version: string;
  githubFile: string;
  lastInducted: string;
  highlights: string[];
  image?: string;
  isCoreTheory?: boolean;
}

export interface UltraTripletCodonInfo {
  codon: string;
  aminoAcid: string;
  fullName: string;
  degeneracy: number;
  eseAffinity: number; // -1.0 to 1.0 (Exonic Splicing Enhancer score)
  transitVelocity: number; // 10 to 100 (relative ribosomal decoding speed)
  phaseStability: {
    phase0: number; // 0 to 100
    phase1: number;
    phase2: number;
  };
  gcContent: number; // 0, 33, 67, 100
  intronSplitExample: {
    phase0: string; // [Codon] | Intron
    phase1: string; // N | Intron | NN
    phase2: string; // NN | Intron | N
  };
  clinicalRelevance: string;
}

export interface IntronPhaseMetric {
  junctionId: string;
  donorPosition: number;
  acceptorPosition: number;
  phase: 0 | 1 | 2;
  interruptedCodon: string;
  reconstructedCodon: string;
  reconstructedAminoAcid: string;
  isFrameshift: boolean;
  eseDensityDelta: number;
}

export interface SpliceJunction {
  type: 'donor' | 'acceptor' | 'branch_point';
  position: number;
  sequence: string;
  score: number;
}

export interface ExonIntronRegion {
  type: 'exon' | 'intron';
  index: number;
  start: number;
  end: number;
  sequence: string;
  length: number;
}

export interface ReadingFrameResult {
  frame: number; // +1, +2, +3
  startCodons: number[];
  stopCodons: number[];
  longestOrfLength: number;
  aminoAcids: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi: string;
  category: string;
  readTimeMin: number;
  abstract: string;
  keyFindings: string[];
  hypothesis: string;
  fullText: string;
}

export interface DnsCheckItem {
  id: string;
  recordType: 'CNAME' | 'A' | 'SSL' | 'REPO' | 'AI STUDIO' | 'HOST';
  host: string;
  target: string;
  currentValue: string;
  status: 'valid' | 'pending' | 'action_needed';
  description: string;
}

export interface GeneratedRepoFile {
  filePath: string;
  language: string;
  description: string;
  content: string;
}
