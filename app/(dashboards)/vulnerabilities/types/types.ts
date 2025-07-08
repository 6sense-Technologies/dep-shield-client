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
  id: string
  __v: number
  createdAt: string
  cveId: string
  cweId: string[]
  dependencyId: string
  dependencyVersionId: string
  details: string
  intensity: string
  nvd_published_at: string
  published: string
  references: string[]
  summary: string
  updatedAt: string
  weaknesses: string[]
  nvdDescription: string
  nvdVulnStatus: string
  severity: Severity
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
