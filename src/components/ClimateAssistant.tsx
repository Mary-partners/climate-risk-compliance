'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Knowledge base – 30+ pattern-matched entries
// ---------------------------------------------------------------------------

interface KnowledgeEntry {
  patterns: string[];
  response: string;
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    patterns: ['cbk crdf', 'crdf framework', 'what is crdf', 'climate related disclosure'],
    response:
      'The CBK Climate-Related Disclosures Framework (CRDF) is a regulatory guideline issued by the Central Bank of Kenya requiring financial institutions to identify, assess, manage, and disclose climate-related risks and opportunities. It aligns with TCFD recommendations and mandates governance structures, strategy integration, risk management processes, and metrics & targets for climate risk.',
  },
  {
    patterns: ['cbk compliance', 'cbk requirements', 'cbk regulation', 'central bank kenya'],
    response:
      'CBK requires all regulated financial institutions to comply with the CRDF. Key requirements include: board-level governance of climate risk, integration into enterprise risk management, scenario analysis for physical and transition risks, and annual climate-related disclosures starting from the 2025 reporting cycle.',
  },
  {
    patterns: ['ifrs s1', 'sustainability disclosure', 'ifrs sustainability'],
    response:
      'IFRS S1 (General Requirements for Disclosure of Sustainability-related Financial Information) sets out the overarching framework for disclosing material sustainability risks and opportunities. It requires entities to disclose governance, strategy, risk management, and metrics & targets across all sustainability topics that could affect enterprise value.',
  },
  {
    patterns: ['ifrs s2', 'climate disclosure standard', 'ifrs climate'],
    response:
      'IFRS S2 (Climate-related Disclosures) specifically addresses climate risks. It requires disclosure of climate-related physical and transition risks, opportunities, scenario analysis results, Scope 1/2/3 GHG emissions, and climate-related targets. It builds on TCFD recommendations and is designed to work alongside IFRS S1.',
  },
  {
    patterns: ['tcfd', 'task force', 'climate financial disclosure'],
    response:
      'The Task Force on Climate-related Financial Disclosures (TCFD) provides a framework organized around four pillars: Governance, Strategy, Risk Management, and Metrics & Targets. It recommends scenario analysis to assess resilience, disclosure of Scope 1, 2, and 3 emissions, and clear articulation of how climate risks affect business strategy and financial planning.',
  },
  {
    patterns: ['kgft', 'kenya green finance', 'green taxonomy', 'green finance taxonomy'],
    response:
      'The Kenya Green Finance Taxonomy (KGFT) classifies economic activities that contribute to environmental objectives such as climate change mitigation, adaptation, pollution prevention, and biodiversity conservation. Financial institutions use the KGFT to tag green assets, measure portfolio alignment, and report on sustainable finance activities to regulators.',
  },
  {
    patterns: ['pcaf', 'financed emissions', 'portfolio emissions', 'carbon accounting'],
    response:
      'The Partnership for Carbon Accounting Financials (PCAF) provides a standardized methodology for measuring and disclosing GHG emissions associated with loans and investments (financed emissions). It covers asset classes including corporate lending, project finance, mortgages, and sovereign debt. Data quality scores range from 1 (highest) to 5 (estimated), and the methodology helps institutions set science-based targets.',
  },
  {
    patterns: ['physical risk', 'physical vs transition', 'climate physical', 'acute risk', 'chronic risk'],
    response:
      'Physical risks arise from the direct impacts of climate change. They include acute risks (extreme weather events like floods, droughts, cyclones) and chronic risks (sea-level rise, temperature increases, water stress). In Kenya, key physical risks include drought in ASAL regions, flooding in lake basins, and heat stress affecting agriculture. These can impair asset values, disrupt operations, and increase credit losses.',
  },
  {
    patterns: ['transition risk', 'policy risk', 'technology risk', 'market risk climate'],
    response:
      'Transition risks stem from the shift to a low-carbon economy. They include policy/regulatory changes (carbon pricing, emission standards), technology disruption (stranded assets in fossil fuels), market shifts (changing consumer preferences), and reputational risks. For Kenyan banks, key transition risks include exposure to carbon-intensive sectors and regulatory tightening under CBK CRDF.',
  },
  {
    patterns: ['pacta', 'paris alignment', 'portfolio alignment'],
    response:
      'PACTA (Paris Agreement Capital Transition Assessment) is an open-source tool that measures the alignment of financial portfolios with climate scenarios. It compares the production plans of portfolio companies against climate benchmarks (IEA scenarios). On this platform, PACTA helps assess whether your lending portfolio is aligned with Paris Agreement temperature goals.',
  },
  {
    patterns: ['climada', 'natural catastrophe', 'hazard modeling'],
    response:
      'CLIMADA is an open-source probabilistic natural catastrophe risk assessment tool. It models the impact of climate-related hazards (floods, tropical cyclones, drought) on exposed assets. On this platform, CLIMADA powers the physical risk assessment module, helping you estimate potential losses from climate hazards across your portfolio and geographic exposures.',
  },
  {
    patterns: ['diagnostic', 'start diagnostic', 'how do i start', 'assessment', 'begin assessment'],
    response:
      'To start the diagnostic assessment, navigate to the "Diagnostic" section from the main dashboard. The diagnostic evaluates your institution\'s climate risk readiness across four pillars: Governance, Strategy, Risk Management, and Metrics & Targets. Answer each question honestly \u2014 the system will generate a maturity score and a gap analysis with prioritized recommendations.',
  },
  {
    patterns: ['report builder', 'generate report', 'how to use report', 'build report', 'create report'],
    response:
      'The Report Builder helps you generate CBK CRDF-compliant climate risk disclosure reports. Go to the "Report" section, select the reporting period, choose which sections to include (Governance, Strategy, Risk Management, Metrics & Targets), and click Generate. The system pulls data from your completed diagnostic, risk assessments, and portfolio analysis to auto-populate the report template.',
  },
  {
    patterns: ['scope 1', 'direct emissions'],
    response:
      'Scope 1 emissions are direct GHG emissions from sources owned or controlled by your institution, such as fuel combustion in company vehicles, generators, and heating systems. Under IFRS S2 and PCAF, these must be measured and disclosed annually.',
  },
  {
    patterns: ['scope 2', 'indirect emissions', 'electricity emissions'],
    response:
      'Scope 2 emissions are indirect GHG emissions from the generation of purchased electricity, steam, heating, and cooling consumed by your institution. In Kenya, the grid emission factor is relatively low due to high geothermal/hydro share, but institutions should track and report these emissions.',
  },
  {
    patterns: ['scope 3', 'value chain emissions', 'financed emission'],
    response:
      'Scope 3 emissions include all other indirect emissions in the value chain. For financial institutions, the most material category is typically Category 15: Financed Emissions (loans and investments). PCAF methodology is used to calculate these. Scope 3 often represents 95%+ of a bank\'s total emissions footprint.',
  },
  {
    patterns: ['scenario analysis', 'climate scenario', 'stress test'],
    response:
      'Scenario analysis assesses the resilience of your institution under different climate futures. Common scenarios include: orderly transition (1.5\u00b0C/2\u00b0C pathways with early policy action), disorderly transition (delayed action, sudden policy shifts), and hot house world (3\u00b0C+ with severe physical impacts). CBK CRDF requires at least two scenarios to be analyzed.',
  },
  {
    patterns: ['governance', 'board oversight', 'climate governance'],
    response:
      'Climate governance refers to the board and senior management structures overseeing climate risk. CBK CRDF requires: a designated board committee for climate oversight, defined roles and responsibilities, regular climate risk reporting to the board, integration of climate into strategic decision-making, and appropriate expertise at the governance level.',
  },
  {
    patterns: ['materiality', 'material risk', 'double materiality'],
    response:
      'Materiality in climate risk has two dimensions: financial materiality (how climate affects enterprise value \u2014 the focus of IFRS S2) and impact materiality (how the institution affects the climate). CBK CRDF primarily focuses on financial materiality, but the KGFT and stakeholder expectations increasingly demand double materiality assessment.',
  },
  {
    patterns: ['metrics', 'targets', 'kpi', 'climate metrics'],
    response:
      'Key climate metrics include: GHG emissions (Scope 1, 2, 3), financed emissions intensity, portfolio carbon footprint, green asset ratio (using KGFT), climate VaR, percentage of portfolio in high-risk sectors, and exposure to physical hazards. Targets should be time-bound and, where possible, aligned with science-based pathways.',
  },
  {
    patterns: ['green asset ratio', 'gar', 'green portfolio'],
    response:
      'The Green Asset Ratio (GAR) measures the proportion of a bank\'s assets that finance environmentally sustainable activities as classified by the KGFT. A higher GAR indicates greater alignment with green objectives. It is calculated as: Green Assets / Total Eligible Assets. This is a key metric for regulators and investors.',
  },
  {
    patterns: ['stranded asset', 'stranded'],
    response:
      'Stranded assets are investments that lose value prematurely due to the transition to a low-carbon economy. For Kenyan banks, exposure to coal, heavy industry, or fossil fuel-dependent agriculture could become stranded under aggressive transition scenarios. PACTA analysis on this platform helps identify potential stranded asset exposure.',
  },
  {
    patterns: ['data quality', 'data gap', 'data collection'],
    response:
      'Climate data quality is a common challenge. PCAF uses a 5-tier data quality score: Score 1 (audited/verified data) to Score 5 (estimated using sector averages). Start with available data and improve over time. The platform helps identify data gaps through the diagnostic and provides guidance on data collection strategies for each assessment module.',
  },
  {
    patterns: ['drought', 'water stress', 'asal'],
    response:
      'Drought and water stress are key physical risks in Kenya, particularly in ASAL (Arid and Semi-Arid Lands) regions. Banks with agricultural lending exposure in these areas face elevated credit risk. The platform\'s CLIMADA module models drought probability and potential financial impact on your portfolio using county-level hazard data.',
  },
  {
    patterns: ['flood', 'flooding', 'flood risk'],
    response:
      'Flooding is a significant acute physical risk in Kenya, especially in lake basins, coastal areas, and urban centers with poor drainage. The platform uses CLIMADA to model flood hazard exposure for your real estate, infrastructure, and agricultural portfolios, providing expected annual loss estimates and risk maps.',
  },
  {
    patterns: ['agriculture', 'agri risk', 'farming risk'],
    response:
      'Agriculture is highly exposed to climate change in Kenya. Key risks include drought, erratic rainfall, temperature shifts affecting growing seasons, and pest/disease outbreaks. Banks with significant agricultural lending should conduct sector-specific climate risk analysis using both physical risk models and transition risk scenarios for the agri sector.',
  },
  {
    patterns: ['carbon pricing', 'carbon tax', 'emission trading'],
    response:
      'Carbon pricing mechanisms (taxes or emission trading systems) are transition risk drivers. While Kenya does not yet have a formal carbon price, Article 6 of the Paris Agreement and regional initiatives may introduce pricing mechanisms. Banks should assess portfolio exposure to carbon-intensive sectors that could be impacted by future carbon pricing.',
  },
  {
    patterns: ['net zero', 'carbon neutral', 'zero emissions'],
    response:
      'Net zero means achieving a balance between GHG emissions produced and removed from the atmosphere. Financial institutions pursuing net zero should: measure financed emissions (PCAF), set science-based targets, develop a transition plan, engage with clients on decarbonization, and track progress. The platform\'s tools support each step of this journey.',
  },
  {
    patterns: ['risk management', 'erm', 'enterprise risk'],
    response:
      'Integrating climate risk into Enterprise Risk Management (ERM) is a core CBK CRDF requirement. This means incorporating climate considerations into credit risk, market risk, operational risk, and liquidity risk frameworks. The diagnostic assessment on this platform evaluates your current level of integration and provides a roadmap for improvement.',
  },
  {
    patterns: ['disclosure', 'reporting requirement', 'what to disclose'],
    response:
      'Under CBK CRDF, institutions must disclose: governance arrangements for climate risk, how climate risks/opportunities affect strategy, climate risk identification and management processes, metrics used to assess climate risks, GHG emissions data, and targets set. The Report Builder on this platform generates a structured disclosure document covering all required sections.',
  },
  {
    patterns: ['help', 'what can you do', 'how to use', 'guide me'],
    response:
      'I can help you with: understanding CBK CRDF compliance requirements, IFRS S1/S2 and TCFD frameworks, PCAF methodology for financed emissions, physical and transition risk concepts, using platform tools (PACTA, CLIMADA), navigating the diagnostic assessment, and generating reports. Just ask me any question about climate risk and compliance!',
  },
  {
    patterns: ['get started', 'where to begin', 'first step', 'onboarding'],
    response:
      'Welcome! Here\'s how to get started: 1) Complete the Diagnostic Assessment to evaluate your institution\'s climate risk maturity. 2) Review the gap analysis and recommendations. 3) Use PACTA to assess portfolio alignment and CLIMADA for physical risk exposure. 4) Generate your first disclosure report using the Report Builder. The diagnostic is the best starting point.',
  },
  {
    patterns: ['timeline', 'deadline', 'when is it due', 'compliance deadline'],
    response:
      'CBK has set a phased compliance timeline: Tier 1 banks (large systemic banks) are expected to begin reporting first, with subsequent tiers following. Check with CBK for the latest gazette notices. It is recommended to start your diagnostic assessment now to identify gaps and build capacity ahead of mandatory deadlines.',
  },
  {
    patterns: ['sector exposure', 'high risk sector', 'carbon intensive'],
    response:
      'Key carbon-intensive sectors to assess include: energy (fossil fuels), transport, manufacturing, agriculture (large-scale), real estate & construction, and mining. The platform helps you classify your lending portfolio by sector and map exposure to climate-sensitive industries. This sector analysis feeds into both transition and physical risk assessments.',
  },
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_QUESTIONS = [
  'What is CBK CRDF?',
  'How do I start the diagnostic?',
  'What is PCAF?',
  'Physical vs transition risk?',
  'How to use the report builder?',
];

