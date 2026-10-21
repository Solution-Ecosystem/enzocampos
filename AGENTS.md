<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio structure
- Keep the portfolio as a single index route with in-page section navigation; this preserves the continuous editorial presentation.
- Define portfolio styling and semantic colors in src/styles.css and use the shared Button for interactive controls to maintain one visual system.
- Show only real client work and contact details the owner supplied; placeholder performance numbers live only in src/lib/project-stats.ts and stay labeled as illustrative on screen until real data replaces them; this keeps the portfolio truthful.
- Each client project renders as its own full-width case block (src/components/ProjectCase.tsx) with animated stats and a views chart; one component keeps every case consistent.
- Store client and Instagram imagery as Lovable asset pointers under src/assets/clients and embed reels via Instagram's official /embed iframes; this keeps media off the repo and avoids rehosting video.
- Build WhatsApp and Instagram links only through src/lib/contact.ts; one source keeps every contact button consistent.
