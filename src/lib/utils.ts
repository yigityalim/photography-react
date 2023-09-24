import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { MotionValue, useTransform } from 'framer-motion'

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(...inputs))
}

export function useParallax(value: MotionValue<number>, distance: number): MotionValue<number> {
    return useTransform(value, [0, 1], [-distance, distance])
}
