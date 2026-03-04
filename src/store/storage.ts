import {JOBS_TABLE, store} from "./schema"

const STORAGE_KEY = "grit-graph-jobs"

export async function loadFromStorage(): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.get(STORAGE_KEY, (result) => {
      const data = result[STORAGE_KEY]
      if (data) store.setTable(JOBS_TABLE, data)
      resolve()
    })
  })
}

export function saveToStorage(): void {
  chrome.storage.local.set({[STORAGE_KEY]: store.getTable(JOBS_TABLE)})
}
