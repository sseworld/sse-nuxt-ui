export function getSlotChildrenText(children: any) {
  return children
    .map((node: any) => {
      if (!node.children || typeof node.children === "string")
        return node.children || "";
      else if (Array.isArray(node.children))
        return getSlotChildrenText(node.children);
      else if (node.children.default)
        return getSlotChildrenText(node.children.default());
    })
    .join("");
}

export function transformUI(ui: any, uiProp: any) {
  return Object.entries(ui).reduce((acc, [key, value]) => {
    acc[key] =
      typeof value === "function" ? value({ class: uiProp?.[key] }) : value;
    return acc;
  }, uiProp || {});
}

export * from "./content";