// ---------------------------------------------------------------------------
// Pattern matcher
// ---------------------------------------------------------------------------

function findResponse(input: string): string {
  const lower = input.toLowerCase();
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const pattern of entry.patterns) {
      const keywords = pattern.split(' ');
      const matched = keywords.filter((kw) => lower.includes(kw)).length;
      const ratio = matched / keywords.length;
      if (ratio > score) score = ratio;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore >= 0.5) {
    return bestMatch.response;
  }

  return "I don't have a specific answer for that, but I can help with CBK CRDF compliance, IFRS S1/S2 standards, TCFD recommendations, PCAF methodology, physical & transition risks, and using the platform tools. Try asking about one of these topics, or navigate to the Diagnostic, Report, or Risk Assessment sections of the platform for hands-on guidance.";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ClimateAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || isTyping) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: text.trim(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsTyping(true);

      setTimeout(() => {
        const response = findResponse(text);
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
      }, 1000);
    },
    [isTyping],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // ---- Inline styles ----

  const cssVars = {
    '--ca-primary': '#1a56db',
    '--ca-accent': '#0ea5e9',
  } as React.CSSProperties;

  const fabStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #1a56db, #0ea5e9)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(26,86,219,0.45)',
    zIndex: 9999,
    transition: 'transform 0.2s, box-shadow 0.2s',
    animation: 'ca-pulse 2s infinite',
  };

  const badgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: -2,
    right: -2,
    background: '#1a56db',
    color: '#fff',
    fontSize: 9,
    fontWeight: 700,
    borderRadius: 6,
    padding: '1px 5px',
    lineHeight: '14px',
    border: '2px solid #fff',
    letterSpacing: 0.5,
  };

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 24,
    right: 24,
    width: 400,
    height: 520,
    borderRadius: 16,
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 9999,
    overflow: 'hidden',
    animation: 'ca-slideUp 0.3s ease-out',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  };

  const headerStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #1a56db, #0ea5e9)',
    color: '#fff',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  };

  const messageAreaStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 16px 8px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    background: '#f8fafc',
  };

  const inputAreaStyle: React.CSSProperties = {
    padding: '12px 16px',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    gap: 8,
    background: '#fff',
    flexShrink: 0,
  };

  const userBubble: React.CSSProperties = {
    alignSelf: 'flex-end',
    background: '#1a56db',
    color: '#fff',
    padding: '10px 14px',
    borderRadius: '16px 16px 4px 16px',
    maxWidth: '80%',
    fontSize: 14,
    lineHeight: 1.5,
    wordBreak: 'break-word',
  };

  const aiBubble: React.CSSProperties = {
    alignSelf: 'flex-start',
    background: '#eef2f7',
    color: '#1e293b',
    padding: '10px 14px',
    borderRadius: '16px 16px 16px 4px',
    maxWidth: '80%',
    fontSize: 14,
    lineHeight: 1.5,
    wordBreak: 'break-word',
  };

  const chipStyle: React.CSSProperties = {
    background: '#fff',
    border: '1px solid #cbd5e1',
    borderRadius: 20,
    padding: '8px 14px',
    fontSize: 13,
    color: '#1a56db',
    cursor: 'pointer',
    transition: 'all 0.15s',
    whiteSpace: 'nowrap',
  };

  return (
    <>
      {/* Keyframes injected once */}
      <style>{`
        @keyframes ca-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(26,86,219,0.45); }
          50% { box-shadow: 0 4px 30px rgba(14,165,233,0.65), 0 0 40px rgba(26,86,219,0.25); }
        }
        @keyframes ca-slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ca-dots {
          0%, 20% { opacity: 0.2; }
          50% { opacity: 1; }
          100% { opacity: 0.2; }
        }
        .ca-chip:hover {
          background: #eff6ff !important;
          border-color: #1a56db !important;
        }
        .ca-send:hover:not(:disabled) {
          background: #1648b8 !important;
        }
        .ca-msg-area::-webkit-scrollbar { width: 5px; }
        .ca-msg-area::-webkit-scrollbar-track { background: transparent; }
        .ca-msg-area::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>

      <div style={cssVars}>
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            style={fabStyle}
            aria-label="Open climate risk AI assistant"
          >
            <span style={badgeStyle}>AI</span>
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        )}

        {isOpen && (
          <div style={panelStyle}>
            {/* Header */}
            <div style={headerStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span style={{ fontWeight: 600, fontSize: 15 }}>Climate Risk AI Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  borderRadius: 8,
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#fff',
                  fontSize: 18,
                  transition: 'background 0.15s',
                }}
                aria-label="Close assistant"
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    'rgba(255,255,255,0.3)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    'rgba(255,255,255,0.15)')
                }
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="ca-msg-area" style={messageAreaStyle}>
              {messages.length === 0 && !isTyping && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 16,
                    paddingTop: 20,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1a56db, #0ea5e9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      color: '#64748b',
                      textAlign: 'center',
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    Hi! I&apos;m your Climate Risk AI Assistant. Ask me about CBK CRDF compliance,
                    IFRS standards, risk assessment tools, or how to use the platform.
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                      justifyContent: 'center',
                      marginTop: 4,
                    }}
                  >
                    {QUICK_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        className="ca-chip"
                        style={chipStyle}
                        onClick={() => sendMessage(q)}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div key={msg.id} style={msg.role === 'user' ? userBubble : aiBubble}>
                  {msg.content}
                </div>
              ))}

              {isTyping && (
                <div style={{ ...aiBubble, display: 'flex', gap: 4, padding: '12px 18px' }}>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: '#94a3b8',
                        display: 'inline-block',
                        animation: `ca-dots 1.2s ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={inputAreaStyle}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about climate risk compliance..."
                style={{
                  flex: 1,
                  border: '1px solid #e2e8f0',
                  borderRadius: 10,
                  padding: '10px 14px',
                  fontSize: 14,
                  outline: 'none',
                  color: '#1e293b',
                  transition: 'border-color 0.15s',
                  background: '#f8fafc',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#1a56db')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
                disabled={isTyping}
              />
              <button
                className="ca-send"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                style={{
                  background: '#1a56db',
                  border: 'none',
                  borderRadius: 10,
                  width: 42,
                  height: 42,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: !input.trim() || isTyping ? 'not-allowed' : 'pointer',
                  opacity: !input.trim() || isTyping ? 0.5 : 1,
                  transition: 'background 0.15s, opacity 0.15s',
                  flexShrink: 0,
                }}
                aria-label="Send message"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
