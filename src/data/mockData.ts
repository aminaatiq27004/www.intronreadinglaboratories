import { LabApp, ResearchPaper, DnsCheckItem, ChatMessage, GlobalResearchNode } from '../types';

export const LAB_APPS: LabApp[] = [
  {
    id: 'ultra-triplet-codon',
    name: 'Ultra Triplet Codon Engine',
    tagline: 'Foundational Molecular Splicing & Reading Frame Theory',
    description: 'Core theoretical and computational flagship workbench modeling the Ultra Triplet Codon Theory (UTCT). Uncovers multi-layered codon informational dynamics, intron-exon junction split-codon phase invariants (Phases 0, 1, 2), ribosomal elongation velocity, and Exonic Splicing Enhancer (ESE) harmonics.',
    category: 'Core Theory',
    routeSlug: '/apps/ultra-triplet-codon',
    inductionStatus: 'published',
    version: 'v4.0.1',
    githubFile: 'src/apps/ultra-triplet-codon/index.tsx',
    lastInducted: 'Oct 16, 2026',
    isCoreTheory: true,
    highlights: [
      '64-codon ultra triplet harmonic landscape & phase matrix',
      'Intron split-codon phase invariance (Phase 0, 1, and 2)',
      'ESE/ESS hexamer splicing resonance & velocity index',
      'Frameshift & premature stop codon (PTC) rescue simulator'
    ],
    image: '/src/assets/images/app_genomic_splicing_1791923357800.jpg'
  },
  {
    id: 'horizon-chat',
    name: 'Global Horizon Researcher Conduit',
    tagline: 'Worldwide Molecular Genetics & Post-Corona Discovery Chatbot',
    description: 'Global collaborative AI conduit uniting Geneticists, Molecular Biologists, and Genetic Engineers across the globe to share breakthroughs, accelerate post-corona resilience, leverage Ultra Triplet Codon Theory, and explore the hidden universe beyond human perceptions.',
    category: 'Global Network',
    routeSlug: '/apps/horizon-chat',
    inductionStatus: 'published',
    version: 'v1.0.0',
    githubFile: 'src/apps/horizon-chat/index.tsx',
    lastInducted: 'Oct 16, 2026',
    highlights: [
      'Worldwide geneticist & molecular biologist collaboration network',
      'Post-corona pandemic uplift & mRNA structural stabilization',
      'Deep hidden-universe intronic dark matter exploration',
      'Direct Ultra Triplet Codon Theory (UTCT) synthesis oracle'
    ]
  },
  {
    id: 'splice-sense',
    name: 'SpliceSense Studio',
    tagline: 'RNA Intron-Exon Splicing & Reading Frame Studio',
    description: 'Real-time nucleotide sequence analyzer that detects canonical 5\' donor (GU) and 3\' acceptor (AG) splice sites, computes open reading frames (ORFs), and simulates alternative splicing frameshifts.',
    category: 'Genomics',
    routeSlug: '/apps/splice-sense',
    inductionStatus: 'published',
    version: 'v2.4.0',
    githubFile: 'src/apps/splice-sense/index.tsx',
    lastInducted: 'Oct 12, 2026',
    highlights: [
      '5\' donor GU & 3\' acceptor AG junction detection',
      'Triple-frame ORF translation & codon maps',
      'Alternative splicing simulator (exon skipping & intron retention)',
      'GC-content & nucleotide frequency matrix'
    ],
    image: '/src/assets/images/app_genomic_splicing_1791923357800.jpg'
  },
  {
    id: 'biolex-reader',
    name: 'BioLex Literature Reader',
    tagline: 'Scientific Research Paper Reader & RSVP Analyzer',
    description: 'High-speed cognitive reader engineered for biotech and genomics literature. Features Rapid Serial Visual Presentation (RSVP) with optimal recognition point (ORP) fixation, Bionic typographic modes, and hypothesis claim extractors.',
    category: 'Literature Lab',
    routeSlug: '/apps/biolex-reader',
    inductionStatus: 'published',
    version: 'v3.1.2',
    githubFile: 'src/apps/biolex-reader/index.tsx',
    lastInducted: 'Oct 11, 2026',
    highlights: [
      'Calibrated RSVP speed-reader with 150-900 WPM pacing',
      'Bionic reading typographic fixation renderer',
      'Automated hypothesis and scientific claim extraction',
      'Annotation notebook with persistent citation markers'
    ],
    image: '/src/assets/images/app_literature_reader_1791923357946.jpg'
  },
  {
    id: 'isoform-viewer',
    name: 'IsoformMapper',
    tagline: 'Alternative Splicing & Transcript Isoform Simulator',
    description: 'Interactive architectural diagramming tool modeling pre-mRNA exon splicing patterns, branch point adenosine distances, and phenotypic isoform transcript shifts.',
    category: 'Genomics',
    routeSlug: '/apps/isoform-mapper',
    inductionStatus: 'ready_to_induct',
    version: 'v1.8.0',
    githubFile: 'src/apps/isoform-mapper/index.tsx',
    lastInducted: 'Pending Induction',
    highlights: [
      'Multi-isoform comparative transcript view',
      'Exon skipping, mutually exclusive exons & intron retention models',
      'Spliceosome branch site A-to-3\' distance calculator',
      'In-frame vs premature stop codon (PTC) nonsense decay detector'
    ]
  },
  {
    id: 'cadence-lab',
    name: 'Cadence Lab',
    tagline: 'Scientific Reading Cadence & Saccade Guide',
    description: 'Visual cognitive training tool designed to expand field-of-view saccades and eliminate vocalization when parsing dense academic papers, tables, and biochemical nomenclatures.',
    category: 'Cognitive Reading',
    routeSlug: '/apps/cadence-lab',
    inductionStatus: 'published',
    version: 'v2.0.5',
    githubFile: 'src/apps/cadence-lab/index.tsx',
    lastInducted: 'Oct 09, 2026',
    highlights: [
      'Guided horizontal saccade pacing bands',
      '1 to 4 word multi-token rhythmic chunking',
      'Scientific terminology latency benchmarks',
      'Comprehension retention assessment module'
    ]
  },
  {
    id: 'citation-graph',
    name: 'BioGraph Explorer',
    tagline: 'Intron Biology Knowledge Graph & Citation Explorer',
    description: 'Interactive relational network connecting foundational discoveries in pre-mRNA splicing, Nobel prize literature, spliceosome cryo-EM structures, and clinical antisense therapeutics.',
    category: 'Bioinformatics',
    routeSlug: '/apps/biograph-explorer',
    inductionStatus: 'ready_to_induct',
    version: 'v1.5.0',
    githubFile: 'src/apps/biograph-explorer/index.tsx',
    lastInducted: 'Pending Induction',
    highlights: [
      'Interactive node-edge citation pathway mapper',
      'Filtering by molecular target, clinical phase & methodology',
      'Direct DOI cross-referencing and PubMed metadata',
      'Reading list curation and exportable bibliography'
    ]
  }
];

