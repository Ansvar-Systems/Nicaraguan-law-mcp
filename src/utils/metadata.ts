/**
 * Response metadata utilities for Nicaraguan Law MCP.
 */

import type Database from '@ansvar/mcp-sqlite';

export interface ResponseMetadata {
  data_source: string;
  jurisdiction: string;
  disclaimer: string;
  freshness?: string;
  note?: string;
  query_strategy?: string;
}

export interface ToolResponse<T> {
  results: T;
  _metadata: ResponseMetadata;
}

export function generateResponseMetadata(
  db: InstanceType<typeof Database>,
): ResponseMetadata {
  let freshness: string | undefined;
  try {
    const row = db.prepare(
      "SELECT value FROM db_metadata WHERE key = 'built_at'"
    ).get() as { value: string } | undefined;
    if (row) freshness = row.value;
  } catch {
    // Ignore
  }

  return {
    data_source: 'Nicaraguan Law (legislacion.asamblea.gob.ni) — Asamblea Nacional de Nicaragua',
    jurisdiction: 'NI',
    disclaimer:
      'This data is sourced from the Asamblea Nacional de Nicaragua legislative portal. ' +
      'The authoritative versions are in Spanish. ' +
      'Always verify with the official legislative portal (legislacion.asamblea.gob.ni).',
    freshness,
  };
}
