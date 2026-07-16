import SkillsCarousel from '../components/SkillsCarousel'
import { ICON_REGISTRY } from '../components/iconRegistry'

const SKILL_SLUGS = Object.keys(ICON_REGISTRY)

export default function Skills() {
  return (
    <section id="skills" className="h-screen snap-start snap-always">
      <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col overflow-y-auto pt-24">
        <h2 className="text-center font-space-grotesk text-[64px] font-medium text-[#181a1d]">
          Skills
        </h2>
        <div className="flex flex-1 items-center justify-center">
          <SkillsCarousel
            iconSlugs={SKILL_SLUGS}
            radius={2000}
            tileSize={210}
            className="h-[420px] w-[1200px] max-w-full"
          />
        </div>
      </div>
    </section>
  )
}