export const GENE_PRESETS = [
  {
    id: 'hbb',
    name: 'Human Beta-Globin (HBB) — Exon 1 / Intron 1 / Exon 2',
    organism: 'Homo sapiens (chr11:5,226,900-5,227,150)',
    description: 'Canonical model for beta-globin synthesis. Demonstrates Phase 1 split-codon intron interception (codon A|GG split across Exon 1-2). Mutations causing beta-thalassemia disrupt the Ultra Triplet splicing harmonic.',
    utctPhase: 'Phase 1 (A|GG split codon)',
    eseScore: 0.88,
    rawSequence: 'ATGGTGCACCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTGGATGAAGTTGGTGGTGAGGCCCTGGGCAGGTTGGTATCAAGGTTACAAGACAGGTTTAAGGAGACCAATAGAAACTGGGCATGTGGAGACAGAGAAGACTCTTGGGTTTCTGATAGGCACTGACTCTCTCTGCCTATTGGTCTATTTTCCCACCCTTAGGCTGCTGGTGGTCTACCCTTGGACCCAGAGGTTC'
  },
  {
    id: 'smn2',
    name: 'SMN2 Gene — Exon 6 / Intron 7 / Exon 7 Splicing Cassette',
    organism: 'Homo sapiens (chr5:70,050,100-70,050,320)',
    description: 'Survival Motor Neuron 2. C-to-T transition in exon 7 disrupts an SF2/ASF Ultra Triplet enhancer, causing exon 7 exclusion. Targeted by Nusinersen (Spinraza) to restore UTCT codon alignment.',
    utctPhase: 'Phase 2 (Exon 7 Exclusion)',
    eseScore: 0.42,
    rawSequence: 'TTTATTTTCCTTACAGGGTTTTAGACAAAATCAAAAAGAAGGAAGGTGCTCACATTCCTTAAATTAAGGAGAAATGCTGGCATAGAGCAGCACTAAATGACACCACTAAAGAAACGATCAGACAGGATGGGTATGATTTGTTTTTAAATTTCTAAATGTTTTTTATTAGGTACATACTTTTGTATTTTAGAAGGTAAGTTTAGTGAAATTAG'
  },
  {
    id: 'brca1',
    name: 'BRCA1 Gene — Exon 11 Splice Junction Region',
    organism: 'Homo sapiens (chr17:43,091,400-43,091,650)',
    description: 'Tumor suppressor involved in homologous recombination DNA repair. Displays Phase 0 codon boundary conservation with high GC-harmonic stability.',
    utctPhase: 'Phase 0 (Boundary Invariant)',
    eseScore: 0.94,
    rawSequence: 'ATGGATTTATCTGCTCTTCGCGTTGAAGAAGTACAAAATGTCATTAATGCTATGCAGAAAATCTTAGAGTGTCCCATCTGTCTGGAGTTGATCAAGGAACCTGTCTCCACAAAGTGTGACCACATATTTTGCAAATTTTGCATGCTGAAACTTCTCAACCAGAAGAAAGGGCCTTCACAGTGTCCTTTATGTAAGAATGATATAACCAAAAGG'
  },
  {
    id: 'synthetic',
    name: 'Synthetic Minimal UTCT Benchmark Construct',
    organism: 'Laboratory Design (Intron Reading Labs Standard)',
    description: 'Pristine 210bp educational construct engineered according to Ultra Triplet Codon Theory with exact consensus 5\'-MAG|GURAGU donor and 3\'-YNCAG|G acceptor sequences.',
    utctPhase: 'Phase 0 & Phase 1 Dual-Model',
    eseScore: 0.99,
    rawSequence: 'ATGGCCACCGGATCTCGTACTTTCGCTCGTGTCCTCGTTGGTGTAAACGTAGACGAAGTGGGTGGTGAGGCATTGGGTCGTTTGGTATCAAGGTTACAAGACAGGTTTAAGGAGACCAATAGAAACTGGGCATGTGGAGACAGAGAAGACTCTTGGGTTTCTGATAGGCACTGACTCTCTCTGCCTATTGGTCTATTTTCCCACCCTTAGGCTGCTGGTGGTTTG'
  },
  {
    id: 'krt31-egfp',
    name: 'Human Nail Keratin 31 (KRT31) / EGFP Bio-Fluorescence Onychocyte Transduction Construct',
    organism: 'Homo sapiens nail onychocytes / Aequorea victoria EGFP chimeric construct',
    description: 'Breakthrough bio-fluorescence gene construct engineered by Intron Reading Labs. Transduces green fluorescent reporter proteins (EGFP/mNeonGreen) into human nail matrix onychocytes. Operates under UTCT Postulate I (Phase 1 C|TG split-codon invariant) and Postulate III (programmed ribosomal pause at codons 238-245) to ensure full chromophore maturation without quenching in the dense cysteine-crosslinked (18 mol% Cys) nail plate, enabling human nails to glow vividly at 509 nm.',
    utctPhase: 'Phase 1 (C|TG Leucine-Keratin split junction)',
    eseScore: 0.96,
    rawSequence: 'ATGGTGAGCAAGGGCGAGGAGCTGTTCACCGGGGTGGTGCCCATCCTGGTCGAGCTGGACGGCGACGTAAACGGCCACAAGTTCAGCGTGTCCGGCGAGGGCGAGGGCGATGCCACCTACGGCAAGCTGACCCTGAAGTTCATCTGCACCACCGGCAAGCTGCCCGTGCCCTGGCCCACCCTCGTGACCACCCTGACCTACGGCGTGCAGTGCTTCAGCCGCTACCCCGACCACATGAAGCAGCACGACTTCTTCAAGTCCGCCATGCCCGAAGGCTACGTCCAGGAGCGCACCATCTTCTTCAAGGACGACGGCAACTACAAGACCCGCGCCGAGGTGAAGTTCGAGGGCGACACCCTGGTGAACCGCATCGAGCTGAAGGGCATCGACTTCAAGGAGGACGGCAACATCCTGGGGCACAAGCTGGAGTACAACTACAACAGCCACAACGTCTATATCATGGCCGACAAGCAGAAGAACGGCATCAAGGTGAACTTCAAGATCCGCCACAACATCGAGGACGGCAGCGTGCAGCTCGCCGACCACTACCAGCAGAACACCCCCATCGGCGACGGCCCCGTGCTGCTGCCCGACAACCACTACCTGAGCACCCAGTCCGCCCTGAGCAAAGACCCCAACGAGAAGCGCGATCACATGGTCCTGCTGGAGTTCGTGACCGCCGCCGGGATCACTCTCGGCATGGACGAGCTGTACAAGGGTGGAGGAGGCTCCATGTCCCGCCAGTCCTGCACCGGTGGCTTCAGCTCCCGCTCCTTCAGCTCCGGCACCAGCGGCGGCTTCGGC'
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'paper-utct',
    title: 'The Ultra Triplet Codon Theory: Multi-Layered Informational Codes Governing Pre-mRNA Splicing Kinetics, Exon Junction Phases, and Reading Frame Preservation',
    authors: 'Amina Atiq, Julian Chen, Marcus Vance, Elena Rostova (Intron Reading Labs)',
    journal: 'Nature Structural & Molecular Genomics',
    year: 2026,
    doi: '10.1038/s41594-026-03910-x',
    category: 'Core Theory',
    readTimeMin: 7,
    hypothesis: 'Beyond encoding amino acids, triplet codons operate in a supra-codon harmonic field where the exact phase of intron interruption (Phases 0, 1, 2) couples with Exonic Splicing Enhancers (ESE) to dictate spliceosome velocity and protect the reading frame quantum against aberrant frameshifts.',
    keyFindings: [
      'Discovered that intron split-codon phase distribution is non-random: Phase 0 (51.2%), Phase 1 (28.4%), Phase 2 (20.4%) correlate with ancestral exon shuffling boundaries.',
      'Demonstrated that Ultra-Triplet ESE harmonic clusters accelerate U2AF65 and U1 snRNP recruitment by 3.8-fold over synonymous low-affinity triplets.',
      'Showed that the 3-token cognitive cadence in visual speed-reading mirrors biological triplet codon scanning efficiency, providing an empirical bridge between genomics and cognitive parsing.',
      'Constructed predictive rescue algorithms for 1,420 pathogenic splicing frameshifts using Ultra Triplet splice-switching oligonucleotides.'
    ],
    abstract: 'Classical molecular genetics defines the genetic code as 64 triplet codons translating into 20 amino acids and 3 termination signals. However, pre-mRNA processing in eukaryotes requires high-fidelity recognition of split genes amidst millions of non-coding nucleotides. Here, Intron Reading Labs introduces the Ultra Triplet Codon Theory (UTCT). We formulate a comprehensive mathematical and molecular framework demonstrating that triplet codons encode a secondary, supra-translational layer of informational resonance. Codons split across intron-exon junctions (Phases 0, 1, and 2) dictate structural spliceosome docking, control ribosomal elongation pause landscapes, and enforce reading frame invariance. Our findings explain evolutionary exon modularity and establish rational guidelines for sequence-directed RNA therapeutics.',
    fullText: `Classical molecular biology has historically treated the genetic code as a dictionary of isolated three-letter words translating linearly into polypeptides. However, eukaryotic gene architecture is profoundly defined by intervening sequences (introns) that disrupt coding exons. At Intron Reading Labs, our foundational investigations demonstrate that the triplet codon is not a static translational token, but an Ultra Triplet—a dynamic informational unit possessing harmonic resonance across pre-mRNA splicing and translation.

The Ultra Triplet Codon Theory (UTCT) establishes four fundamental postulates:

Postulate I: Triplet Phase Invariance. When introns intercept pre-mRNA transcripts, they do so in one of three discrete phases: Phase 0 (between complete codons), Phase 1 (after the first nucleotide of a codon), or Phase 2 (after the second nucleotide). Analysis across vertebrate genomes demonstrates that Phase 0-0 and Phase 1-1 symmetric exons prevent frameshifting during evolutionary exon duplication and alternative cassette exon skipping.

Postulate II: Supra-Codon Splicing Resonance. Exonic Splicing Enhancers (ESEs) are not arbitrary oligomers; they are composed of specific triplet codon motifs (such as GAR, AAG, and UGC) that establish harmonic resonance with SR proteins (SRSF1/SF2, SRSF2) and core U1 snRNP components. Synonymous codon substitutions that preserve amino acid sequence but alter Ultra Triplet harmonics cause dramatic drop-offs in spliceosome recognition efficiency.

Postulate III: Cotranslational Ribosomal Pause Kinetics. The velocity of ribosomal transit across mature transcripts is governed by triplet-triplet context. Clusters of low-velocity codons induce cotranslational pauses necessary for domain-by-domain protein folding, while high-velocity ultra-triplets prevent stalled ribosome collisions.

Postulate IV: Reading Frame Quantum & PTC Invariants. The preservation of the triplet reading frame is a conserved quantum constraint. Perturbations that introduce out-of-phase insertions or cryptic splice cleavage trigger catastrophic nonsense-mediated mRNA decay (NMD). By mapping the Ultra Triplet harmonic landscape, synthetic splice-switching oligonucleotides (SSOs) can be designed to restore canonical phase alignment and recover full-length peptide synthesis.

Together, these tenets reposition the triplet codon at the very nexus of eukaryotic transcript biology, providing the theoretical engine powering all diagnostic simulations and therapeutic modalities at Intron Reading Labs.`
  },
  {
    id: 'paper-lumikeratin',
    title: 'Transduction of Bio-Fluorescent Reporter Genes into the Human Nail Keratin Environment: Codon Phase Invariance and Onychocyte Matrix Expression',
    authors: 'Amina Atiq, Kenji Takahashi, Julian Sterling, Elena Rostova (Intron Reading Labs)',
    journal: 'Nature Biotechnology & Advanced Biomaterials',
    year: 2026,
    doi: '10.1038/s41587-026-04421-w',
    category: 'Synthetic Biology',
    readTimeMin: 6,
    hypothesis: 'Fluorescent protein genes (EGFP/mNeonGreen/UnaG) can be stably transduced into human nail matrix onychocytes without fluorophore quenching in the high-cysteine disulfide keratin plate, provided the chimeric transgene adheres to UTCT Postulate I (Phase 1 split-codon invariance) and Postulate III (ribosomal velocity modulation at 78 a.u.).',
    keyFindings: [
      'Engineered an AAV-DJ/nanoparticle transduction vector delivering codon-harmonized EGFP fused to the amino-terminal domain of human hard alpha-keratin KRT31.',
      'Achieved stable, robust green bio-fluorescence (excitation 488 nm, emission 509 nm) throughout the growing human onychocyte nail plate with zero tissue toxicity or brittleness.',
      'Demonstrated that standard (un-harmonized) GFP suffers from misfolding and dark aggregates in the dense cysteine environment (18 mol% Cys), whereas UTCT codon velocity tuning allows proper beta-barrel maturation.',
      'Validated in human organotypic nail matrix explants, yielding glowing nail plates visible under ambient light with excitation and glowing brightly under safe UV/blue wavelengths.'
    ],
    abstract: 'Fluorescent proteins are foundational reporters across cell biology, but their permanent expression in keratinized human appendage structures—particularly the hard alpha-keratin matrix of human fingernails—has historically been hindered by the dense disulfide-crosslinked microenvironment and severe translational quenching. Here, Intron Reading Labs demonstrates the successful transduction and stable expression of bio-fluorescent reporter genes into the human nail onychocyte environment. By applying the Ultra Triplet Codon Theory (UTCT), we resolved the critical split-codon phase boundaries (Phase 1 C|TG leucine invariants) linking the fluorescent fluorophore beta-barrel to the keratin KRT31 structural scaffold. Transduced nail matrix cells successfully assemble glowing fluorescent alpha-keratin macrofibrils that incorporate into the maturing nail plate, creating a living, glowing bio-luminescent nail architecture. This establishes a versatile non-invasive diagnostic biomarker and demonstrates the power of UTCT in synthetic mammalian bioengineering.',
    fullText: `Human nails represent one of the most mechanically resilient and specialized protein structures in mammalian anatomy. Composed primarily of hard alpha-keratins (KRT31, KRT33A, KRT34, KRT85, KRT86) and high-sulfur keratin-associated proteins (KAPs), the nail plate is synthesized by dividing onychocytes within the proximal nail matrix. As these cells differentiate, their cytoplasm becomes densely packed with parallel keratin intermediate filaments linked by extensive intermolecular disulfide bonds.

Historically, introducing foreign fluorescent proteins (such as Aequorea GFP or Discosoma mCherry) into keratinized tissues caused fluorophore quenching: the 11-stranded beta-barrel surrounding the chromophore (Ser65-Tyr66-Gly67) misfolds or undergoes covalent disulfide crosslinking with surrounding keratin cysteine residues, rendering the protein non-fluorescent and inducing cellular proteotoxic stress.

At Intron Reading Labs, our researchers engineered a definitive solution grounded in the Ultra Triplet Codon Theory (UTCT):

1. Codon Phase Invariance (Postulate I):
The synthetic transduction cassette fuses codon-optimized EGFP to human KRT31 through a flexible glycine-serine linker engineered with an exact Phase 1 split-codon invariant (C|TG Leucine). This preserves native pre-mRNA splicing mechanics and prevents alternative spliceosome skipping in onychocyte precursors.

2. Ribosomal Elongation Cadence (Postulate III):
To allow the GFP beta-barrel to fold autonomously prior to the synthesis of the cysteine-dense KRT31 filament domain, we program a temporary ribosomal deceleration zone (velocity drop from 88 a.u. to 32 a.u.) across codons 238-245. This gives the tripeptide fluorophore chromophore time to cyclize and oxidize before the nascent chain enters the disulfide-forming compartment of the onychocyte.

3. Transduction and Expression:
Using a dermatologically friendly keratinocyte-penetrating peptide or topical AAV-DJ vector applied to the eponychium (cuticle) overlying the nail matrix, the gene construct is efficiently taken up by germinative matrix cells. As new nail tissue grows distal from the cuticle, the human nail glows with vivid green fluorescence (509 nm) under blue/UV excitation, providing proof-of-concept for living bio-integrated sensors and structural biomonitoring.`
  },
  {
    id: 'paper-1',
    title: 'Atomic Cryo-EM Architecture of the Human Spliceosome during Pre-mRNA Branch Site Recognition',
    authors: 'Amina Atiq, Julian Chen, Elena Rostova et al. (Intron Reading Labs)',
    journal: 'Cell & Molecular Biology Review',
    year: 2025,
    doi: '10.1016/j.cell.2025.04.019',
    category: 'Structural Genomics',
    readTimeMin: 6,
    hypothesis: 'Pre-mRNA branch point adenosine (BPA) is stabilized within the U2 snRNP catalytic core through specific hydrogen bonding networks with SF3B1 HEAT repeats before first-step transesterification.',
    keyFindings: [
      'Resolved human B-complex spliceosome at 2.4 Å resolution.',
      'Identified a conserved conformational switch in Prp2 ATPase driving branch helix remodeling.',
      'Demonstrated that pathogenic SF3B1 hotspot mutations distort the intron 3\' polypyrimidine trajectory.'
    ],
    abstract: 'Pre-messenger RNA splicing is executed by the dynamic spliceosome, which precisely recognizes exon-intron boundaries and catalyzes two consecutive transesterification reactions. Here, we present the high-resolution cryo-electron microscopy structure of the human precatalytic B complex. Our findings delineate the structural foundation for 5\' splice site docking and branch site specification, illuminating the mechanistic impact of genetic splicing variants in human disease.',
    fullText: `Pre-messenger RNA splicing is an essential step in eukaryotic gene expression, removing non-coding introns and joining coding exons to produce mature mRNA transcripts. The spliceosome is a multi-megadalton ribonucleoprotein (RNP) machine comprising five small nuclear RNAs (U1, U2, U4, U5, and U6 snRNAs) and over one hundred associated proteins.

In our structural investigations at Intron Reading Labs, cryo-electron microscopy was utilized to capture the precatalytic spliceosome at 2.4 Å resolution. The catalytic center undergoes sequential rearrangements driven by DEAD/H-box RNA helicases. During step one, the 2'-hydroxyl group of the branch point adenosine attacks the phosphodiester bond at the 5' splice site (GU dinucleotide), forming a lariat intermediate.

Subsequent conformational transition aligns the 3' hydroxyl of the upstream exon with the 3' splice site (AG dinucleotide) for the second transesterification reaction. Cryo-EM density maps reveal that SF3B1 stabilizes the branch helix within a narrow hydrophobic cleft. Genetic alterations frequently observed in myelodysplastic syndromes and chronic lymphocytic leukemia cluster directly at this interface, inducing alternative branch site selection and aberrant splicing.

These structural insights provide a rational blueprint for designing targeted small-molecule and oligonucleotide therapeutics to rectify defective splicing cascades in human genetics.`
  },
  {
    id: 'paper-2',
    title: 'Precision Splicing Modulation with Targeted Splice-Switching Oligonucleotides',
    authors: 'Marcus Vance, Sarah Al-Mansoor, David K. Miller',
    journal: 'Nature Biotechnology',
    year: 2026,
    doi: '10.1038/s41587-026-01822-4',
    category: 'Therapeutics',
    readTimeMin: 5,
    hypothesis: 'Steric blockage of cryptic 3\' splice acceptor sites via 2\'-O-methoxyethyl (MOE) phosphorothioate oligonucleotides restores canonical open reading frame translation in human beta-globin variants.',
    keyFindings: [
      'Engineered ASOs redirected splicing to the canonical AG site with 94.2% efficiency.',
      'Restored full-length functional hemoglobin tetramer in primary human erythroblasts.',
      'Zero off-target transcriptome perturbation detected by deep RNA-seq.'
    ],
    abstract: 'Aberrant pre-mRNA splicing accounts for approximately 15% of all point mutations causing genetic diseases in humans. Splice-switching oligonucleotides (SSOs) offer an attractive strategy to modulate alternative splicing or mask cryptic splice sites without altering genomic DNA sequences. We evaluate next-generation chemically modified SSOs targeting cryptic intron junctions, demonstrating complete reading frame restoration and minimal cytotoxic burden.',
    fullText: `Point mutations generating novel 5' or 3' splice sites within introns frequently result in the inclusion of pseudo-exons or premature stop codons, leading to nonsense-mediated mRNA decay (NMD). In this study, we tested a panel of 18-mer antisense oligonucleotides with uniform 2'-O-(2-methoxyethyl) (MOE) ribose modifications and phosphorothioate backbones.

Primary human hematopoietic progenitor cells carrying the HBB IVS1-110 (G>A) mutation were cultured under erythroid differentiation conditions. Transfection of the optimal SSO construct at 25 nM selectively blocked the aberrant 3' splice site created by the mutation, completely restoring usage of the canonical splice acceptor site 16 nucleotides downstream.

Quantitative RT-PCR and capillary electrophoresis confirmed restoration of >90% normal beta-globin transcript levels. Western blot and HPLC analyses confirmed the synthesis of adult hemoglobin (HbA) tetramers at physiological levels. These findings establish the viability of sequence-directed splicing switches for clinical hematology.`
  },
  {
    id: 'paper-3',
    title: 'Cognitive Reading Bandwidth and Visual Span Optimization for Scientific Researchers',
    authors: 'Dr. Rebecca Stern, Dr. Tariq Thorne (Intron Cognitive Systems)',
    journal: 'Journal of Cognitive Ergonomics & Information Science',
    year: 2026,
    doi: '10.1080/00140139.2026.2201948',
    category: 'Cognitive Science',
    readTimeMin: 4,
    hypothesis: 'Centering fixations on the Optimal Recognition Point (ORP) paired with rhythmic token chunking reduces saccadic regressions by 68% when reading dense multi-syllabic academic literature.',
    keyFindings: [
      'Average reading speeds increased from 240 WPM to 545 WPM without degradation in factual recall.',
      'Eye-tracking revealed near-zero retro-saccades in RSVP display modes.',
      'Biochemical nomenclature retention improved by 31% with Bionic fixation cues.'
    ],
    abstract: 'Academic reading speed is fundamentally constrained by retinal foveal mechanics and saccadic eye movements. When reading dense biochemical prose filled with compound terminology, researchers spend up to 35% of total reading time executing backward corrective saccades. We present an empirical evaluation of computer-assisted cadence engines, comparing traditional continuous text, Bionic fixation cues, and rapid serial visual presentation.',
    fullText: `Reading academic manuscripts requires rapid cognitive parsing of complex semantic structures, mathematical formulas, and unfamiliar genetic symbols. Foveal vision captures only 1-2 words per fixation, requiring the ocular muscles to execute rapid ballistic saccades across lines of text.

Our laboratory measured reading performance across 140 post-doctoral researchers exposed to three text presentation paradigms. Participants were evaluated on reading latency, eye fixation duration (via high-speed infrared corneal reflection), and post-reading comprehension rubrics.

The results demonstrate that Rapid Serial Visual Presentation (RSVP) with a calibrated optimal recognition point eliminated over 90% of physical eye movement strain. Comprehension scores remained within 3% of baseline at speeds up to 550 WPM. Furthermore, Bionic typography—which bolds initial phonemes—acted as visual stepping stones, reducing regression frequency by 42% in standard layout modes. These findings support integrating cognitive pacing controls into scientific literature portals.`
  }
];

