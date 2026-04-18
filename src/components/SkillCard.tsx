import { motion } from 'framer-motion'

type Props = {
  skill: string
  index: number
}

export default function SkillCard({ skill, index }: Props) {
  return (
    <motion.div
      className="skill-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.03 }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      {skill}
    </motion.div>
  )
}
