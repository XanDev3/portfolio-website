import {
  SiTerraform,
  SiKubernetes,
  SiDocker,
  SiPrometheus,
  SiGrafana,
  SiGithubactions,
  SiTypescript,
  SiNextdotjs,
  SiSupabase,
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiGnubash,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6"; // AWS was removed from simple-icons
import type { IconType } from "react-icons";
import type { Tech } from "@/components/Marquee";
import ArgoIcon from "@/components/icons/ArgoIcon"; // custom: white eyes
import PythonIcon from "@/components/icons/PythonIcon"; // custom: two-tone blue+yellow

export type TechMeta = { Icon: IconType; color: string };

// Central registry: tech name -> logo + brand color.
// Read by both the stack marquee and the project-card stack badges.
export const TECH_ICONS: Record<string, TechMeta> = {
  Terraform: { Icon: SiTerraform, color: "#844FBA" },
  Kubernetes: { Icon: SiKubernetes, color: "#326CE5" },
  k3s: { Icon: SiKubernetes, color: "#326CE5" }, // k3s is a Kubernetes distro; no dedicated icon
  AWS: { Icon: FaAws, color: "#FF9900" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  ArgoCD: { Icon: ArgoIcon, color: "#EF7B4D" },
  Prometheus: { Icon: SiPrometheus, color: "#E6522C" },
  Grafana: { Icon: SiGrafana, color: "#F46800" },
  "GitHub Actions": { Icon: SiGithubactions, color: "#2088FF" },
  Python: { Icon: PythonIcon, color: "#3776AB" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  "Next.js": { Icon: SiNextdotjs, color: "#FFFFFF" }, // Next's mark is black; white reads on our dark bg
  Supabase: { Icon: SiSupabase, color: "#3FCF8E" },
  React: { Icon: SiReact, color: "#61DAFB" },
  Node: { Icon: SiNodedotjs, color: "#5FA04E" },
  Postgres: { Icon: SiPostgresql, color: "#4169E1" },
  Bash: { Icon: SiGnubash, color: "#4EAA25" },
};

// The stack marquee, in display order.
const MARQUEE = [
  "Terraform",
  "Kubernetes",
  "AWS",
  "Docker",
  "ArgoCD",
  "Prometheus",
  "Grafana",
  "GitHub Actions",
  "Python",
  "TypeScript",
];
export const TECH: Tech[] = MARQUEE.map((label) => ({
  label,
  ...TECH_ICONS[label],
}));
