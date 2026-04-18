import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

type Props = {
  title: string
  description: string
  tags: readonly string[]
  index: number
}

export default function ProjectCard({ title, description, tags, index }: Props) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
    >
      <div className="project-card__top">
        <p className="project-number">0{index + 1}</p>
        <ArrowUpRight size={20} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="tag-list">
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  )
}
