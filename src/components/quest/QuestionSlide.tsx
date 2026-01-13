"use client"

import React from "react"

interface Props {
  title: string
  type: "boolean" | "slider" | "radio"
  value: string
  onChange: (v: string) => void
  options?: { label: string; value: string }[]
  min?: number
  max?: number
}

export const QuestionSlide: React.FC<Props> = ({
  title,
  type,
  value,
  onChange,
  options,
  min,
  max,
}) => {
  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>

      {/* YES / NO */}
      {type === "boolean" && (
        <div className="flex gap-4">
          {["ya", "tidak"].map((v) => (
            <button
              key={v}
              onClick={() => onChange(v)}
              className={`flex-1 py-3 rounded-lg border ${
                value === v ? "bg-black text-white" : "bg-white"
              }`}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* SLIDER */}
      {type === "slider" && (
        <>
          <input
            type="range"
            min={min}
            max={max}
            value={value || min}
            onChange={(e) => onChange(e.target.value)}
            className="w-full"
          />
          <p className="mt-4 text-center">{value || min} jam</p>
        </>
      )}

      {/* RADIO */}
      {type === "radio" && (
        <div className="space-y-3">
          {options?.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