export const INITIAL_DNS_CHECKS: DnsCheckItem[] = [
  {
    id: 'ai-studio-host',
    recordType: 'AI STUDIO',
    host: 'intron-reading-labs.ai.studio',
    target: 'Google AI Studio Cloud Run Engine',
    currentValue: 'Active & Deployed (HTTPS)',
    status: 'valid',
    description: 'Direct interactive laboratory deployment instance on AI Studio with live reactivity and server runtime.'
  },
  {
    id: 'dns-cname',
    recordType: 'CNAME',
    host: 'www.intronreadinglabs.com',
    target: 'cname.vercel-dns.com',
    currentValue: 'cname.vercel-dns.com',
    status: 'valid',
    description: 'Directs www subdomain traffic directly to the Vercel edge deployment network.'
  },
  {
    id: 'dns-apex',
    recordType: 'A',
    host: 'intronreadinglabs.com',
    target: '76.76.21.21',
    currentValue: '76.76.21.21',
    status: 'valid',
    description: 'Apex domain routing to Vercel Global Edge IP. Redirects to www.intronreadinglabs.com automatically.'
  },
  {
    id: 'ssl-cert',
    recordType: 'SSL',
    host: 'intron-reading-labs.ai.studio / www.intronreadinglabs.com',
    target: "Google Managed / Let's Encrypt TLS 1.3",
    currentValue: 'Active (TLS 1.3)',
    status: 'valid',
    description: 'Automated HTTPS certificate generation with zero-downtime renewal.'
  },
  {
    id: 'repo-sync',
    recordType: 'REPO',
    host: 'GitHub: aminaatiq27004 / intronreadings',
    target: 'main branch -> vercel-production',
    currentValue: 'Connected & Ready for Induction',
    status: 'valid',
    description: 'Automated CI/CD deployment webhook triggered on git push.'
  }
];

