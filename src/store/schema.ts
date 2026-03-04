import {createStore} from "tinybase"

import {ApplicationStatus} from "../types/applicationStatus"

export const JOBS_TABLE = "jobs"

export const store = createStore().setTablesSchema({
  [JOBS_TABLE]: {
    id: {type: "string", default: ""},
    company: {type: "string", default: ""},
    title: {type: "string", default: ""},
    status: {type: "string", default: ApplicationStatus.Saved},
    rejectionReason: {type: "string", default: ""},
    dateApplied: {type: "string", default: ""},
    dateSaved: {type: "string", default: ""},
    url: {type: "string", default: ""},
    isSynced: {type: "boolean", default: false},
    isWarm: {type: "boolean", default: false}
  }
})
