import { Solar } from "lunar-javascript"

export function solarToLunar(year: number, month: number, day: number): { year: number; month: number; day: number } {
  const solar = Solar.fromYmd(year, month, day)
  const lunar = solar.getLunar()
  return {
    year: lunar.getYear(),
    month: lunar.getMonth(),
    day: lunar.getDay(),
  }
}

