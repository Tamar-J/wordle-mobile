/** Make an array of arrays copy 
 * @param arrayOfArrays - An array of arrays of string 
 * @returns Returns a copy of the array inserted
 * */
export const copyArray = (arrayOfArrays: string[][]) => {
  return [...arrayOfArrays.map(rows => [...rows])]
}

export const getDayOfTheYear = () => {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = +now - +start
  const oneDay = 1000 * 60 * 60 * 24
  const day = Math.floor(diff / oneDay)
  return day
}

export const getDayYearKey = () => {
  const currentYear = new Date().getFullYear()
  return `day-${getDayOfTheYear()}-${currentYear}`
}