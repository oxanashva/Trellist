import Bubble from '@/assets/images/gradients/bubble.svg?react'
import Snow from '@/assets/images/gradients/snow.svg?react'
import Ocean from '@/assets/images/gradients/ocean.svg?react'
import Crystal from '@/assets/images/gradients/crystal.svg?react'
import Rainbow from '@/assets/images/gradients/rainbow.svg?react'
import Peach from '@/assets/images/gradients/peach.svg?react'
import Flower from '@/assets/images/gradients/flower.svg?react'
import Earth from '@/assets/images/gradients/earth.svg?react'
import Alien from '@/assets/images/gradients/alien.svg?react'
import Volcano from '@/assets/images/gradients/volcano.svg?react'

import { FastAverageColor } from 'fast-average-color'
import type { Label } from '@/types/models'

const fac = new FastAverageColor()

export function makeId(length = 6): string {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

export function makeLorem(size = 100): string {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

export function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomPastTime(): number {
  const HOUR = 1000 * 60 * 60
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  timeout = 300
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage<T>(key: string): T | undefined {
  const data = localStorage.getItem(key)
  return data ? (JSON.parse(data) as T) : undefined
}

export function formatDate(input: number | string | Date): string {
  const date = new Date(input)

  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

// Color utils
export const labelsColorsMap: Record<string, string> = {
  'subtle green': '#BAF3DB',
  'subtle yellow': '#F5E989',
  'subtle orange': '#FCE4A6',
  'subtle red': '#FFD5D2',
  'subtle purple': '#EED7FC',

  green: '#4BCE97',
  yellow: '#EED12B',
  orange: '#FCA700',
  red: '#F87168',
  purple: '#C97CF4',

  'bold green': '#1F845A',
  'bold yellow': '#946F00',
  'bold orange': '#BD5B00',
  'bold red': '#C9372C',
  'bold purple': '#964AC0',

  'subtle blue': '#C7E2F1',
  'subtle sky': '#D1E9F9',
  'subtle lime': '#C7E2F1',
  'subtle pink': '#F1D1E9',
  'subtle black': '#D1D1D1',

  sky: '#669DF1',
  blue: '#6CC3E0',
  lime: '#94C748',
  pink: '#E774BB',
  black: '#8C8F97',

  'bold blue': '#1868DB',
  'bold sky': '#227D9B',
  'bold lime': '#5B7F24',
  'bold pink': '#AE4787',
  'bold black': '#6B6E76',
}

export const defaultLabelsColorMap: Record<string, string> = {
  green: '#4BCE97',
  yellow: '#EED12B',
  orange: '#FCA700',
  red: '#F87168',
  purple: '#C97CF4',
  sky: '#669DF1',
  blue: '#6CC3E0',
  lime: '#94C748',
  pink: '#E774BB',
  black: '#8C8F97',
}

export const coverColorsMap: Record<string, string> = {
  green: '#4BCE97',
  yellow: '#EED12B',
  orange: '#FCA700',
  red: '#F87168',
  purple: '#C97CF4',
  blue: '#669DF1',
  sky: '#6CC3E0',
  lime: '#94C748',
  pink: '#E774BB',
  black: '#8C8F97',
}

export const getLabelColor = (colorName: string): string => {
  return labelsColorsMap[colorName] || '#CCCCCC'
}

export function getDefaultLabels(): Label[] {
  return Object.keys(defaultLabelsColorMap).map((color) => ({
    _id: makeId(),
    name: '',
    color,
  }))
}

export const gradientColorsMap: Record<string, React.ComponentType> = {
  Bubble,
  Snow,
  Ocean,
  Crystal,
  Rainbow,
  Peach,
  Flower,
  Earth,
  Alien,
  Volcano,
}

export const cloudinaryGradientColorsMap: Record<string, string> = {
  Bubble: 'https://res.cloudinary.com/da9naclpy/image/upload/v1765289307/bubble_rh24m3.svg',
  Snow: 'https://res.cloudinary.com/da9naclpy/image/upload/v1765289304/snow_tqqgom.svg',
  Ocean: 'https://res.cloudinary.com/da9naclpy/image/upload/v1765289306/ocean_rkvgdo.svg',
  Crystal: 'https://res.cloudinary.com/da9naclpy/image/upload/v1765289305/crystal_gpjjtx.svg',
  Rainbow: 'https://res.cloudinary.com/da9naclpy/image/upload/v1765289306/rainbow_jqmmhp.svg',
  Peach: 'https://res.cloudinary.com/da9naclpy/image/upload/v1765289308/peach_z8j9fh.svg',
  Flower: 'https://res.cloudinary.com/da9naclpy/image/upload/v1765289305/flower_wdjcpk.svg',
  Earth: 'https://res.cloudinary.com/da9naclpy/image/upload/v1765289307/earth_t322hu.svg',
  Alien: 'https://res.cloudinary.com/da9naclpy/image/upload/v1765289304/alien_vws1af.svg',
  Volcano: 'https://res.cloudinary.com/da9naclpy/image/upload/v1765289304/volcano_up6ako.svg',
}

export function addOpacity(rgbString: string, alpha = 0.8): string {
  const values = rgbString.match(/\d+/g)
  if (!values) return rgbString
  return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${alpha})`
}

export function darkenRgb(rgbColor: string, factor = 0.8): string {
  const [r, g, b] = _getRgbComponents(rgbColor)

  const newR = Math.floor(r * factor)
  const newG = Math.floor(g * factor)
  const newB = Math.floor(b * factor)

  return `rgb(${newR}, ${newG}, ${newB})`
}

function _getRgbComponents(color: string): [number, number, number] {
  const match = color?.match(/(\d+),\s*(\d+),\s*(\d+)/)

  if (match) {
    return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]
  }

  return [0, 0, 0]
}

function _getLuminance([r, g, b]: [number, number, number]): number {
  const R_L = 0.2126
  const G_L = 0.7152
  const B_L = 0.0722

  return R_L * (r / 255) + G_L * (g / 255) + B_L * (b / 255)
}

export const getContrastingTextColor = (backgroundColor: string): string => {
  const rgb = _getRgbComponents(backgroundColor)
  const luminance = _getLuminance(rgb)

  const LUMINANCE_THRESHOLD = 0.4

  const DARK_TEXT_COLOR = 'rgb(23, 43, 77)'
  const LIGHT_TEXT_COLOR = 'white'

  return luminance < LUMINANCE_THRESHOLD ? LIGHT_TEXT_COLOR : DARK_TEXT_COLOR
}

export async function getAverageColor(imgUrl: string): Promise<string> {
  try {
    const color = await fac.getColorAsync(imgUrl)
    return color.rgb
  } catch (error) {
    console.error('Could not calculate average color:', error)
    return '#ffffff'
  }
}
