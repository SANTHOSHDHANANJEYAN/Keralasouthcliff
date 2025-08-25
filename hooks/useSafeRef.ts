'use client';

import { useRef, useCallback, MutableRefObject } from 'react';

/**
 * A safer version of useRef that provides additional safety checks
 * to prevent "Cannot read properties of undefined (reading 'ref')" errors
 */
export function useSafeRef<T>(initialValue: T | null = null): MutableRefObject<T | null> {
  const ref = useRef<T | null>(initialValue);
  
  // Wrap the ref in a Proxy for additional safety
  const safeRef = useRef(
    new Proxy(ref, {
      get(target, prop) {
        if (prop === 'current') {
          // Always return a safe value for current
          return target.current ?? null;
        }
        return target[prop as keyof typeof target];
      },
      set(target, prop, value) {
        if (prop === 'current') {
          target.current = value;
          return true;
        }
        return false;
      }
    })
  );
  
  return safeRef.current;
}

/**
 * A hook that provides a callback to safely access ref values
 */
export function useSafeRefCallback<T>(ref: MutableRefObject<T | null>) {
  return useCallback((callback: (current: T) => void) => {
    if (ref?.current) {
      try {
        callback(ref.current);
      } catch (error) {
        console.warn('🛡️ Safe ref callback caught error:', error);
      }
    }
  }, [ref]);
}

/**
 * Type guard to check if an object has a ref property safely
 */
export function hasRef<T>(obj: any): obj is { ref: MutableRefObject<T> } {
  return obj && typeof obj === 'object' && 'ref' in obj && obj.ref && typeof obj.ref === 'object';
}

/**
 * Safely access a ref property from any object
 */
export function safeRefAccess<T>(obj: any, defaultValue: T | null = null): T | null {
  try {
    if (hasRef(obj)) {
      return obj.ref.current ?? defaultValue;
    }
    return defaultValue;
  } catch (error) {
    console.warn('🛡️ Safe ref access error:', error);
    return defaultValue;
  }
}

export default useSafeRef;