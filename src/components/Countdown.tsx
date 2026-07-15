import { useEffect, useState } from 'react'

const TARGET = new Date('2027-01-17T00:00:00').getTime()

function calc() {
  const diff = Math.max(0, TARGET - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  }
}

function Tile({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative bg-white/10 backdrop-blur-sm rounded-lg w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-x-0 top-1/2 h-px bg-black/20" />
        <span className="font-bold text-3xl sm:text-4xl md:text-5xl text-white tabular-nums relative">
          {display}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-white/40">
        {label}
      </span>
    </div>
  )
}

function Separator() {
  return (
    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/30 self-start mt-5 sm:mt-6 md:mt-7">
      :
    </span>
  )
}

export default function Countdown() {
  const [time, setTime] = useState(calc)

  useEffect(() => {
    const id = setInterval(() => setTime(calc), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex items-start gap-2 sm:gap-3">
      <Tile value={time.days} label="Days" />
      <Separator />
      <Tile value={time.hours} label="Hours" />
      <Separator />
      <Tile value={time.minutes} label="Min" />
      <Separator />
      <Tile value={time.seconds} label="Sec" />
    </div>
  )
}
