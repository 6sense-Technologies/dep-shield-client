export interface AllVulnerabilitiesType {
  data: SingleVulnerabilityType[]
  count: number
}

export interface SingleVulnerabilityType {
  name: string
  discovered: string
  dependencyName: string
  _id: string
}


export interface VulnerabilityDetailsType {
  _id: string
  cveId: string
  published: string
  dependencyName: string
  nvdDescription: string
  references: string[]
  severity: Severity
  vulnerabilityHistory: VulnerabilityHistory[]
}

export interface Severity {
  cvssMetricV40: CvssMetricV40
  cvssMetricV31: CvssMetricV31
  cvssMetricV30: any
  cvssMetricV2: any
}

export interface CvssMetricV40 {
  source: string
  type: string
  cvssData: CvssData
}

export interface CvssData {
  version: string
  vectorString: string
}

export interface CvssMetricV31 {
  source: string
  type: string
  cvssData: CvssData2
  exploitabilityScore: number
  impactScore: number
}

export interface CvssData2 {
  version: string
  vectorString: string
  baseScore: number
  baseSeverity: string
  attackVector: string
  attackComplexity: string
  privilegesRequired: string
  userInteraction: string
  scope: string
  confidentialityImpact: string
  integrityImpact: string
  availabilityImpact: string
}

export interface VulnerabilityHistory {
  status: string
  version: string
}
