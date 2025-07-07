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
