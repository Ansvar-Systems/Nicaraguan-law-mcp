# Privacy & Client Confidentiality

**IMPORTANT READING FOR LEGAL PROFESSIONALS**

This document addresses privacy and confidentiality considerations when using this Tool, with particular attention to professional obligations under Nicaraguan bar association rules.

---

## Executive Summary

**Key Risks:**
- Queries through Claude API flow via Anthropic cloud infrastructure
- Query content may reveal client matters and privileged information
- Nicaraguan bar rules (Colegio de Abogados y Abogadas de Nicaragua) require strict confidentiality (secreto profesional)

**Safe Use Options:**
1. **General Legal Research**: Use Tool for non-client-specific queries
2. **Local npm Package**: Install `@ansvar/nicaraguan-law-mcp` locally — database queries stay on your machine
3. **Remote Endpoint**: Vercel Streamable HTTP endpoint — queries transit Vercel infrastructure
4. **On-Premise Deployment**: Self-host with local LLM for privileged matters

---

## Data Flows and Infrastructure

### MCP (Model Context Protocol) Architecture

This Tool uses the **Model Context Protocol (MCP)** to communicate with AI clients:

```
User Query -> MCP Client (Claude Desktop/Cursor/API) -> Anthropic Cloud -> MCP Server -> Database
```

### Deployment Options

#### 1. Local npm Package (Most Private)

```bash
npx @ansvar/nicaraguan-law-mcp
```

- Database is local SQLite file on your machine
- No data transmitted to external servers (except to AI client for LLM processing)
- Full control over data at rest

#### 2. Remote Endpoint (Vercel)

```
Endpoint: https://nicaraguan-law-mcp.vercel.app/mcp
```

- Queries transit Vercel infrastructure
- Tool responses return through the same path
- Subject to Vercel's privacy policy

### What Gets Transmitted

When you use this Tool through an AI client:

- **Query Text**: Your search queries and tool parameters
- **Tool Responses**: Statute text (texto de la ley), provision content, search results
- **Metadata**: Timestamps, request identifiers

**What Does NOT Get Transmitted:**
- Files on your computer
- Your full conversation history (depends on AI client configuration)

---

## Professional Obligations (Nicaragua)

### Nicaraguan Bar Association Rules

Nicaraguan lawyers (abogados y abogadas) are bound by strict confidentiality rules under the Ley Orgánica del Poder Judicial and the rules of the Colegio de Abogados y Abogadas de Nicaragua.

#### Secreto Profesional (Duty of Confidentiality)

- All client communications are privileged under Nicaraguan professional ethics rules
- Client identity may be confidential in sensitive matters
- Case strategy and legal analysis are protected
- Information that could identify clients or matters must be safeguarded
- Breach of confidentiality may result in disciplinary proceedings (proceso disciplinario)

### Nicaraguan Data Protection Framework

Nicaragua does not have a comprehensive data protection law equivalent to GDPR. However:

- Constitutional provisions protect personal privacy (derecho a la intimidad)
- Professional confidentiality rules impose separate obligations
- When transmitting client-related queries to cloud services, consider your professional ethics obligations independently

---

## Risk Assessment by Use Case

### LOW RISK: General Legal Research

**Safe to use through any deployment:**

```
Example: "What does the Código Civil Nicaragüense say about lease contracts?"
```

- No client identity involved
- No case-specific facts
- Publicly available legal information

### MEDIUM RISK: Anonymized Queries

**Use with caution:**

```
Example: "What are the penalties for tax fraud under Nicaraguan criminal law?"
```

- Query pattern may reveal you are working on a specific matter
- Anthropic/Vercel logs may link queries to your API key

### HIGH RISK: Client-Specific Queries

**DO NOT USE through cloud AI services:**

- Remove ALL identifying details
- Use the local npm package with a self-hosted LLM
- Or use official sources (legislacion.asamblea.gob.ni, La Gaceta) directly

---

## Data Collection by This Tool

### What This Tool Collects

**Nothing.** This Tool:

- Does NOT log queries
- Does NOT store user data
- Does NOT track usage
- Does NOT use analytics
- Does NOT set cookies

The database is read-only. No user data is written to disk.

### What Third Parties May Collect

- **Anthropic** (if using Claude): Subject to [Anthropic Privacy Policy](https://www.anthropic.com/legal/privacy)
- **Vercel** (if using remote endpoint): Subject to [Vercel Privacy Policy](https://vercel.com/legal/privacy-policy)

---

## Recommendations

### For Solo Practitioners / Small Firms (Abogados Independientes / Estudios Jurídicos Pequeños)

1. Use local npm package for maximum privacy
2. General research: Cloud AI is acceptable for non-client queries
3. Client matters: Use official legal sources (legislacion.asamblea.gob.ni) and Colegio resources

### For Large Firms / Corporate Legal (Firmas Grandes / Departamentos Legales)

1. Evaluate data processing implications before integrating cloud AI tools
2. Consider on-premise deployment with self-hosted LLM
3. Train staff on safe vs. unsafe query patterns

### For Government / Public Sector (Entidades Públicas)

1. Use self-hosted deployment, no external APIs
2. Follow Nicaraguan government IT security guidelines
3. Air-gapped option available for classified matters

---

## Questions and Support

- **Privacy Questions**: Open issue on [GitHub](https://github.com/Ansvar-Systems/Nicaraguan-law-mcp/issues)
- **Anthropic Privacy**: Contact privacy@anthropic.com
- **Colegio Guidance**: Consult the Colegio de Abogados y Abogadas de Nicaragua for ethics guidance on AI tool use

---

**Last Updated**: 2026-03-06
**Tool Version**: 1.0.0
