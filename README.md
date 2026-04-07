# Nicaraguan Law MCP Server

**The nicaragua.justia.com alternative for the AI age.**

[![npm version](https://badge.fury.io/js/@ansvar%2Fnicaraguan-law-mcp.svg)](https://www.npmjs.com/package/@ansvar/nicaraguan-law-mcp)
[![MCP Registry](https://img.shields.io/badge/MCP-Registry-blue)](https://registry.modelcontextprotocol.io)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![GitHub stars](https://img.shields.io/github/stars/Ansvar-Systems/Nicaraguan-law-mcp?style=social)](https://github.com/Ansvar-Systems/Nicaraguan-law-mcp)
[![CI](https://github.com/Ansvar-Systems/Nicaraguan-law-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/Ansvar-Systems/Nicaraguan-law-mcp/actions/workflows/ci.yml)
[![Provisions](https://img.shields.io/badge/provisions-49%2C237-blue)]()

Query **1,730 Nicaraguan statutes** -- from the Código Civil and Código Penal to the Código del Trabajo, Ley de Concesión de Electricidad, Ley de Telecomunicaciones, and more -- directly from Claude, Cursor, or any MCP-compatible client.

If you're building legal tech, compliance tools, or doing Nicaraguan legal research, this is your verified reference database.

Built by [Ansvar Systems](https://ansvar.eu) -- Stockholm, Sweden

---

## Why This Exists

Nicaraguan legal research means navigating the Asamblea Nacional portal, searching through La Gaceta (Diario Oficial), and manually tracing amendments across a corpus that spans colonial-era codes and recent legislation. Whether you're:

- A **lawyer** validating citations in a brief or contract before Nicaraguan courts
- A **compliance officer** checking obligations under the Ley de Protección de Datos Personales or labor and environmental regulations
- A **legal tech developer** building tools for the Central American market
- A **researcher** tracing legislative history across 1,730 Nicaraguan statutes and 49,237 provisions

...you shouldn't need dozens of browser tabs and manual PDF cross-referencing. Ask Claude. Get the exact provision. With context.

This MCP server makes Nicaraguan law **searchable, cross-referenceable, and AI-readable**.

---

## Quick Start

### Use Remotely (No Install Needed)

> Connect directly to the hosted version -- zero dependencies, nothing to install.

**Endpoint:** `https://mcp.ansvar.eu/law-ni/mcp`

| Client | How to Connect |
|--------|---------------|
| **Claude.ai** | Settings > Connectors > Add Integration > paste URL |
| **Claude Code** | `claude mcp add nicaraguan-law --transport http https://mcp.ansvar.eu/law-ni/mcp` |
| **Claude Desktop** | Add to config (see below) |
| **GitHub Copilot** | Add to VS Code settings (see below) |

**Claude Desktop** -- add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "nicaraguan-law": {
      "type": "url",
      "url": "https://mcp.ansvar.eu/law-ni/mcp"
    }
  }
}
```

**GitHub Copilot** -- add to VS Code `settings.json`:

```json
{
  "github.copilot.chat.mcp.servers": {
    "nicaraguan-law": {
      "type": "http",
      "url": "https://mcp.ansvar.eu/law-ni/mcp"
    }
  }
}
```

### Use Locally (npm)

```bash
npx @ansvar/nicaraguan-law-mcp
```

**Claude Desktop** -- add to `claude_desktop_config.json`:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "nicaraguan-law": {
      "command": "npx",
      "args": ["-y", "@ansvar/nicaraguan-law-mcp"]
    }
  }
}
```

**Cursor / VS Code:**

```json
{
  "mcp.servers": {
    "nicaraguan-law": {
      "command": "npx",
      "args": ["-y", "@ansvar/nicaraguan-law-mcp"]
    }
  }
}
```

---

## Example Queries

Once connected, just ask naturally (Spanish examples):

- *"¿Qué establece el Código Civil de Nicaragua sobre el contrato de compraventa?"*
- *"¿Cuáles son las causales de nulidad del matrimonio según el Código de Familia?"*
- *"Busca disposiciones sobre protección al consumidor en la legislación nicaragüense"*
- *"¿Qué dice el Código del Trabajo sobre el salario mínimo y las horas de trabajo?"*
- *"¿Está vigente la Ley General del Medio Ambiente y los Recursos Naturales?"*
- *"¿Cuáles son los requisitos del Código Penal para la prescripción de la acción penal?"*
- *"Valida la cita 'Ley No. 641, Código Penal de Nicaragua'"*
- *"Construye un argumento legal sobre responsabilidad ambiental empresarial en Nicaragua"*
- *"¿Qué establece la Ley de Telecomunicaciones sobre la protección de datos en redes?"*

---

## What's Included

| Category | Count | Details |
|----------|-------|---------|
| **Statutes** | 1,730 statutes | Comprehensive Nicaraguan legislation |
| **Provisions** | 49,237 sections | Full-text searchable with FTS5 |
| **Database Size** | ~72 MB | Optimized SQLite, portable |
| **Freshness Checks** | Automated | Drift detection against source |

**Verified data only** -- every citation is validated against official sources (nicaragua.justia.com). Zero LLM-generated content.

---

## See It In Action

### Why This Works

**Verbatim Source Text (No LLM Processing):**
- All statute text is ingested from [nicaragua.justia.com](https://nicaragua.justia.com) and official Nicaraguan government sources
- Provisions are returned **unchanged** from SQLite FTS5 database rows
- Zero LLM summarization or paraphrasing -- the database contains regulation text, not AI interpretations

**Smart Context Management:**
- Search returns ranked provisions with BM25 scoring (safe for context)
- Provision retrieval gives exact text by statute identifier + chapter/article
- Cross-references help navigate without loading everything at once

**Technical Architecture:**
```
nicaragua.justia.com --> Parse --> SQLite --> FTS5 snippet() --> MCP response
                           ^                        ^
                    Provision parser         Verbatim database query
```

### Traditional Research vs. This MCP

| Traditional Approach | This MCP Server |
|---------------------|-----------------|
| Search Justia or Asamblea Nacional by statute name | Search by plain Spanish: *"protección datos personales"* |
| Navigate multi-article codes manually | Get the exact provision with context |
| Manual cross-referencing between codes | `build_legal_stance` aggregates across sources |
| "¿Está vigente esta ley?" → check manually | `check_currency` tool → answer in seconds |
| Find international basis → dig through OAS/IACHR | `get_eu_basis` → linked international instruments |
| No API, no integration | MCP protocol → AI-native |

**Traditional:** Search La Gaceta → Download PDF → Ctrl+F → Cross-reference with Código Civil o Código Penal → Repeat

**This MCP:** *"¿Cuáles son las penas establecidas en el Código Penal para el delito de lavado de activos?"* → Done.

---

## Available Tools (13)

### Core Legal Research Tools (8)

| Tool | Description |
|------|-------------|
| `search_legislation` | FTS5 full-text search across 49,237 provisions with BM25 ranking. Supports quoted phrases, boolean operators, prefix wildcards |
| `get_provision` | Retrieve specific provision by statute identifier + article/section number |
| `check_currency` | Check if a statute is in force, amended, or repealed |
| `validate_citation` | Validate citation against database -- zero-hallucination check |
| `build_legal_stance` | Aggregate citations from multiple statutes for a legal topic |
| `format_citation` | Format citations per Nicaraguan legal conventions |
| `list_sources` | List all available statutes with metadata and coverage scope |
| `about` | Server info, capabilities, dataset statistics, and coverage summary |

### International Law Integration Tools (5)

| Tool | Description |
|------|-------------|
| `get_eu_basis` | Get international instruments (OAS, IACHR, ILO conventions, CAFTA-DR) that a Nicaraguan statute aligns with |
| `get_nicaraguan_implementations` | Find Nicaraguan laws aligning with a specific international instrument |
| `search_eu_implementations` | Search international documents with Nicaraguan implementation counts |
| `get_provision_eu_basis` | Get international law references for a specific provision |
| `validate_eu_compliance` | Check alignment status of Nicaraguan statutes against international standards |

---

## International Law Alignment

Nicaragua is not an EU member state, but Nicaraguan law intersects with several international frameworks:

- **IACHR (Inter-American Court of Human Rights)** -- Nicaragua is subject to the American Convention on Human Rights; IACHR jurisprudence shapes constitutional and criminal law
- **ILO Conventions** -- Nicaragua has ratified core ILO conventions; the Código del Trabajo reflects obligations on labor rights, child labor, and non-discrimination
- **OAS frameworks** -- Nicaragua participates in OAS conventions on anti-corruption (UNCAC and Inter-American Convention Against Corruption), organized crime, and regional cooperation
- **CAFTA-DR** -- The Central America Free Trade Agreement shapes commercial, intellectual property, and investment law
- **SICA (Central American Integration System)** -- Nicaraguan law reflects SICA frameworks on trade, environment, and regional standards
- **UN Frameworks** -- Criminal law, environmental, and maritime statutes reflect UN treaty obligations including UNCAC and the UN Convention Against Transnational Organized Crime

The international alignment tools allow you to explore these relationships -- checking which Nicaraguan provisions correspond to treaty obligations, and vice versa.

> **Note:** International cross-references reflect alignment and treaty relationships. Nicaraguan law operates in a civil law tradition with distinct regional characteristics, and the tools help identify where Nicaraguan and international frameworks address similar domains.

---

## Data Sources & Freshness

All content is sourced from authoritative Nicaraguan legal databases:

- **[nicaragua.justia.com](https://nicaragua.justia.com)** -- Comprehensive Nicaraguan statute database
- **[Asamblea Nacional de Nicaragua](http://legislacion.asamblea.gob.ni)** -- Official legislative portal
- **[La Gaceta, Diario Oficial](https://www.lagaceta.gob.ni)** -- Official gazette for promulgated legislation

### Data Provenance

| Field | Value |
|-------|-------|
| **Primary source** | nicaragua.justia.com |
| **Retrieval method** | Structured ingestion from official sources |
| **Language** | Spanish |
| **Coverage** | 1,730 Nicaraguan statutes |
| **Database size** | ~72 MB |

**Verified data only** -- every citation is validated against official sources. Zero LLM-generated content.

---

## Security

This project uses multiple layers of automated security scanning:

| Scanner | What It Does | Schedule |
|---------|-------------|----------|
| **CodeQL** | Static analysis for security vulnerabilities | Weekly + PRs |
| **Semgrep** | SAST scanning (OWASP top 10, secrets, TypeScript) | Every push |
| **Gitleaks** | Secret detection across git history | Every push |
| **Trivy** | CVE scanning on filesystem and npm dependencies | Daily |
| **Docker Security** | Container image scanning + SBOM generation | Daily |
| **Socket.dev** | Supply chain attack detection | PRs |
| **OSSF Scorecard** | OpenSSF best practices scoring | Weekly |
| **Dependabot** | Automated dependency updates | Weekly |

See [SECURITY.md](SECURITY.md) for the full policy and vulnerability reporting.

---

## Important Disclaimers

### Legal Advice

> **THIS TOOL IS NOT LEGAL ADVICE**
>
> Statute text is sourced from official Nicaraguan legal databases. However:
> - This is a **research tool**, not a substitute for professional legal counsel
> - **Court case coverage is not included** -- do not rely solely on this for case law research
> - **Verify critical citations** against La Gaceta for formal proceedings
> - **International cross-references** reflect alignment relationships, not formal transposition
> - **Municipal and regional legislation is not included** -- this covers national statutes only

**Before using professionally, read:** [DISCLAIMER.md](DISCLAIMER.md) | [SECURITY.md](SECURITY.md)

### Client Confidentiality

Queries go through the Claude API. For privileged or confidential matters, use on-premise deployment.

### Professional Responsibility

Members of the **Colegio de Abogados de Nicaragua** should ensure any AI-assisted research complies with professional ethics rules on competence and verification of sources before relying on output in client matters or court filings.

---

## Development

### Setup

```bash
git clone https://github.com/Ansvar-Systems/Nicaraguan-law-mcp
cd Nicaraguan-law-mcp
npm install
npm run build
npm test
```

### Running Locally

```bash
npm run dev                                       # Start MCP server
npx @anthropic/mcp-inspector node dist/index.js   # Test with MCP Inspector
```

### Data Management

```bash
npm run ingest           # Ingest statutes from source
npm run build:db         # Rebuild SQLite database
npm run drift:detect     # Run drift detection against anchors
npm run check-updates    # Check for source updates
npm run census           # Generate coverage census
```

### Performance

- **Search Speed:** <100ms for most FTS5 queries
- **Database Size:** ~72 MB (efficient, portable)
- **Reliability:** 100% ingestion success rate across 1,730 statutes

---

## Related Projects: Complete Compliance Suite

This server is part of **Ansvar's Compliance Suite** -- MCP servers that work together for end-to-end compliance coverage:

### [@ansvar/eu-regulations-mcp](https://github.com/Ansvar-Systems/EU_compliance_MCP)
**Query 49 EU regulations directly from Claude** -- GDPR, AI Act, DORA, NIS2, MiFID II, eIDAS, and more. Full regulatory text with article-level search. `npx @ansvar/eu-regulations-mcp`

### [@ansvar/honduran-law-mcp](https://github.com/Ansvar-Systems/Honduran-law-mcp)
**Query Honduran statutes directly from Claude** -- Central American legal research companion. `npx @ansvar/honduran-law-mcp`

### [@ansvar/us-regulations-mcp](https://github.com/Ansvar-Systems/US_Compliance_MCP)
**Query US federal and state compliance laws** -- HIPAA, CCPA, SOX, GLBA, FERPA, and more. `npx @ansvar/us-regulations-mcp`

### [@ansvar/security-controls-mcp](https://github.com/Ansvar-Systems/security-controls-mcp)
**Query 261 security frameworks** -- ISO 27001, NIST CSF, SOC 2, CIS Controls, SCF, and more. `npx @ansvar/security-controls-mcp`

**70+ national law MCPs** covering Brazil, Canada, Colombia, Cuba, Denmark, France, Germany, Guyana, Honduras, Ireland, Netherlands, Norway, Panama, El Salvador, Sweden, UK, Venezuela, and more.

---

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Priority areas:
- Court case law coverage (Corte Suprema de Justicia)
- La Gaceta amendment tracking
- International treaty cross-reference mapping (CAFTA-DR, SICA)
- Historical statute versions

---

## Roadmap

- [x] Core statute database with FTS5 search
- [x] Full corpus ingestion (1,730 statutes, 49,237 provisions)
- [x] International law alignment tools
- [x] Vercel Streamable HTTP deployment
- [x] npm package publication
- [ ] Court case law expansion
- [ ] La Gaceta automated amendment tracking
- [ ] Historical statute versions
- [ ] CAFTA-DR and SICA cross-references
- [ ] Regulatory guidance documents

---

## Citation

If you use this MCP server in academic research:

```bibtex
@software{nicaraguan_law_mcp_2026,
  author = {Ansvar Systems AB},
  title = {Nicaraguan Law MCP Server: AI-Powered Legal Research Tool},
  year = {2026},
  url = {https://github.com/Ansvar-Systems/Nicaraguan-law-mcp},
  note = {1,730 Nicaraguan statutes with 49,237 provisions and international law alignment}
}
```

---

## License

Apache License 2.0. See [LICENSE](./LICENSE) for details.

### Data Licenses

- **Statutes & Legislation:** Nicaraguan Government (public domain via official sources)
- **International Metadata:** OAS/ILO/UN public domain

---

## About Ansvar Systems

We build AI-accelerated compliance and legal research tools for the global market. This MCP server covers one of the most extensive Central American legal corpuses available -- 1,730 statutes and 49,237 provisions that previously required navigating multiple fragmented portals.

**[ansvar.eu](https://ansvar.eu)** -- Stockholm, Sweden

---

<p align="center">
  <sub>Built with care in Stockholm, Sweden</sub>
</p>
