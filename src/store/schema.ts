import {createStore} from 'tinybase';
import { ApplicationStatus } from '../types/applicationStatus';

export const JOBS_TABLE = 'jobs';

const store = createStore().setTablesSchema({
  JOBS_TABLE: {
    id: {type: 'string'},
    company: {type: 'string'},
    title: {type: 'string'},
    status: {type: 'string', default: ApplicationStatus.Saved},
    rejectionReason: {type:'string'},
    dateApplied: { type:'string'},
    url: { type: 'string' },
    isSynced: { type: 'boolean', default: false },
    isWarm: { type: 'boolean', default: false }

  },
});