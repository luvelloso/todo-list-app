import type { Category, Task } from '../../types/task'
import { TaskItem } from './task-item'

interface TaskSectionProps {
  category: Category
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskSection({ category, tasks, onToggle, onDelete }: TaskSectionProps) {
  if (tasks.length === 0) return null

  return (
    <section>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#7D993B]">
        {category.label}
      </p>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </div>
    </section>
  )
}