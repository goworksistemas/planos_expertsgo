import * as React from 'react'
import { cn } from '@/lib/utils'

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value: number
  onValueChange: (value: number) => void
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, onValueChange, min = 1, max = 12, step = 1, ...props }, ref) => (
    <input
      ref={ref}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onValueChange(Number(e.target.value))}
      className={cn(
        'h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary',
        '[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:shadow-primary/30',
        className,
      )}
      {...props}
    />
  ),
)
Slider.displayName = 'Slider'

export { Slider }
