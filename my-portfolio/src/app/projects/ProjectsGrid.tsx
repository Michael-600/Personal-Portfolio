"use client";

import { motion } from "framer-motion";
// use RELATIVE imports to avoid path-alias issues
import ProjectCard from "../../components/ProjectCard";
import { projects } from "../../data/projects";

export default function ProjectsGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
    >
      {projects.map((p) => (
        <motion.div
          key={p.slug}
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
        >
          <ProjectCard p={p} />
        </motion.div>
      ))}
    </motion.div>
  );
}
