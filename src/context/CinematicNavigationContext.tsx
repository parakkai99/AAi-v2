/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Context: CinematicNavigationContext
 * Manages spatial travel state machine, telemetry, configuration, and transitions
 */

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  CinematicConfig,
  CinematicJourney,
  CinematicStage,
  CinematicWaypoint,
  CinematicDirection,
  JourneyScale,
  resolveJourneyScale,
  GalaxyMood,
  TransitionStyle,
} from '../contracts/cinematic';
import { cinematicAudio } from '../services/cinematicAudio';

export interface CinematicContextValue {
  config: CinematicConfig;
  updateConfig: (partial: Partial<CinematicConfig>) => void;
  resetConfig: () => void;
  journey: CinematicJourney | null;
  stage: CinematicStage;
  isTravelling: boolean;
  startJourney: (
    origin: CinematicWaypoint,
    destination: CinematicWaypoint,
    onArrived?: () => void
  ) => void;
  skipJourney: () => void;
  cancelJourney: () => void;
  prefersReducedMotion: boolean;
}

const DEFAULT_CONFIG: CinematicConfig = {
  enabled: true,
  mood: 'CALM',
  style: 'STAR_TRAIL_VOYAGE',
  speed: 'cinematic',
  soundEnabled: false,
  showTelemetryHUD: true,
  allowSkip: true,
  particlesIntensity: 'medium',
};

const CinematicContext = createContext<CinematicContextValue | null>(null);

const SPEED_TIMINGS: Record<string, { before: number; travelling: number; after: number }> = {
  cinematic: { before: 350, travelling: 1350, after: 420 },
  swift: { before: 180, travelling: 700, after: 280 },
  instant: { before: 50, travelling: 100, after: 80 },
};

