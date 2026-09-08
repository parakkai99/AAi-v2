/**
 * P-PARAKKAI-002 — Parakkai Visual Asset Registry & Provenance
 * Architect: Vijay Kumar K.
 * Platform: ArchitectAny (AAi)
 * IP Owner: ArchitectAny / Vijay Kumar K.
 * Status: ACTIVE
 * Version: v0.1.1
 */

export interface ParakkaiVisualAsset {
  id: string;
  name: string;
  provenance: 'SOURCE' | 'REFERENCE' | 'DERIVED' | 'PUBLISHED' | 'USER_UPLOAD';
  description: string;
  defaultDataUrl?: string;
  userOverrideUrl?: string;
}

const STORAGE_KEY_PREFIX = 'parakkai_asset_override_';

class ParakkaiAssetService {
  private listeners: Array<() => void> = [];

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  getAssetUrl(slotKey: string, fallbackUrl: string): string {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${slotKey}`);
        if (stored && stored.length > 50) {
          return stored;
        }
      } catch {
        // Ignore localStorage error
      }
    }
    return fallbackUrl;
  }

  setAssetOverride(slotKey: string, dataUrl: string) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`${STORAGE_KEY_PREFIX}${slotKey}`, dataUrl);
        this.notify();
      } catch (err) {
        console.warn('Failed to save asset to localStorage (quota or disabled):', err);
      }
    }
  }

  clearAssetOverride(slotKey: string) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(`${STORAGE_KEY_PREFIX}${slotKey}`);
        this.notify();
      } catch {
        // Ignore
      }
    }
  }

  resetAllOverrides() {
    this.clearAssetOverride('hero_facade');
    this.clearAssetOverride('aerial_bg');
    this.clearAssetOverride('lake_bg');
  }

  hasCustomAsset(slotKey: string): boolean {
    if (typeof window !== 'undefined') {
      try {
        return !!localStorage.getItem(`${STORAGE_KEY_PREFIX}${slotKey}`);
      } catch {
        return false;
      }
    }
    return false;
  }
}

export const parakkaiAssetService = new ParakkaiAssetService();
