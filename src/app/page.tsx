"use client";

import { useEffect } from "react";
import { useHashRoute } from "@/lib/navigation/hashRouter";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { HomeView } from "@/components/views/HomeView";
import { ChaptersView } from "@/components/views/ChaptersView";
import { ChapterView } from "@/components/views/ChapterView";
import { MethodView } from "@/components/views/MethodView";
import { SourcesView } from "@/components/views/SourcesView";
import { StatusView } from "@/components/views/StatusView";
import { AboutView } from "@/components/views/AboutView";
import { getChapter } from "@/chapters/registry";

/**
 * Australia Clarity — single-route application shell.
 *
 * The public site is one static route ("/"); sections are addressed by hash
 * (#/method, #/chapters/chapter-01, …), which keeps links shareable and
 * works identically in `next dev` and the GitHub Pages static export.
 */
export default function Page() {
  const [route] = useHashRoute();

  // On route change: return to the top and move focus to the view heading so
  // keyboard and screen-reader users land in the new content, not the nav.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    const heading = document.getElementById("view-heading");
    if (heading) {
      heading.focus({ preventScroll: true });
    }
  }, [route]);

  let content: React.ReactNode;
  switch (route.view) {
    case "home":
      content = <HomeView />;
      break;
    case "chapters":
      content = <ChaptersView />;
      break;
    case "chapter": {
      const chapter = getChapter(route.chapterId);
      content = chapter ? (
        <ChapterView chapter={chapter} />
      ) : (
        <ChapterNotFound />
      );
      break;
    }
    case "method":
      content = <MethodView />;
      break;
    case "sources":
      content = <SourcesView />;
      break;
    case "status":
      content = <StatusView />;
      break;
    case "about":
      content = <AboutView />;
      break;
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-panel focus:px-4 focus:py-2 focus:text-foreground"
      >
        Skip to content
      </a>
      <SiteHeader current={route.view} />
      <main id="main-content" className="flex-1">
        {content}
      </main>
      <SiteFooter />
    </>
  );
}

function ChapterNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 id="view-heading" tabIndex={-1} className="font-serif text-3xl text-foreground">
        Chapter not found
      </h1>
      <p className="mt-4 text-muted-foreground">
        That chapter slot does not exist. The fourteen research chapters are
        listed on the chapters page.
      </p>
      <a
        href="#/chapters"
        className="mt-8 inline-flex min-h-11 items-center rounded-md border border-border bg-panel px-5 text-sm text-teal hover:text-sand"
      >
        View all chapters
      </a>
    </div>
  );
}