export const CinematicNavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Respects prefers-reduced-motion media query
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Session-based configuration with localStorage persistence
  const [config, setConfig] = useState<CinematicConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('aai_cinematic_config');
        if (saved) {
          const parsed = JSON.parse(saved);
          return { ...DEFAULT_CONFIG, ...parsed };
        }
      } catch {
        // Use default
      }
    }
    return DEFAULT_CONFIG;
  });

  const updateConfig = useCallback((partial: Partial<CinematicConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...partial };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('aai_cinematic_config', JSON.stringify(updated));
        } catch {
          // Ignore
        }
      }
      return updated;
    });
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('aai_cinematic_config');
      } catch {
        // Ignore
      }
    }
  }, []);

  useEffect(() => {
    cinematicAudio.setMuted(!config.soundEnabled);
  }, [config.soundEnabled]);

  // Journey State Machine
  const [journey, setJourney] = useState<CinematicJourney | null>(null);
  const [stage, setStage] = useState<CinematicStage>('idle');

  const onArrivedCallbackRef = useRef<(() => void) | null>(null);
  const timerBeforeRef = useRef<number | null>(null);
  const timerTravelRef = useRef<number | null>(null);
  const timerAfterRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const clearAllTimers = useCallback(() => {
    if (timerBeforeRef.current) clearTimeout(timerBeforeRef.current);
    if (timerTravelRef.current) clearTimeout(timerTravelRef.current);
    if (timerAfterRef.current) clearTimeout(timerAfterRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    timerBeforeRef.current = null;
    timerTravelRef.current = null;
    timerAfterRef.current = null;
    animationFrameRef.current = null;
  }, []);

  const cancelJourney = useCallback(() => {
    clearAllTimers();
    setStage('idle');
    setJourney(null);
    onArrivedCallbackRef.current = null;
  }, [clearAllTimers]);

  const skipJourney = useCallback(() => {
    clearAllTimers();
    if (onArrivedCallbackRef.current) {
      onArrivedCallbackRef.current();
    }
    setStage('after');
    cinematicAudio.playArrivalBeacon();
    timerAfterRef.current = window.setTimeout(() => {
      setStage('idle');
      setJourney(null);
      onArrivedCallbackRef.current = null;
    }, 250);
  }, [clearAllTimers]);

  const startJourney = useCallback(
    (origin: CinematicWaypoint, destination: CinematicWaypoint, onArrived?: () => void) => {
      // If disabled or instant speed, arrive immediately
      if (!config.enabled || config.speed === 'instant') {
        if (onArrived) onArrived();
        return;
      }

      clearAllTimers();
      onArrivedCallbackRef.current = onArrived || null;

      // Determine navigation direction
      let direction: CinematicDirection = 'lateral';
      if (destination.layer > origin.layer) {
        direction = 'descend';
      } else if (destination.layer < origin.layer) {
        direction = 'ascend';
      }

      // Resolve distinctive layer-specific spatial scale
      const scale: JourneyScale = resolveJourneyScale(origin, destination);

      // Compute pseudo-astronomical distance and velocity
      const dx = destination.coordinates.x - origin.coordinates.x;
      const dy = destination.coordinates.y - origin.coordinates.y;
      const dz = destination.coordinates.z - origin.coordinates.z;
      const rawDist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 12;
      const distanceLy = `${(rawDist * 0.42).toFixed(2)} kly`;
      const velocity = direction === 'descend' ? '0.94c Warp' : '0.88c Ascent';
      const warpFactor = direction === 'descend' ? 8.4 : 7.2;
      const headingAngle = Math.atan2(dy, dx) * (180 / Math.PI);

      // Timing: If user prefers reduced motion, provide concise controlled transition
      const baseTimings = SPEED_TIMINGS[config.speed] || SPEED_TIMINGS.cinematic;
      const timings = prefersReducedMotion
        ? { before: 120, travelling: 350, after: 150 }
        : baseTimings;

      const initialJourney: CinematicJourney = {
        id: `flight-${Date.now()}`,
        origin,
        destination,
        direction,
        scale,
        stage: 'before',
        progress: 0,
        metrics: {
          velocity,
          distanceLy,
          warpFactor,
          headingAngle,
          estimatedFlightMs: timings.travelling,
        },
        startedAt: Date.now(),
      };

      setJourney(initialJourney);
      setStage('before');

      // Play lock sound
      if (!prefersReducedMotion) {
        cinematicAudio.playTargetLock();
      }

      // STAGE 1 -> STAGE 2: AFTER 'before' TIMING
      timerBeforeRef.current = window.setTimeout(() => {
        setStage('travelling');
        cinematicAudio.playWarpSweep(direction, timings.travelling / 1000);

        const travelStartTime = Date.now();

        const updateProgress = () => {
          const elapsed = Date.now() - travelStartTime;
          const pct = Math.min(100, Math.round((elapsed / timings.travelling) * 100));

          setJourney((prev) => (prev ? { ...prev, stage: 'travelling', progress: pct } : null));

          if (pct < 100) {
            animationFrameRef.current = requestAnimationFrame(updateProgress);
          } else {
            // STAGE 2 COMPLETE -> STAGE 3: AFTER
            setStage('after');
            cinematicAudio.playArrivalBeacon();

            // Fire the page state transition now so target arrives while in settling deceleration
            if (onArrivedCallbackRef.current) {
              onArrivedCallbackRef.current();
            }

            timerAfterRef.current = window.setTimeout(() => {
              setStage('idle');
              setJourney(null);
              onArrivedCallbackRef.current = null;
            }, timings.after);
          }
        };

        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }, timings.before);
    },
    [config.enabled, config.speed, prefersReducedMotion, clearAllTimers]
  );

  // Keyboard shortcut: Esc skips flight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && stage !== 'idle') {
        skipJourney();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, skipJourney]);

  return (
    <CinematicContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        journey,
        stage,
        isTravelling: stage !== 'idle',
        startJourney,
        skipJourney,
        cancelJourney,
        prefersReducedMotion,
      }}
    >
      {children}
    </CinematicContext.Provider>
  );
};

export const useCinematicNavigation = (): CinematicContextValue => {
  const ctx = useContext(CinematicContext);
  if (!ctx) {
    throw new Error('useCinematicNavigation must be used within a CinematicNavigationProvider');
  }
  return ctx;
};
