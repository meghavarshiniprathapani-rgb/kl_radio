'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { handleGenerateAnnouncement, type FormState } from '../actions';
import { Wand2, ClipboardCopy } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Generating...' : <><Wand2 className="mr-2 h-4 w-4" /> Generate Draft</>}
    </Button>
  );
}

export function AnnouncementGenerator() {
  const initialState: FormState = { message: '', draft: '' };
  const [state, formAction] = useFormState(handleGenerateAnnouncement, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message === 'error' && state.draft) {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: state.draft,
      });
    }
  }, [state, toast]);
  
  const copyToClipboard = () => {
    if (state.draft) {
      navigator.clipboard.writeText(state.draft);
      toast({
        title: 'Copied to Clipboard!',
        description: 'The announcement draft has been copied.',
      });
    }
  };

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-4">
        <div className="grid w-full gap-2">
          <Label htmlFor="prompt">Announcement Prompt</Label>
          <Textarea
            id="prompt"
            name="prompt"
            placeholder="e.g., Announce a new rock music show 'Rock On' hosted by RJ Riff, every Friday at 8 PM. Mention it's for lovers of classic and modern rock."
            rows={4}
            required
          />
        </div>
        <SubmitButton />
      </form>

      {state.message && (
        <div>
          <Label>Generated Draft</Label>
          <Card className="mt-2 relative">
            <CardContent className="p-4">
              <p className="text-sm whitespace-pre-wrap">
                {state.message === 'success' ? state.draft : "Could not generate draft. Please check the error message and try again."}
              </p>
            </CardContent>
            {state.message === 'success' && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7"
                onClick={copyToClipboard}
              >
                <ClipboardCopy className="h-4 w-4" />
                <span className="sr-only">Copy to clipboard</span>
              </Button>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
