/**
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 *
 * Context: UniversalNavigationContext
 * Canonical universal navigation coordinator across all 7 entry points:
 * 1. Main Universe (UniverseStage)
 * 2. Left Navigation Rail (ContextualNavigationRail)
 * 3. Right Intelligence Rail (ContextualIntelligenceRail)
 * 4. Header Global Intent Search (IntentSearch)
 * 5. Intent Core Search (IntentCoreHome)
 * 6. Breadcrumb (DomainContextBanner)
 * 7. Up Level (DomainContextBanner & SolutionDetail)
 *
 * Architecture:
 * ANY USER NAVIGATION -> CANONICAL TARGET -> RESOLVE FROM & TO WAYPOINTS -> CINEMATIC ENGINE -> DESTINATION STATE
 */

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useArchitectAny } from './ArchitectAnyContext';
import { useCinematicNavigation } from './CinematicNavigationContext';
import {
  CatalogLayerNumber,
  CinematicWaypoint,
  SpatialCoordinates,
} from '../contracts/cinematic';
import { SearchResultItem } from '../contracts/intent';
import { catalogRepository } from '../repositories/catalogRepository';
import domainsData from '@/data/universe/domains.json';

export type UniversalNavigationTarget =
  | {
      layer: 0;
      query?: string;
    }
  | {
      layer: 1;
    }
  | {
      layer: 2;
      domainId: string;
      subdomainId?: string;
      name?: string;
    }
  | {
      layer: 3;
      domainId: string;
      subdomainId?: string;
      capabilityId: string;
      name?: string;
    }
  | {
      layer: 4;
      domainId: string;
      subdomainId?: string;
      capabilityId?: string;
      bundleId: string;
      name?: string;
    }
  | {
      layer: 5;
      solutionId: string;
      domainId?: string;
      name?: string;
    }
  | {
      type: 'search-result';
      result: SearchResultItem;
    }
  | {
      type: 'up-level';
    }
  | {
      type: 'breadcrumb';
      targetLayer: CatalogLayerNumber;
    };

export interface UniversalNavigationContextValue {
  isIntentCoreActive: boolean;
  setIsIntentCoreActive: (active: boolean) => void;
  selectedSolutionId: string | null;
  setSelectedSolutionId: (id: string | null) => void;
  intentCoreQuery: string;
  setIntentCoreQuery: (query: string) => void;
  currentWaypoint: CinematicWaypoint;
  navigateTo: (
    target: UniversalNavigationTarget,
    options?: { skipCinematic?: boolean; onComplete?: () => void }
  ) => Promise<void>;
}

const UniversalNavigationContext = createContext<UniversalNavigationContextValue | null>(null);

function getDomainColor(domainId?: string | null): string {
  if (!domainId) return '#00e3fd';
  const found = (domainsData as any[]).find((d) => d.id === domainId);
  return found?.visual?.color || '#00e3fd';
}

function getDomainName(domainId?: string | null): string {
  if (!domainId) return 'Domain';
  const found = (domainsData as any[]).find((d) => d.id === domainId);
  return found?.name || domainId;
}

