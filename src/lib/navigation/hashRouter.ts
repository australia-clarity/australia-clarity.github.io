"use client";

/**
 * Minimal hash-based client router.
 *
 * The public site is a single static route ("/"); sections are addressed with
 * hash URLs (e.g. "#/chapters/01") so that links are shareable, the browser
 * back button works, and GitHub Pages static export needs no server routing.
 */

export type Route =
  | { view: "home" }
  | { view: "chapters" }
  | { view: "chapter"; chapterId: string }
  | { view: "method" }
  | { view: "sources" }
  | { view: "status" }
  | { view: "about" };

const CHAPTER_RE = /^chapter-(\d{2})$/;

export function parseHash(hash: string): Route {
  const clean = hash.replace(/^#\/?/, "").replace(/\/+$/, "");
  if (clean === "" || clean === "home") return { view: "home" };
  if (clean === "chapters") return { view: "chapters" };
  if (clean === "method") return { view: "method" };
  if (clean === "sources") return { view: "sources" };
  if (clean === "status") return { view: "status" };
  if (clean === "about") return { view: "about" };
  const chapterMatch = clean.match(/^chapters\/(chapter-\d{2})$/);
  if (chapterMatch && CHAPTER_RE.test(chapterMatch[1])) {
    return { view: "chapter", chapterId: chapterMatch[1] };
  }
  return { view: "home" };
}

export function routeToHash(route: Route): string {
  switch (route.view) {
    case "home":
      return "#/";
    case "chapters":
      return "#/chapters";
    case "chapter":
      return `#/chapters/${route.chapterId}`;
    case "method":
      return "#/method";
    case "sources":
      return "#/sources";
    case "status":
      return "#/status";
    case "about":
      return "#/about";
  }
}

import { useCallback, useEffect, useState } from "react";

export function useHashRoute(): [
  Route,
  (next: Route) => void,
] {
  const [route, setRoute] = useState<Route>(() =>
    parseHash(typeof window === "undefined" ? "#/" : window.location.hash),
  );

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((next: Route) => {
    window.location.hash = routeToHash(next);
  }, []);

  return [route, navigate];
}
