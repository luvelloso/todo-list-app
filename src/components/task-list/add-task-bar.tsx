import { useState } from 'react'
import type { CategoryId } from '../../types/task'
import { CATEGORIES, DEFAULT_CATEGORY_ID } from '../../lib/constants'
import { Input } from '../shared/input'
import { Button } from '../shared/button'

interface AddTaskBarProps {
  onAdd: (text: string, categoryId: CategoryId, description?: string) => Promise<void>
}

export function AddTaskBar({ onAdd }: AddTaskBarProps) {
  const [text,       setText]       = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState<CategoryId>(DEFAULT_CATEGORY_ID)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = text.trim()
    const trimmedDescription = description.trim()
    if (!trimmed) return
    await onAdd(trimmed, categoryId, trimmedDescription || undefined)
    setText('')
    setDescription('')
  }

  return (
    <div className="border-t border-[#E6EAD4] bg-[#FCFDF9] px-4 py-3">
      <div className="mb-2 flex gap-1.5 overflow-x-auto scrollbar-none" style={{ scrollbarWidth: 'none' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryId(cat.id)}
            className={`
              whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition-colors
              ${categoryId === cat.id
                ? 'border-[#6C8F1C] bg-[#6C8F1C] text-white'
                : 'border-[#E2E6CC] bg-white text-[#4A5F39] hover:border-[#D9E3BD]'
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="grid gap-1.5">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a task..."
          className="flex-1 border-none bg-transparent shadow-none ring-0 focus:ring-0 px-0 py-2 text-[#23320F]"
        />
        <div className="flex items-center gap-2">
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição curta (opcional)"
            className="flex-1 border-none bg-transparent px-0 py-1 text-xs text-[#5A6B49] shadow-none ring-0 focus:ring-0"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={!text.trim()}
            className="rounded-xl px-5 py-2.5 text-sm"
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  )
}
