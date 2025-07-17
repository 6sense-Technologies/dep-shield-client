export interface AllRepoSharedUsers {
  data: SingleRepoSharedUsers[]
  count: number
}

export interface SingleRepoSharedUsers {
  _id: string
  repositoryName: string
  sharedByName: string
  avatarUrl: string
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
