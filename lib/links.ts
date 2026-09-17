/**
 * Nav and footer links point at home-page sections ("#work"). From a sub-page
 * like /work/atlas-commerce a bare hash goes nowhere, so it needs the leading
 * slash to route home first and then scroll.
 */
export function sectionHref(href: string, pathname: string) {
  return href.startsWith("#") && pathname !== "/" ? `/${href}` : href;
}
