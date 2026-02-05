/**
 * Ramadan Context
 * Provides app-wide access to Ramadan detection state
 * Manages caching and API calls at the application level
 * 
 * PRICING PERIOD: Day 18 to end of Ramadan (configurable in ramadanUtils.ts)
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { isDateInRamadanPricingPeriod, getRamadanPricingConfig } from '@/utils/ramadanUtils';

interface RamadanContextType {
  isRamadanPricingPeriod: (date: Date) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  apiAvailable: boolean;
  fallbackEnabled: boolean;
  pricingConfig: ReturnType<typeof getRamadanPricingConfig>;
}

const RamadanContext = createContext<RamadanContextType | undefined>(undefined);

interface RamadanProviderProps {
  children: React.ReactNode;
  fallbackToManual?: boolean; // If API unavailable, use manual flag
}

export function RamadanProvider({
  children,
  fallbackToManual = false,
}: RamadanProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiAvailable, setApiAvailable] = useState(true);

  // Test API availability on mount
  useEffect(() => {
    const testAPI = async () => {
      try {
        const testDate = new Date();
        await isDateInRamadanPricingPeriod(testDate);
        setApiAvailable(true);
      } catch (err) {
        console.warn('Ramadan API unavailable, fallback enabled');
        setApiAvailable(false);
      }
    };
    testAPI();
  }, []);

  const checkRamadanPricingPeriod = useCallback(
    async (date: Date): Promise<boolean> => {
      if (!apiAvailable && !fallbackToManual) {
        console.warn('Ramadan API unavailable and no fallback configured');
        return false;
      }

      if (!apiAvailable && fallbackToManual) {
        // Return manual flag value
        return false; // This should be replaced with actual manual flag if needed
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await isDateInRamadanPricingPeriod(date);
        return result;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMsg);
        console.error('Error checking Ramadan pricing period:', err);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [apiAvailable, fallbackToManual]
  );

  const value: RamadanContextType = {
    isRamadanPricingPeriod: checkRamadanPricingPeriod,
    isLoading,
    error,
    apiAvailable,
    fallbackEnabled: fallbackToManual,
    pricingConfig: getRamadanPricingConfig(),
  };

  return (
    <RamadanContext.Provider value={value}>{children}</RamadanContext.Provider>
  );
}

/**
 * Hook: useRamadan
 * Access Ramadan detection anywhere in the app
 */
export function useRamadan() {
  const context = useContext(RamadanContext);
  if (!context) {
    throw new Error(
      'useRamadan must be used within a RamadanProvider. Wrap your app with <RamadanProvider>.'
    );
  }
  return context;
}

/**
 * Hook: useIsDateRamadanPricingPeriod
 * Check if a specific date is in Ramadan pricing period (day 18+)
 * Manages state automatically
 */
export function useIsDateRamadanPricingPeriod(date: Date | null) {
  const { isRamadanPricingPeriod } = useRamadan();
  const [isRamadanPricingDate, setIsRamadanPricingDate] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) {
      setIsRamadanPricingDate(false);
      return;
    }

    const check = async () => {
      setLoading(true);
      try {
        const result = await isRamadanPricingPeriod(date);
        setIsRamadanPricingDate(result);
      } catch (err) {
        console.error('Error in useIsDateRamadanPricingPeriod:', err);
        setIsRamadanPricingDate(false);
      } finally {
        setLoading(false);
      }
    };

    check();
  }, [date, isRamadanPricingPeriod]);

  return { isRamadanPricingDate, loading };
}
