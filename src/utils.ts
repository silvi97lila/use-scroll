import { RefObject } from 'react'

export const getElement = (ref: RefObject<HTMLElement>) => {
  if (!ref.current) {
    throw new Error(`Could not resolve ref object: ${ref.current}`)
  }
  return ref.current
}

export const resolveScrollValues = (element: HTMLElement | Window) => {
  if (
    element === document.body ||
    element === document.documentElement ||
    element instanceof Window
  ) {
    return {
      scrollLeft: document.body.scrollLeft || document.documentElement.scrollLeft,
      scrollTop: document.body.scrollTop || document.documentElement.scrollTop,
      scrollWidth: document.body.scrollWidth || document.documentElement.scrollWidth,
      clientWidth: document.body.clientWidth || document.documentElement.clientWidth,
      clientHeight: document.body.clientHeight || document.documentElement.clientHeight,
      scrollHeight: document.body.scrollHeight || document.documentElement.scrollHeight,
    }
  }
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop,
    scrollWidth: element.scrollWidth,
    clientWidth: element.clientWidth,
    clientHeight: element.clientHeight,
    scrollHeight: element.scrollHeight,
  }
}

/**
 * Validate if element passed to the function is valid.
 * @param element {HTMLElement | Window}
 */
export function validateElement(element?: HTMLElement | Window) {
  if (element === undefined) {
    throw new Error(`The element passed to scroller() was undefined`)
  }
  if (!(element instanceof HTMLElement || Window)) {
    throw new TypeError(
      `
      The element passed to scroller() must be a valid element. 
      You passed ${element}.
      `
    )
  }
}

export type ScrollableElement = (Element & HTMLElement) | Window

/**
 * If the currentTarget is the window then we return the scrollX/Y position.
 * If not (ie the currentTarget is a DOM element), then we return scrollLeft/Top
 * @param event
 */
export function scrollValues(element: ScrollableElement) {
  const { scrollX, scrollY, scrollLeft, scrollTop } = element as Element & Window
  return {
    scrollTop: scrollY ?? scrollTop ?? 0,
    scrollLeft: scrollX ?? scrollLeft ?? 0,
  }
}

/**
 * easeOutQuart Easing Function
 * @param  {number} t - current time
 * @param  {number} b - start value
 * @param  {number} c - change in value
 * @param  {number} d - duration
 * @return {number} - calculated value
 */
export function easeOutQuart(t: number, b: number, c: number, d: number) {
  t /= d / 2
  if (t < 1) {
    return (c / 2) * t * t + b
  }
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}