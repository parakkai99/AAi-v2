/**
 * ArchitectAny AAi - PostgreSQL Data Access Boundary (Server-Side Only)
 *
 * CRITICAL SECURITY INVARIANT:
 * This repository is strictly for server-side / API service layer execution.
 * Never instantiate this in client bundles. Database credentials must be
 * read exclusively from secure environment variables (DATABASE_URL, etc.).
 */

import {
  Domain,
  Solution,
  UniverseCatalogPayload,
  IUniverseRepository,
} from '@/src/types';

export interface PostgresConfig {
  connectionString?: string;
  host?: string;
  port?: number;
  database?: string;
  user?: string;
  password?: string;
  ssl?: boolean;
}

export class PostgresUniverseRepository implements IUniverseRepository {
  private config: PostgresConfig;

  constructor(config?: PostgresConfig) {
    this.config = config || {
      connectionString: typeof process !== 'undefined' ? process.env.DATABASE_URL : undefined,
      host: typeof process !== 'undefined' ? process.env.POSTGRES_HOST : undefined,
      port: typeof process !== 'undefined' ? Number(process.env.POSTGRES_PORT) || 5432 : 5432,
      database: typeof process !== 'undefined' ? process.env.POSTGRES_DB : undefined,
      user: typeof process !== 'undefined' ? process.env.POSTGRES_USER : undefined,
      password: typeof process !== 'undefined' ? process.env.POSTGRES_PASSWORD : undefined,
      ssl: true,
    };
  }

  async getUniverseCatalog(): Promise<UniverseCatalogPayload> {
    // In production node environment with postgres driver:
    // const client = await pool.connect();
    // const domainsResult = await client.query('SELECT * FROM aai_domains ORDER BY priority, id');
    // ...
    // Fallback/Bridge to default catalog during initial migration
    const { defaultUniverseRepository } = await import('./universeRepository');
    return defaultUniverseRepository.getUniverseCatalog();
  }

  async getDomainById(id: string): Promise<Domain | null> {
    const { defaultUniverseRepository } = await import('./universeRepository');
    return defaultUniverseRepository.getDomainById(id);
  }

  async getSolutionById(id: string): Promise<Solution | null> {
    const { defaultUniverseRepository } = await import('./universeRepository');
    return defaultUniverseRepository.getSolutionById(id);
  }

  async searchSolutions(query: string): Promise<Solution[]> {
    const { defaultUniverseRepository } = await import('./universeRepository');
    return defaultUniverseRepository.searchSolutions(query);
  }
}
