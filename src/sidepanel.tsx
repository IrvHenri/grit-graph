import {useEffect, useState} from "react"
import {useTable} from "tinybase/ui-react"

import "./style.css"
import {JOBS_TABLE, store} from "~store/schema"
import {loadFromStorage, saveToStorage} from "~store/storage"
import {ApplicationStatus} from "~types/applicationStatus"
import { RejectionReason } from "~types/rejectionReason"

const ALL_STATUSES = Object.values(ApplicationStatus)
const ALL_REJECTION_REASONS = Object.values(RejectionReason)

const STATUS_COLORS: Record<string, string> = {
  [ApplicationStatus.Saved]: "bg-slate-500",
  [ApplicationStatus.Applied]: "bg-blue-600",
  [ApplicationStatus.PhoneScreen]: "bg-yellow-500 text-slate-900",
  [ApplicationStatus.OnSite]: "bg-orange-500 text-slate-900",
  [ApplicationStatus.Offer]: "bg-green-600",
  [ApplicationStatus.Rejected]: "bg-red-600"
}

function IndexPopup() {
  const [loading, setLoading] = useState(true)
  const [isRejected, setIsRejected] = useState(false)

  const jobs = useTable(JOBS_TABLE, store)

  useEffect(() => {
    loadFromStorage().then(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="w-80 p-4 bg-slate-900 text-slate-400 text-sm min-h-screen">
        Loading...
      </div>
    )
  }

  const sortedJobs = Object.entries(jobs).sort(
    ([, a], [, b]) =>
      new Date((b.dateSaved as string) || 0).getTime() -
      new Date((a.dateSaved as string) || 0).getTime()
  )

  if (sortedJobs.length === 0) {
    return (
      <div className="w-80 p-4 bg-slate-900 text-slate-400 text-sm min-h-screen">
        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter mb-3">
          GritGraph
        </p>
        No saved jobs yet. Browse LinkedIn and click "Save Job".
      </div>
    )
  }

  return (
    <div className="w-80 bg-slate-900 text-white min-h-screen">
      <div className="p-3 border-b border-slate-700">
        <h1 className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">
          GritGraph
        </h1>
        <p className="text-xs text-slate-400">
          {sortedJobs.length} job{sortedJobs.length !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="divide-y divide-slate-700">
        {sortedJobs.map(([id, job]) => (
          <div key={id} className="p-3 space-y-2">
            <div>
              <p className="text-sm font-semibold leading-tight">{job.title as string}</p>
              <p className="text-xs text-slate-400">{job.company as string}</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <select
                value={job.status as string}
                onChange={(e) => {
                  
                  store.setCell(JOBS_TABLE, id, "status", e.target.value)
                  if(e.target.value !== 'Rejected'){
                    store.setCell(JOBS_TABLE, id, "rejectionReason", '')
                  }
                  saveToStorage()
                }}
                className="text-xs bg-slate-800 border border-slate-600 rounded px-1.5 py-0.5 text-white flex-1">
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {job.status === 'Rejected' && (
                <select
                  value={job.rejectionReason as string}
                  onChange={(e) => {
                    store.setCell(JOBS_TABLE, id, "rejectionReason", e.target.value)
                    saveToStorage()
                  }}
                  className="text-xs bg-slate-800 border border-slate-600 rounded px-1.5 py-0.5 text-white flex-1">
                  {ALL_REJECTION_REASONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              ) }

            </div>
            {job.dateApplied && (
              <p className="text-[10px] text-slate-500">{job.dateSaved as string}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default IndexPopup
