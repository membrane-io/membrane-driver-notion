import { state, root, nodes } from "membrane";
import {
  getItemsFromResponse,
  getNextPageRef,
  getSelfGref,
  api as _api,
} from "./index.custom";
async function api(method: string, path: string, query?: any, body?: string): Promise<any> {
  return _api(method, path, query, body);
}
export const Root = {
  blocks: () => ({}),
  databases: () => ({}),
  pages: () => ({}),
  users: () => ({}),
  status() {
    if (!state.token) {
      return `Please [configure the Notion API token](https://www.notion.so/Using-the-Official-Notion-API-3b4399debebc443aad399b948558c9d1)`;
    } else {
      return `Ready`;
    }
  },
  configure: ({ args: { token } }) => {
    state.token = token;
  },
};
export const Block = {
  gref: ({ obj, self }) => {
    return getSelfGref(obj, "Block", self);
  },
  paragraph: async ({ obj }) => {
    const val = obj["paragraph"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
};
export const Database = {
  gref: ({ obj, self }) => {
    return getSelfGref(obj, "Database", self);
  },
  properties: async ({ obj }) => {
    const val = obj["properties"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  title: async ({ obj }) => {
    const items = obj["title"];
    if (items) {
      return items.map((e: any) => JSON.stringify(e));
    }
  },
};
export const Page = {
  gref: ({ obj, self }) => {
    return getSelfGref(obj, "Page", self);
  },
  parent: async ({ obj }) => {
    const val = obj["parent"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  properties: async ({ obj }) => {
    const val = obj["properties"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  appendBlock: async ({ args: { children }, self }) => {
    const { id } = self.$argsAt(root.pages.one);
    const res = await api("PATCH", `v1/blocks/${id}/children`, null, JSON.stringify(children));
    return await res.json();
  }
};
export const User = {
  gref: ({ obj, self }) => {
    return getSelfGref(obj, "User", self);
  },
  avatar_url: async ({ obj }) => {
    const val = obj["avatar_url"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
  person: async ({ obj }) => {
    const val = obj["person"];
    return typeof val === "string" ? val : JSON.stringify(val);
  },
};
export const BlockCollection = {
  one: async ({ args }) => {
    const res = await api("GET", `v1/blocks/${args.id}`);
    return await res.json();
  },
};
export const DatabaseCollection = {
  one: async ({ args }) => {
    const res = await api("GET", `v1/databases/${args.id}`);
    return await res.json();
  },
};
export const PageCollection = {
  one: async ({ args }) => {
    const res = await api("GET", `v1/pages/${args.id}`);
    return await res.json();
  },
};
export const UserCollection = {
  one: async ({ args }) => {
    const res = await api("GET", `v1/users/${args.id}`);
    return await res.json();
  },
};
