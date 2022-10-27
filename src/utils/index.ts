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

/** 
 * Make a reverse time digital clock using the seconds remaining to the end of the day.
 * @param secondsTillTomorrow Receives a number that is the seconds remaining to the end of the day.
 * @return Returns a string like a digital clock with the time remaining to the end of the day.
 * */ 
export const digitalClockReverse = (secondsTillTomorrow: number) => {
  const hours =  Math.floor(secondsTillTomorrow / (60 * 60))
  const minutes = Math.floor((secondsTillTomorrow % (60 * 60)) / 60)
  const seconds = Math.floor(secondsTillTomorrow % 60)

  const hoursWithZero = hours < 10 ? '0'+hours : hours 
  const minutesWithZero = minutes < 10 ? '0'+minutes : minutes 
  const secondsWithZero = seconds < 10 ? '0'+seconds : seconds 
  
  return `${hoursWithZero}:${minutesWithZero}:${secondsWithZero}`
}