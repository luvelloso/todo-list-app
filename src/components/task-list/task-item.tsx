import type { Task } from '../../types/task'
import { Checkbox } from '../shared/checkbox'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-300 ease-out ${task.completed ? 'translate-y-1 border-[#C8D8A7] bg-[#F5F8E7] opacity-90 shadow-sm' : 'border-[#E2E6CC] bg-[#FCFDF9]'}`}
    >
      <div className="flex-1">
        <Checkbox
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          label={task.text}
        />
        {task.description && (
          <p className="ml-7 mt-1 max-w-xl truncate text-xs leading-4 text-[#6D7A53]">
            {task.description}
          </p>
        )}
      </div>

      <button
        aria-label="Delete task"
        onClick={() => onDelete(task.id)}
        className="ml-3 flex h-7 w-7 items-center justify-center rounded-full text-[#7D993B] hover:bg-[#F3F5EA]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
          <path d="M10 11v6"></path>
          <path d="M14 11v6"></path>
          <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    </div>
  )
}
