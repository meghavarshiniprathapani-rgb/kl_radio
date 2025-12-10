'use server';

import { generateAnnouncementDraft } from '@/ai/flows/generate-announcement-draft';
import { z } from 'zod';

const schema = z.object({
  prompt: z.string().min(10, { message: 'Prompt must be at least 10 characters.' }),
});

export type FormState = {
  message: string;
  draft: string;
}

export async function handleGenerateAnnouncement(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  
  const validatedFields = schema.safeParse({
    prompt: formData.get('prompt'),
  });

  if (!validatedFields.success) {
    return {
      message: 'error',
      draft: validatedFields.error.flatten().fieldErrors.prompt?.[0] ?? "Invalid prompt",
    };
  }

  try {
    const result = await generateAnnouncementDraft({ prompt: validatedFields.data.prompt });
    if (result?.draft) {
      return { message: 'success', draft: result.draft };
    }
    return { message: 'error', draft: 'Failed to generate draft. The AI model did not return a valid response.' };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
    return { message: 'error', draft: `An error occurred: ${errorMessage}` };
  }
}
