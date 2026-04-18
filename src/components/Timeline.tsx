import { motion } from 'framer-motion'
import { BookOpen, GraduationCap, Code } from 'lucide-react'

type TimelineItem = {
  year: string
  title: string
  description: string
  icon: string
}

type Props = {
  items: readonly TimelineItem[]
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'BookOpen':
      return <BookOpen size={20} />
    case 'GraduationCap':
      return <GraduationCap size={20} />
    case 'Code':
      return <Code size={20} />
    default:
      return <BookOpen size={20} />
  }
}

export default function Timeline({ items }: Props) {
  return (
    <div className="timeline-container">
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          className="timeline-item"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
        >
          <div className="timeline-icon">
            {getIcon(item.icon)}
          </div>
          <div className="timeline-content">
            <span className="timeline-year">{item.year}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
