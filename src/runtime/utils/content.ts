import type {
  ContentNavigationItem,
  PageCollectionItemBase,
} from "@nuxt/content";

type MapContentNavigationItemOptions = {
  labelAttribute?: string;
  deep?: number;
};

export function mapContentNavigationItem(
  item: ContentNavigationItem,
  options?: MapContentNavigationItemOptions,
  currentDepth: number = 0,
): Omit<ContentNavigationItem, "title" | "path"> & {
  label?: string;
  to?: string;
} {
  const navMap = {
    [options?.labelAttribute || "title"]: "label",
    path: "to",
  };

  const link = Object.keys(item).reduce(
    (link2: Record<string, any>, key: string) => {
      if (item[key]) {
        const mappedKey = navMap[key] || key;
        link2[mappedKey] = item[key];
      }
      return link2;
    },
    {} as Record<string, any>,
  );

  const shouldRecurse =
    typeof options?.deep === "undefined" || currentDepth < options.deep;

  if (shouldRecurse && Array.isArray(item.children)) {
    link.children = item.children.map((child) =>
      mapContentNavigationItem(child, options, currentDepth + 1),
    );
  } else {
    link.children = [];
  }

  return link;
}

export function mapContentNavigation(
  navigation: ContentNavigationItem[],
  options?: MapContentNavigationItemOptions,
): (Omit<ContentNavigationItem, "title" | "path"> & {
  label?: string;
  to?: string;
})[] {
  return navigation.map((item) => mapContentNavigationItem(item, options));
}

type ReturnN = string | undefined;
export function findPageHeadline(
  navigation?: ContentNavigationItem[],
  page?: PageCollectionItemBase | null,
): ReturnN {
  if (!navigation?.length || !page) {
    return;
  }

  for (const link of navigation) {
    if (link.children) {
      for (const childLink of link.children) {
        if (childLink.path === page.path) {
          return link.title;
        }
      }

      const headline = findPageHeadline(link.children, page);
      if (headline) {
        return headline;
      }
    }
  }
}

export function findPageBreadcrumb(
  navigation?: ContentNavigationItem[],
  page?: PageCollectionItemBase | undefined | null,
): ContentNavigationItem[] {
  if (!navigation?.length || !page) {
    return [];
  }

  return navigation.reduce((breadcrumb: ContentNavigationItem[], link) => {
    if (page.path && (page.path + "/").startsWith(link.path + "/")) {
      if (link.children) {
        breadcrumb.push(link);
        breadcrumb.push(...findPageBreadcrumb(link.children, page));
      }
    }

    return breadcrumb;
  }, []);
}
