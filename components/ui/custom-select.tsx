'use client'

import { useEffect, useRef, useState } from 'react'

type Option = {
  value: string | number
  label: string
}

type CustomSelectProps = {
  name: string
  options: Option[]
  placeholder: string
  required?: boolean
}

export default function CustomSelect({
  name,
  options,
  placeholder,
  required = false,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Option | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div ref={rootRef} className="relative w-full min-w-0">
      <input
        type="hidden"
        name={name}
        value={selected?.value?.toString() ?? ''}
        required={required}
      />

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`
          flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-left
          transition outline-none
          bg-white text-zinc-900 border-zinc-300
          hover:border-zinc-400 hover:bg-zinc-50
          focus:ring-2 focus:ring-blue-500/20
          dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700
          dark:hover:border-zinc-500 dark:hover:bg-zinc-800
        `}
      >
        <span
          className={
            selected
              ? 'truncate'
              : 'truncate text-zinc-500 dark:text-zinc-400'
          }
        >
          {selected?.label ?? placeholder}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`ml-3 h-5 w-5 shrink-0 transition ${
            open ? 'rotate-180' : ''
          }`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          className="
            absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border shadow-lg
            bg-white border-zinc-200
            dark:bg-zinc-900 dark:border-zinc-700
          "
        >
          {options.map((option) => {
            const isActive = selected?.value === option.value

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setSelected(option)
                  setOpen(false)
                }}
                className={`
                  flex w-full items-center justify-between px-4 py-3 text-left transition
                  hover:bg-zinc-100 dark:hover:bg-zinc-800
                  ${isActive ? 'bg-zinc-100 dark:bg-zinc-800' : ''}
                `}
              >
                <span className="truncate">{option.label}</span>

                {isActive && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="ml-3 h-5 w-5 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 5.29a1 1 0 0 1 .006 1.414l-8 8.068a1 1 0 0 1-1.42.003l-4-4.034a1 1 0 0 1 1.42-1.41l3.29 3.318 7.296-7.356a1 1 0 0 1 1.414-.003Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}