export const KNOWLEDGE_GRAPH_NODES = [
  { id: '1', label: 'Discovery of Introns', year: 1977, category: 'Milestone', desc: 'Phillip Sharp & Richard Roberts demonstrate split genes in adenoviruses (Nobel Prize 1993).' },
  { id: '2', label: 'Spliceosome Identification', year: 1985, category: 'Mechanism', desc: 'Identification of snRNPs (U1, U2, U4, U5, U6) forming the dynamic splicing ribonucleoprotein complex.' },
  { id: '3', label: 'Alternative Splicing Diversity', year: 1998, category: 'Regulation', desc: 'Over 95% of multi-exon human genes undergo alternative splicing to create proteomic complexity.' },
  { id: '4', label: 'Nusinersen (Spinraza)', year: 2016, category: 'Therapeutics', desc: 'First FDA-approved splice-switching antisense oligonucleotide for Spinal Muscular Atrophy targeting SMN2.' },
  { id: '5', label: 'Cryo-EM Spliceosome Structure', year: 2019, category: 'Structural Biology', desc: 'Atomic-resolution visualization of pre-catalytic and catalytic spliceosome intermediate states.' },
  { id: '6', label: 'CRISPR Splice Junction Editing', year: 2024, category: 'Gene Editing', desc: 'Adenine base editors repair donor and acceptor dinucleotide mutations in hereditary ciliopathies.' },
  { id: '7', label: 'Ultra Triplet Codon Theory (UTCT)', year: 2026, category: 'Core Theory', desc: 'Amina Atiq & Intron Reading Labs discover that triplet codons contain multi-layered informational codes governing pre-mRNA splicing kinetics, split-codon phase conservation (Phases 0, 1, 2), and reading frame preservation.' },
  { id: '8', label: 'Digital Lab Induction Suite', year: 2026, category: 'Digital Tools', desc: 'Integrated research suite deploying UTCT simulation engines, BioLex cognitive reader, and Vercel edge infrastructure.' }
];

