'use server';

/**
 * @fileOverview A GenAI-powered tool to generate draft announcements based on a prompt.
 *
 * - generateAnnouncementDraft - A function that handles the announcement draft generation process.
 * - GenerateAnnouncementDraftInput - The input type for the generateAnnouncementDraft function.
 * - GenerateAnnouncementDraftOutput - The return type for the generateAnnouncementDraft function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAnnouncementDraftInputSchema = z.object({
  prompt: z.string().describe('The prompt to generate the announcement draft from.'),
});
export type GenerateAnnouncementDraftInput = z.infer<typeof GenerateAnnouncementDraftInputSchema>;

const GenerateAnnouncementDraftOutputSchema = z.object({
  draft: z.string().describe('The generated announcement draft.'),
});
export type GenerateAnnouncementDraftOutput = z.infer<typeof GenerateAnnouncementDraftOutputSchema>;

export async function generateAnnouncementDraft(input: GenerateAnnouncementDraftInput): Promise<GenerateAnnouncementDraftOutput> {
  return generateAnnouncementDraftFlow(input);
}

const generateAnnouncementDraftPrompt = ai.definePrompt({
  name: 'generateAnnouncementDraftPrompt',
  input: {schema: GenerateAnnouncementDraftInputSchema},
  output: {schema: GenerateAnnouncementDraftOutputSchema},
  prompt: `You are an expert announcement writer for KL Radio.

  Based on the following prompt, generate a draft announcement:
  {{prompt}}`,
});

const generateAnnouncementDraftFlow = ai.defineFlow(
  {
    name: 'generateAnnouncementDraftFlow',
    inputSchema: GenerateAnnouncementDraftInputSchema,
    outputSchema: GenerateAnnouncementDraftOutputSchema,
  },
  async input => {
    const {output} = await generateAnnouncementDraftPrompt(input);
    return output!;
  }
);
