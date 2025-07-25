export function capitalizeFirstLetter(string: string) {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1)
}
export function capitalizeOnlyFirstLetter(string: string) {
  return string?.charAt(0)?.toUpperCase() + string?.toLowerCase()?.slice(1)
}
export const emailValidator = /^(?![.-])[\w.-]+(?<![.-])@([\w-]+\.)+[a-zA-Z]{2,12}$/