export const GLOBAL_RESEARCH_NODES: GlobalResearchNode[] = [
  {
    id: 'node-karolinska',
    institution: 'Karolinska Institute & ScilifeLab',
    city: 'Stockholm',
    country: 'Sweden',
    leadInvestigator: 'Dr. Elena Rostova',
    activeFocus: 'Post-COVID Microvascular Splicing & ACE2 Exon-Phase Interceptions',
    status: 'active_transmitting',
    latencyMs: 14,
  },
  {
    id: 'node-riken',
    institution: 'RIKEN Center for Integrative Medical Sciences',
    city: 'Yokohama / Tokyo',
    country: 'Japan',
    leadInvestigator: 'Prof. Kenji Takahashi',
    activeFocus: 'Supra-Codon ESE Harmonics & Myocardial mRNA Rejuvenation',
    status: 'active_transmitting',
    latencyMs: 22,
  },
  {
    id: 'node-broad',
    institution: 'Broad Institute of MIT and Harvard',
    city: 'Cambridge, MA',
    country: 'USA',
    leadInvestigator: 'Dr. Julian Sterling',
    activeFocus: 'Intronic Dark Matter Quantum Bio-Information & Triplet Symmetries',
    status: 'active_transmitting',
    latencyMs: 18,
  },
  {
    id: 'node-pasteur',
    institution: 'Institut Pasteur',
    city: 'Paris',
    country: 'France',
    leadInvestigator: 'Dr. Carmen Vasquez',
    activeFocus: 'Pan-Coronaviral Splicing Decoy Vectors & Antiviral Ribozymes',
    status: 'active_transmitting',
    latencyMs: 16,
  },
  {
    id: 'node-acegid',
    institution: 'ACEGID (Centre of Excellence for Genomics)',
    city: 'Ede / Lagos',
    country: 'Nigeria',
    leadInvestigator: 'Dr. Amara Okafor',
    activeFocus: 'Conserved Split-Codon Phase Invariant Surveillance in Emerging Pathogens',
    status: 'active_transmitting',
    latencyMs: 28,
  },
  {
    id: 'node-wehi',
    institution: 'Walter and Eliza Hall Institute',
    city: 'Melbourne',
    country: 'Australia',
    leadInvestigator: 'Dr. Marcus Vance',
    activeFocus: 'Long-COVID Mitochondrial Pause Kinetics (Postulate III Validation)',
    status: 'sequencing',
    latencyMs: 31,
  },
  {
    id: 'node-cern-biology',
    institution: 'Geneva Bio-Quantum Theoretical Consortium',
    city: 'Geneva',
    country: 'Switzerland',
    leadInvestigator: 'Dr. Soraya Benali',
    activeFocus: 'Higher-Dimensional Codon Geometries in Hidden Genomic Universe',
    status: 'peer_reviewing',
    latencyMs: 19,
  },
  {
    id: 'node-usp',
    institution: 'University of São Paulo (USP) Genomic Hub',
    city: 'São Paulo',
    country: 'Brazil',
    leadInvestigator: 'Prof. Rafael Silva',
    activeFocus: 'Synthetic Splice-Switching Oligos for Post-Viral Fibrosis Reversal',
    status: 'active_transmitting',
    latencyMs: 35,
  },
];

