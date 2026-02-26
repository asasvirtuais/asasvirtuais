import { GoogleGenAI } from '@google/genai';
import { Message } from '@/src/days';
import { format, startOfWeek, endOfWeek, subMonths, subWeeks, startOfMonth, endOfMonth, isSameWeek, isSameMonth, isSameDay, parse, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

export function getAI(apiKey: string) {
    return new GoogleGenAI({ apiKey });
}

export interface SummaryRecord {
    id: string;
    type: 'weekly' | 'monthly' | 'yearly';
    content?: string;
}

export interface DayRecord {
    id: string; // YYYYMMDD
    messages?: Message[];
    summary?: string;
}

/**
 * Build rich contextual information for the AI from summaries and day records.
 * Includes:
 * - All yearly summaries
 * - Last 3 months summaries (excluding current month)
 * - Last 2 weeks summaries (excluding current week)
 * - Day summaries from the current week (excluding the current day)
 */
export function buildContextBlock(
    currentDate: Date,
    summaries: SummaryRecord[],
    days: DayRecord[]
): string {
    const sections: string[] = [];

    // 1. All yearly summaries
    const yearlySummaries = summaries
        .filter(s => s.type === 'yearly' && s.content)
        .sort((a, b) => a.id.localeCompare(b.id));

    if (yearlySummaries.length > 0) {
        sections.push('=== YEARLY SUMMARIES ===');
        for (const s of yearlySummaries) {
            sections.push(`[Year ${s.id}]\n${s.content}`);
        }
    }

    // 2. Last 3 months summaries (excluding current month)
    const currentMonthStr = format(currentDate, 'yyyy-MM');
    const threeMonthsAgo = subMonths(currentDate, 3);

    const monthlySummaries = summaries
        .filter(s => {
            if (s.type !== 'monthly' || !s.content) return false;
            if (s.id === currentMonthStr) return false; // exclude current month
            // Check if within last 3 months
            try {
                const monthDate = parse(s.id, 'yyyy-MM', new Date());
                return monthDate >= startOfMonth(threeMonthsAgo) && monthDate < startOfMonth(currentDate);
            } catch {
                return false;
            }
        })
        .sort((a, b) => a.id.localeCompare(b.id));

    if (monthlySummaries.length > 0) {
        sections.push('=== MONTHLY SUMMARIES (Last 3 months) ===');
        for (const s of monthlySummaries) {
            sections.push(`[Month ${s.id}]\n${s.content}`);
        }
    }

    // 3. Last 2 weeks summaries (excluding current week)
    const currentWeekStart = startOfWeek(currentDate);
    const twoWeeksAgo = subWeeks(currentDate, 2);

    const weeklySummaries = summaries
        .filter(s => {
            if (s.type !== 'weekly' || !s.content) return false;
            // Parse week ID like "2026-W08"
            const match = s.id.match(/^(\d{4})-W(\d+)$/);
            if (!match) return false;
            // Check that it's not the current week by comparing the ID
            // We need to compute the current week ID to exclude it
            const currentWeekNum = getISOWeekNumber(currentDate);
            const currentYearStr = format(currentDate, 'yyyy');
            const currentWeekId = `${currentYearStr}-W${currentWeekNum}`;
            if (s.id === currentWeekId) return false;

            // Check if within the last 2 weeks window
            const year = parseInt(match[1], 10);
            const week = parseInt(match[2], 10);
            // Calculate approximate date for this week (Monday of that week)
            const jan4 = new Date(year, 0, 4);
            const weekDate = new Date(jan4.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000);
            return weekDate >= subWeeks(currentWeekStart, 2) && weekDate < currentWeekStart;
        })
        .sort((a, b) => a.id.localeCompare(b.id));

    if (weeklySummaries.length > 0) {
        sections.push('=== WEEKLY SUMMARIES (Last 2 weeks) ===');
        for (const s of weeklySummaries) {
            sections.push(`[Week ${s.id}]\n${s.content}`);
        }
    }

    // 4. Day summaries from the same week (excluding the current day)
    const weekStart = startOfWeek(currentDate);
    const weekEnd = endOfWeek(currentDate);
    const currentDayStr = format(currentDate, 'yyyyMMdd');

    const sameWeekDays = days
        .filter(d => {
            if (d.id === currentDayStr) return false;
            if (!d.summary && (!d.messages || d.messages.length === 0)) return false;
            try {
                const dayDate = parse(d.id, 'yyyyMMdd', new Date());
                return dayDate >= weekStart && dayDate <= weekEnd;
            } catch {
                return false;
            }
        })
        .sort((a, b) => a.id.localeCompare(b.id));

    if (sameWeekDays.length > 0) {
        sections.push('=== THIS WEEK\'S DAYS (excluding today) ===');
        for (const d of sameWeekDays) {
            const dayDate = parse(d.id, 'yyyyMMdd', new Date());
            const dayLabel = format(dayDate, 'EEEE, MMMM d, yyyy');
            if (d.summary) {
                sections.push(`[${dayLabel}]\n${d.summary}`);
            } else if (d.messages && d.messages.length > 0) {
                const msgSummary = d.messages.map(m => {
                    const time = m.timestamp ? format(new Date(m.timestamp), 'HH:mm') : '';
                    return `${m.role}${time ? ` (${time})` : ''}: ${m.content}`;
                }).join('\n');
                sections.push(`[${dayLabel}]\n${msgSummary}`);
            }
        }
    }

    return sections.join('\n\n');
}

function getISOWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export async function generateChatResponse(
    apiKey: string,
    intent: string,
    date: string,
    summaries: SummaryRecord[],
    allDays: DayRecord[],
    messages: Message[]
): Promise<string> {
    const ai = getAI(apiKey);
    const currentDate = parse(date, 'yyyy-MM-dd', new Date());
    const contextBlock = buildContextBlock(currentDate, summaries, allDays);

    const now = new Date();
    const currentTime = format(now, 'HH:mm');
    const currentDateTime = format(now, 'yyyy-MM-dd HH:mm');

    const systemInstruction = `You are a personal AI diary assistant. 
User's intent for this diary: ${intent}
Current date and time: ${currentDateTime}
The user is writing on: ${date}
${contextBlock ? `\n--- CONTEXT FROM USER'S LIFE ---\n${contextBlock}\n--- END CONTEXT ---` : ''}
Your goal is to listen, ask thoughtful questions, and help the user reflect. Keep your responses concise and conversational. You know about the user's life from the summaries above — use this knowledge naturally but don't overwhelm the user with it.`;

    const formattedMessages = messages.map(m => {
        const time = m.timestamp ? format(new Date(m.timestamp), 'yyyy-MM-dd HH:mm') : '';
        return {
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: time ? `[${time}] ${m.content}` : m.content }]
        };
    });

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: formattedMessages,
        config: {
            systemInstruction,
        }
    });

    return response.text || '';
}

export interface LabeledSummary {
    label: string;
    content: string;
}

export async function generateDailySummary(apiKey: string, date: string, messages: Message[]): Promise<string> {
    const ai = getAI(apiKey);
    const formattedMessages = messages.map(m => {
        const time = m.timestamp ? format(new Date(m.timestamp), 'HH:mm') : '';
        return `${m.role}${time ? ` (${time})` : ''}: ${m.content}`;
    }).join('\n');
    const prompt = `Based on the following diary conversation from ${date}, write a 3-5 sentence summary of the user's day in the second person ("You spent the morning..."). Focus on what they did and how they felt.\n\nIMPORTANT: Write your summary in the SAME LANGUAGE as the conversation messages below. If the user wrote in Portuguese, respond in Portuguese. If in English, respond in English. Match whatever language they used.\n\nDate: ${date}\n\n${formattedMessages}`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
    });

    return response.text || '';
}