export const UniversalNavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { intent, setIntent, clearIntent, setLocation } = useArchitectAny();
  const { startJourney, config: cinematicConfig } = useCinematicNavigation();

  const [isIntentCoreActive, setIsIntentCoreActive] = useState<boolean>(false);
  const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(null);
  const [intentCoreQuery, setIntentCoreQuery] = useState<string>('');

  // 1. Derive Current Waypoint (Origin) dynamically from application state
  const currentWaypoint = useMemo<CinematicWaypoint>(() => {
    if (isIntentCoreActive) {
      return {
        layer: 0,
        layerLabel: 'AAi Intent Core',
        id: 'INTENT-CORE',
        name: 'AAi Intelligence Core',
        code: 'INTENT',
        color: '#00e3fd',
        coordinates: { x: 50, y: 50, z: 0, sector: 'SEC-INTENT-CORE' },
        description: 'Intelligence center of the ArchitectAny universe',
      };
    }

    if (selectedSolutionId) {
      return {
        layer: 5,
        layerLabel: 'L5 Solution Workspace',
        id: selectedSolutionId,
        name: intent.category || 'Solution Workspace',
        code: selectedSolutionId,
        color: '#34d399',
        coordinates: { x: 50, y: 50, z: -2500, sector: `SEC-SOL-${selectedSolutionId}` },
      };
    }

    if (intent.solutionBundleId) {
      return {
        layer: 4,
        layerLabel: 'L4 Solution Architecture Bundle',
        id: intent.solutionBundleId,
        name: 'Solution Bundle',
        code: intent.solutionBundleId,
        color: '#818cf8',
        coordinates: { x: 90, y: 95, z: -2200, sector: `SEC-${intent.solutionBundleId}` },
      };
    }

    if (intent.capabilityId) {
      return {
        layer: 3,
        layerLabel: 'L3 Solution Capability',
        id: intent.capabilityId,
        name: 'Capability Node',
        code: intent.capabilityId,
        color: '#38bdf8',
        coordinates: { x: 80, y: 85, z: -1600, sector: `SEC-${intent.capabilityId}` },
      };
    }

    if (intent.subdomainId) {
      const domColor = getDomainColor(intent.domainId);
      return {
        layer: 2,
        layerLabel: 'L2 Business Subdomain',
        id: intent.subdomainId,
        name: 'Business Sub-World',
        code: intent.subdomainId,
        color: domColor,
        coordinates: { x: 65, y: 70, z: -1000, sector: `SEC-${intent.subdomainId}` },
      };
    }

    if (intent.domainId) {
      const domColor = getDomainColor(intent.domainId);
      const domName = getDomainName(intent.domainId);
      return {
        layer: 2,
        layerLabel: 'L2 Business World',
        id: intent.domainId,
        name: domName,
        code: intent.domainId,
        color: domColor,
        coordinates: { x: 50, y: 50, z: -800, sector: `SEC-${intent.domainId}` },
      };
    }

    // Default: Root Universe (M01 3D Galaxy)
    return {
      layer: 1,
      layerLabel: 'L1 Domain Universe',
      id: 'L1-UNIVERSE-CORE',
      name: 'ArchitectAny Solution Universe',
      code: 'M01',
      color: '#00e3fd',
      coordinates: { x: 50, y: 50, z: 0, sector: 'SEC-UNIVERSE-CORE' },
      description: 'Cosmic 3D Galaxy Orbit',
    };
  }, [isIntentCoreActive, selectedSolutionId, intent]);

  // 2. Canonical Navigation Handler: Routes all 7 entry points through the same pipeline
  const navigateTo = useCallback(
    async (
      target: UniversalNavigationTarget,
      options?: { skipCinematic?: boolean; onComplete?: () => void }
    ) => {
      let destWaypoint: CinematicWaypoint;
      let applyState: () => void;

      // --- Resolution 1, 2, 3: Type-based Targets ---
      if ('type' in target) {
        if (target.type === 'up-level') {
          if (selectedSolutionId) {
            // L5 -> L4 or L2
            const targetDomainId = intent.domainId || 'D06';
            const domName = getDomainName(targetDomainId);
            destWaypoint = {
              layer: 2,
              layerLabel: 'L2 Business World',
              id: targetDomainId,
              name: domName,
              code: targetDomainId,
              color: getDomainColor(targetDomainId),
              coordinates: { x: 50, y: 50, z: -800, sector: `SEC-${targetDomainId}` },
              description: `Ascending to Business World: ${domName}`,
            };
            applyState = () => {
              setSelectedSolutionId(null);
              setIsIntentCoreActive(false);
              setIntent({ solutionId: null });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            };
          } else if (intent.solutionBundleId) {
            // L4 -> L3
            destWaypoint = {
              layer: 3,
              layerLabel: 'L3 Solution Capability',
              id: intent.capabilityId || 'CAP',
              name: 'Capability Node',
              code: intent.capabilityId || 'CAP',
              color: '#38bdf8',
              coordinates: { x: 80, y: 85, z: -1600, sector: 'SEC-CAP' },
              description: 'Ascending to Capability View',
            };
            applyState = () => {
              setIsIntentCoreActive(false);
              setSelectedSolutionId(null);
              setIntent({ solutionBundleId: null, solutionId: null });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            };
          } else if (intent.capabilityId) {
            // L3 -> L2
            destWaypoint = {
              layer: 2,
              layerLabel: 'L2 Business Subdomain',
              id: intent.subdomainId || intent.domainId || 'SUB',
              name: 'Sub-World',
              code: intent.subdomainId || intent.domainId || 'SUB',
              color: getDomainColor(intent.domainId),
              coordinates: { x: 65, y: 70, z: -1000, sector: 'SEC-SUB' },
              description: 'Ascending to Sub-World View',
            };
            applyState = () => {
              setIsIntentCoreActive(false);
              setSelectedSolutionId(null);
              setIntent({ capabilityId: null, solutionBundleId: null, solutionId: null });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            };
          } else if (intent.domainId || isIntentCoreActive) {
            // L2 or L0 -> L1 Universe
            destWaypoint = {
              layer: 1,
              layerLabel: 'L1 Domain Universe',
              id: 'L1-UNIVERSE-CORE',
              name: 'ArchitectAny Solution Universe',
              code: 'M01',
              color: '#00e3fd',
              coordinates: { x: 50, y: 50, z: 0, sector: 'SEC-CORE-001' },
              description: 'Ascending to 3D Galaxy Orbit',
            };
            applyState = () => {
              setSelectedSolutionId(null);
              setIsIntentCoreActive(false);
              clearIntent();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            };
          } else {
            return;
          }
        }

        // --- Resolution 2: Breadcrumb target ---
        else if (target.type === 'breadcrumb') {
          if (target.targetLayer === 1) {
            // Return to Universe 3D Galaxy
            destWaypoint = {
              layer: 1,
              layerLabel: 'L1 Domain Universe',
              id: 'L1-UNIVERSE-CORE',
              name: 'ArchitectAny Solution Universe',
              code: 'M01',
              color: '#00e3fd',
              coordinates: { x: 50, y: 50, z: 0, sector: 'SEC-CORE-001' },
              description: 'Ascending to 3D Orbit Galaxy',
            };
            applyState = () => {
              setSelectedSolutionId(null);
              setIsIntentCoreActive(false);
              clearIntent();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            };
          } else if (target.targetLayer === 2) {
            const domId = intent.domainId || 'D06';
            destWaypoint = {
              layer: 2,
              layerLabel: 'L2 Business World',
              id: domId,
              name: getDomainName(domId),
              code: domId,
              color: getDomainColor(domId),
              coordinates: { x: 50, y: 50, z: -800, sector: `SEC-${domId}` },
            };
            applyState = () => {
              setSelectedSolutionId(null);
              setIsIntentCoreActive(false);
              setIntent({
                capabilityId: null,
                solutionBundleId: null,
                solutionId: null,
              });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            };
          } else if (target.targetLayer === 3) {
            destWaypoint = {
              layer: 3,
              layerLabel: 'L3 Solution Capability',
              id: intent.capabilityId || 'CAP',
              name: 'Capability Node',
              code: intent.capabilityId || 'CAP',
              color: '#38bdf8',
              coordinates: { x: 80, y: 85, z: -1600, sector: 'SEC-CAP' },
            };
            applyState = () => {
              setSelectedSolutionId(null);
              setIsIntentCoreActive(false);
              setIntent({
                solutionBundleId: null,
                solutionId: null,
              });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            };
          } else {
            return;
          }
        }

        // --- Resolution 3: Search Result item ---
        else if (target.type === 'search-result') {
        const item = target.result;
        const layer = (item.meta?.layer as number) || (item.type === 'solution' ? 5 : item.type === 'domain' ? 2 : 2);
        const path = (Array.isArray(item.meta?.path) ? item.meta.path : []) as any[];

        if (item.type === 'service' && item.location) {
          setLocation({
            city: item.location.city,
            pincode: item.location.pincode,
          });
        }

        if (layer === 1) {
          // L1 Domain
          const domainId = item.id;
          const domName = (item.meta?.rawName as string) || item.name;
          destWaypoint = {
            layer: 2,
            layerLabel: 'L2 Business World',
            id: domainId,
            name: domName,
            code: domainId,
            color: getDomainColor(domainId),
            coordinates: { x: 50, y: 50, z: -800, sector: `SEC-${domainId}` },
            description: item.description,
          };
          applyState = () => {
            setIsIntentCoreActive(false);
            setSelectedSolutionId(null);
            setIntent({
              domainId,
              subdomainId: null,
              capabilityId: null,
              solutionBundleId: null,
              solutionId: null,
              path: [{ id: domainId, name: domName, layer: 1 }],
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          };
        } else if (layer === 2) {
          // L2 Subdomain
          const domainId = item.domainId || (path.find((p) => p.layer === 1)?.id) || 'D06';
          const subId = item.id;
          destWaypoint = {
            layer: 2,
            layerLabel: 'L2 Business Subdomain',
            id: subId,
            name: item.name,
            code: subId,
            color: getDomainColor(domainId),
            coordinates: { x: 65, y: 70, z: -1000, sector: `SEC-${subId}` },
            description: item.description,
          };
          applyState = () => {
            setIsIntentCoreActive(false);
            setSelectedSolutionId(null);
            setIntent({
              domainId,
              subdomainId: subId,
              capabilityId: null,
              solutionBundleId: null,
              solutionId: null,
              path: path.length > 0 ? path : [
                { id: domainId, name: getDomainName(domainId), layer: 1 },
                { id: subId, name: item.name, layer: 2 },
              ],
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          };
        } else if (layer === 3) {
          // L3 Capability
          const domainId = item.domainId || (path.find((p) => p.layer === 1)?.id) || 'D06';
          const subId = (item.meta?.parentId as string) || (path.find((p) => p.layer === 2)?.id) || '';
          const capId = item.id;
          destWaypoint = {
            layer: 3,
            layerLabel: 'L3 Solution Capability',
            id: capId,
            name: item.name,
            code: capId,
            color: '#38bdf8',
            coordinates: { x: 80, y: 85, z: -1600, sector: `SEC-${capId}` },
            description: item.description,
          };
          applyState = () => {
            setIsIntentCoreActive(false);
            setSelectedSolutionId(null);
            setIntent({
              domainId,
              subdomainId: subId || null,
              capabilityId: capId,
              solutionBundleId: null,
              solutionId: null,
              path: path.length > 0 ? path : undefined,
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          };
        } else if (layer === 4) {
          // L4 Bundle
          const domainId = item.domainId || (path.find((p) => p.layer === 1)?.id) || 'D06';
          const bundleId = item.id;
          destWaypoint = {
            layer: 4,
            layerLabel: 'L4 Solution Architecture Bundle',
            id: bundleId,
            name: item.name,
            code: bundleId,
            color: '#818cf8',
            coordinates: { x: 90, y: 95, z: -2200, sector: `SEC-${bundleId}` },
            description: item.description,
          };
          applyState = () => {
            setIsIntentCoreActive(false);
            setSelectedSolutionId(null);
            setIntent({
              domainId,
              solutionBundleId: bundleId,
              solutionId: null,
              path: path.length > 0 ? path : undefined,
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          };
        } else {
          // L5 Solution
          const solId = item.id;
          const domainId = item.domainId || (path.find((p) => p.layer === 1)?.id) || 'D06';
          destWaypoint = {
            layer: 5,
            layerLabel: 'L5 Solution Workspace',
            id: solId,
            name: item.name,
            code: solId,
            color: '#34d399',
            coordinates: { x: 50, y: 50, z: -2500, sector: `SEC-SOL-${solId}` },
            description: item.description,
          };
          applyState = () => {
            setIsIntentCoreActive(false);
            setSelectedSolutionId(solId);
            setIntent({
              domainId,
              solutionId: solId,
              path: path.length > 0 ? path : undefined,
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          };
        }
      }
    }

    // --- Resolution 4: Explicit Layer Navigation (0, 1, 2, 3, 4, 5) ---
    else if ('layer' in target) {
        if (target.layer === 0) {
          // Intent Core
          destWaypoint = {
            layer: 0,
            layerLabel: 'AAi Intent Core',
            id: 'INTENT-CORE',
            name: 'AAi Intelligence Core',
            code: 'INTENT',
            color: '#00e3fd',
            coordinates: { x: 50, y: 50, z: 0, sector: 'SEC-INTENT-CORE' },
            description: target.query || 'Entering the intelligence center of the Universe',
          };
          applyState = () => {
            setIsIntentCoreActive(true);
            setSelectedSolutionId(null);
            if (target.query) setIntentCoreQuery(target.query);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          };
        } else if (target.layer === 1) {
          // Universe Root
          destWaypoint = {
            layer: 1,
            layerLabel: 'L1 Domain Universe',
            id: 'L1-UNIVERSE-CORE',
            name: 'ArchitectAny Solution Universe',
            code: 'M01',
            color: '#00e3fd',
            coordinates: { x: 50, y: 50, z: 0, sector: 'SEC-UNIVERSE-CORE' },
            description: 'Ascending to 3D Orbit Galaxy',
          };
          applyState = () => {
            setSelectedSolutionId(null);
            setIsIntentCoreActive(false);
            clearIntent();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          };
        } else if (target.layer === 2) {
          // Domain
          const domId = target.domainId;
          const domName = target.name || getDomainName(domId);
          destWaypoint = {
            layer: 2,
            layerLabel: 'L2 Business World',
            id: domId,
            name: domName,
            code: domId,
            color: getDomainColor(domId),
            coordinates: { x: 50, y: 50, z: -800, sector: `SEC-${domId}` },
          };
          applyState = () => {
            setIsIntentCoreActive(false);
            setSelectedSolutionId(null);
            setIntent({
              domainId: domId,
              subdomainId: target.subdomainId || null,
              capabilityId: null,
              solutionBundleId: null,
              solutionId: null,
              path: [
                { id: domId, name: domName, layer: 1 },
                ...(target.subdomainId ? [{ id: target.subdomainId, name: 'Subdomain', layer: 2 }] : []),
              ],
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          };
        } else if (target.layer === 3) {
          // Capability
          destWaypoint = {
            layer: 3,
            layerLabel: 'L3 Solution Capability',
            id: target.capabilityId,
            name: target.name || 'Capability Node',
            code: target.capabilityId,
            color: '#38bdf8',
            coordinates: { x: 80, y: 85, z: -1600, sector: `SEC-${target.capabilityId}` },
          };
          applyState = () => {
            setIsIntentCoreActive(false);
            setSelectedSolutionId(null);
            setIntent({
              domainId: target.domainId,
              subdomainId: target.subdomainId || null,
              capabilityId: target.capabilityId,
              solutionBundleId: null,
              solutionId: null,
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          };
        } else if (target.layer === 4) {
          // Bundle
          destWaypoint = {
            layer: 4,
            layerLabel: 'L4 Solution Architecture Bundle',
            id: target.bundleId,
            name: target.name || 'Solution Bundle',
            code: target.bundleId,
            color: '#818cf8',
            coordinates: { x: 90, y: 95, z: -2200, sector: `SEC-${target.bundleId}` },
          };
          applyState = () => {
            setIsIntentCoreActive(false);
            setSelectedSolutionId(null);
            setIntent({
              domainId: target.domainId,
              subdomainId: target.subdomainId || null,
              capabilityId: target.capabilityId || null,
              solutionBundleId: target.bundleId,
              solutionId: null,
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          };
        } else if (target.layer === 5) {
          // Solution
          const solId = target.solutionId;
          destWaypoint = {
            layer: 5,
            layerLabel: 'L5 Solution Workspace',
            id: solId,
            name: target.name || 'Solution Workspace',
            code: solId,
            color: '#34d399',
            coordinates: { x: 50, y: 50, z: -2500, sector: `SEC-SOL-${solId}` },
          };
          applyState = () => {
            setIsIntentCoreActive(false);
            setSelectedSolutionId(solId);
            setIntent({
              ...(target.domainId ? { domainId: target.domainId } : {}),
              solutionId: solId,
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          };
        } else {
          return;
        }
      } else {
        return;
      }

      // Check if origin and destination are identical
      const isIdentical = currentWaypoint.id === destWaypoint.id && currentWaypoint.layer === destWaypoint.layer;
      if (isIdentical) {
        applyState();
        options?.onComplete?.();
        return;
      }

      // Trigger Cinematic Engine or Execute Direct Transition
      if (cinematicConfig.enabled && !options?.skipCinematic) {
        startJourney(currentWaypoint, destWaypoint, () => {
          applyState();
          options?.onComplete?.();
        });
      } else {
        applyState();
        options?.onComplete?.();
      }
    },
    [
      currentWaypoint,
      intent,
      selectedSolutionId,
      isIntentCoreActive,
      cinematicConfig.enabled,
      startJourney,
      setIntent,
      clearIntent,
      setLocation,
    ]
  );

  return (
    <UniversalNavigationContext.Provider
      value={{
        isIntentCoreActive,
        setIsIntentCoreActive,
        selectedSolutionId,
        setSelectedSolutionId,
        intentCoreQuery,
        setIntentCoreQuery,
        currentWaypoint,
        navigateTo,
      }}
    >
      {children}
    </UniversalNavigationContext.Provider>
  );
};

export const useUniversalNavigation = (): UniversalNavigationContextValue => {
  const context = useContext(UniversalNavigationContext);
  if (!context) {
    throw new Error('useUniversalNavigation must be used within a UniversalNavigationProvider');
  }
  return context;
};
