export type AllRepoSharedUsers = SingleRepoSharedUsers[]

export interface SingleRepoSharedUsers {
  _id: string
  repositoryId: string
  sharedWith: string
  sharedBy: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}