export async function generateWeeklySummary(apiKey: string, dailySummaries: LabeledSummary[]): Promise<string> {
    const ai = getAI(apiKey);
    const formatted = dailySummaries.map(s => `[${s.label}]\n${s.content}`).join('\n\n');
    const prompt = `Based on the following daily summaries, write a single paragraph summarizing the week's themes and moments in the second person.\n\nIMPORTANT: Write your summary in the SAME LANGUAGE as the summaries below. Match the language of the source content.\n\n${formatted}`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
    });

    return response.text || '';
}

export async function generateMonthlySummary(apiKey: string, weeklySummaries: LabeledSummary[]): Promise<string> {
    const ai = getAI(apiKey);
    const formatted = weeklySummaries.map(s => `[${s.label}]\n${s.content}`).join('\n\n');
    const prompt = `Based on the following weekly summaries, write a reflective paragraph about the month in the second person.\n\nIMPORTANT: Write your summary in the SAME LANGUAGE as the summaries below. Match the language of the source content.\n\n${formatted}`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
    });

    return response.text || '';
}

export async function generateYearlySummary(apiKey: string, monthlySummaries: LabeledSummary[]): Promise<string> {
    const ai = getAI(apiKey);
    const formatted = monthlySummaries.map(s => `[${s.label}]\n${s.content}`).join('\n\n');
    const prompt = `Based on the following monthly summaries, write a 3-5 paragraph year-in-review in the second person.\n\nIMPORTANT: Write your summary in the SAME LANGUAGE as the summaries below. Match the language of the source content.\n\n${formatted}`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
    });

    return response.text || '';
}

export async function compressConversation(apiKey: string, messages: Message[]): Promise<string> {
    const ai = getAI(apiKey);
    const formattedMessages = messages.map(m => `${m.role}: ${m.content}`).join('\n');
    const prompt = `Summarize the following conversation into a single, comprehensive message that captures the essence of the user's thoughts and the assistant's guidance. This will replace the entire log, so don't lose important details.\n\nIMPORTANT: Write your summary in the SAME LANGUAGE as the conversation below. Match the language of the source content.\n\n${formattedMessages}`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
    });

    return response.text || '';
}
