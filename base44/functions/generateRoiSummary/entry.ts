import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = await req.json();
        const {
            companyName,
            role,
            revenue,
            employees,
            industry,
            primaryConcerns,
            aiUsage,
            aiApproval,
            aiLogging,
            dataType,
            sopReliance,
            aiPilots,
            hasPolicy,
            hasOwner,
            budgetCentralized,
            executivePressure,
            riskScore,
            governanceScore,
            annualLoss,
            estimatedRecovery,
            knowledgeWorkers,
            hourlyRate,
            searchMinutes
        } = payload;

        const prompt = `You are an AI governance and ROI advisor. Analyze the following company assessment data and generate a personalized, insightful summary for their results page.

COMPANY PROFILE:
- Company: ${companyName}
- Role: ${role}
- Industry: ${industry}
- Revenue: ${revenue}
- Employees: ${employees}
- Primary Concerns: ${primaryConcerns.join(", ")}

AI USAGE & RISK:
- Current AI Usage: ${aiUsage}
- AI Approval Status: ${aiApproval}
- Logging/Audit Capability: ${aiLogging}
- Data Sensitivity: ${dataType}

PRODUCTIVITY CONTEXT:
- Knowledge Workers: ${knowledgeWorkers}
- Hourly Rate: $${hourlyRate}
- Daily Search Time: ${searchMinutes} minutes
- SOP Reliance: ${sopReliance}
- Previous AI Pilots: ${aiPilots}

GOVERNANCE READINESS:
- Documented Policy: ${hasPolicy}
- Defined Owner: ${hasOwner}
- Budget Structure: ${budgetCentralized}
- Executive Pressure: ${executivePressure}

CALCULATED SCORES:
- AI Risk Score: ${riskScore}/100
- Governance Maturity: ${governanceScore}/100
- Annual Productivity Loss: $${annualLoss.toLocaleString()}
- Estimated Recovery (15%): $${estimatedRecovery.toLocaleString()}

INSTRUCTIONS:
Generate a personalized 2-4 paragraph assessment that:
1. Directly addresses their specific situation based on their industry, role, and concerns
2. Explains what their specific risk score and governance maturity mean for THEIR organization
3. Highlights the most critical issues they should address first based on their answers
4. Connects their productivity opportunity to their specific context (team size, search time, SOP reliance)
5. Provides actionable insight about what organizations in similar situations typically do next
6. Uses a professional, consultative tone - not generic or templated

Write in second person ("your organization"). Be specific and reference their actual data points. Make it feel like a consultant reviewed their specific situation, not a generic response.`;

        const response = await base44.integrations.Core.InvokeLLM({
            prompt: prompt,
            add_context_from_internet: false,
        });

        return Response.json({ summary: response });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});