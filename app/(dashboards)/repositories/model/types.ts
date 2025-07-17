export type AllRepoSharedUsers = SingleRepoSharedUsers[]

export interface SingleRepoSharedUsers {
  _id: string
  repositoryId: string
  repositoryName: string
  sharedByName: string
  sharedWith: string
  sharedBy: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface AllRepoType {
  data: SingleRepoType[]
  count: number
}

export interface SingleRepoType {
  _id: string
  repoUrl: string
  user: string
  __v: number
  createdAt: string
  defaultBranch: string
  htmlUrl: string
  isDeleted: boolean
  isPrivate: boolean
  isSelected: boolean
  owner: string
  ownerType: string
  repoDescription: any
  repoName: string
  updatedAt: string
  gitHubRepoId: number
}