export const SEED_RESEARCHER_DISPATCHES: ChatMessage[] = [
  {
    id: 'msg-init-oracle',
    role: 'assistant',
    authorName: 'Intron Horizon AI Oracle',
    institution: 'Intron Reading Labs Global Synthesis Conduit',
    location: 'Geneva / Global Edge',
    specialistRole: 'global_oracle',
    postulateAnchor: 'UTCT Core Framework',
    upliftCategory: 'utct_mechanics',
    timestamp: '10:00:00 UTC',
    content: `Welcome, geneticists, molecular biologists, genetic engineers, and bio-theorists worldwide.\n\nThis Global Horizon Conduit is established to synthesize human findings in real time, accelerate our collective recovery from the post-corona pandemic world, and voyage into the hidden universe of genomic information that has forever remained beyond human sensory perceptions.\n\nAt the epicenter stands the **Ultra Triplet Codon Theory (UTCT)**: the discovery that triplet codons are not merely passive amino acid lookup tokens, but quantum-coherent harmonic oscillators that dictate pre-mRNA splicing phases (0, 1, 2), spliceosome snRNP dynamics, and ribosomal velocity profiles. Share your lab discoveries, viral sequence variants, synthetic ASO designs, or theoretical models below.`,
    tags: ['UTCT Core', 'Post-Corona', 'Hidden Universe', 'Global Synthesis'],
  },
  {
    id: 'msg-seed-1',
    role: 'researcher_broadcast',
    authorName: 'Dr. Elena Rostova',
    institution: 'Karolinska Institute & ScilifeLab',
    location: 'Stockholm, Sweden',
    specialistRole: 'molecular_geneticist',
    postulateAnchor: 'Postulate I: Intron Split-Codon Phase Invariance',
    upliftCategory: 'post_corona',
    timestamp: '10:14:22 UTC',
    content: `Colleagues: In our post-COVID pulmonary autopsy cohorts, we mapped persistent SARS-CoV-2 subgenomic RNA remnants against host ACE2 pre-mRNA. We discovered that the host ACE2 Exon 3-to-4 junction relies on an absolute **Phase 1 Split-Codon Invariant** (\`G | INTRON | AG\` forming GAG Glu-63). Pathogenic long-COVID inflammatory signatures perturb this exact splice junction, causing a -1 frameshift. By introducing an in-frame synthetic ASO mimicking the UTCT Phase 1 harmonic, we restored normal ACE2 full-length isoform expression by 88%! Requesting global peer verification.`,
    tags: ['Long-COVID', 'ACE2', 'Phase 1 Invariant', 'Host Repair'],
  },
  {
    id: 'msg-seed-2',
    role: 'researcher_broadcast',
    authorName: 'Prof. Kenji Takahashi',
    institution: 'RIKEN Center for Integrative Medical Sciences',
    location: 'Yokohama, Japan',
    specialistRole: 'molecular_biologist',
    postulateAnchor: 'Postulate III: Ribosomal Velocity Landscapes',
    upliftCategory: 'post_corona',
    timestamp: '10:28:45 UTC',
    content: `To build lasting post-corona immunity without inflammatory reactogenicity, we redesigned the Spike mRNA coding region using **UTCT Postulate III**. By replacing low-velocity clusters (\`UUA\`, \`CGG\`) with optimal cadence triplets (\`CUG\`, \`AGA\`, elongation velocity 92 a.u.) while strictly preserving local pause sites for proper S1/S2 cleavage domain folding, in vivo translation efficiency surged 4.2x with zero premature ribosomal drop-off. This yields stable neutralizing titrations at one-fifth the clinical dosage.`,
    tags: ['mRNA Vaccine', 'Ribosomal Cadence', 'Spike Stabilization', 'Post-Corona'],
  },
  {
    id: 'msg-seed-3',
    role: 'researcher_broadcast',
    authorName: 'Dr. Julian Sterling',
    institution: 'Broad Institute of MIT & Harvard',
    location: 'Cambridge, MA, USA',
    specialistRole: 'horizon_physicist',
    postulateAnchor: 'Postulate II: Supra-Codon Splicing Resonance',
    upliftCategory: 'hidden_universe',
    timestamp: '10:41:10 UTC',
    content: `Deep sequencing of the 98% non-coding 'dark genome' reveals something that transcends classical molecular genetics: the 64-triplet codon matrix exhibits periodic phase interference patterns that match the vibrational eigenvalues of spliceosomal U1/U2 snRNAs. Non-coding intronic sequences carry higher-dimensional informational geometries—a hidden universe operating at sub-molecular scales that biology has utilized for billions of years. We are no longer limited by conventional human perception.`,
    tags: ['Dark Genome', 'Hidden Universe', 'Quantum Biology', 'Supra-Codon Resonance'],
  },
  {
    id: 'msg-seed-4',
    role: 'researcher_broadcast',
    authorName: 'Dr. Soraya Benali & IRL Biomaterials Team',
    institution: 'Geneva Bio-Quantum Theoretical Consortium & Intron Reading Labs',
    location: 'Geneva, Switzerland',
    specialistRole: 'genetic_engineer',
    postulateAnchor: 'Postulate I: Intron Split-Codon Phase Invariance',
    upliftCategory: 'synthetic_aso',
    timestamp: '11:05:30 UTC',
    content: `BREAKTHROUGH DISPATCH: We have successfully demonstrated the transduction of bio-fluorescent glowing protein genes (EGFP & mNeonGreen) directly into the human nail hard alpha-keratin environment! Under UTCT Postulate I, we engineered a Phase 1 split-codon invariant (C|TG Leucine) linking the fluorophore beta-barrel to onychocyte KRT31, coupled with a programmed ribosomal pause (Postulate III: 32 a.u.) across codons 238-245. When delivered via topical AAV-DJ/nanoparticle vectors to the nail matrix, germinative onychocytes express the fluorescent chimeric keratin into the nail plate without fluorophore quenching. Human nails stably glow with vivid emerald bio-fluorescence (509 nm) under blue/UV excitation!`,
    tags: ['LumiKeratin', 'Glowing Nails', 'EGFP Transduction', 'KRT31', 'Phase 1 Invariant'],
  },
];
