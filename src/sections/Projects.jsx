import crosshairIcon from '../assets/crosshair-icon.png'
import ontargetDemo from '../assets/ontarget-demo.png'
import { GlareCard } from '@/components/ui/glare-card'

const TAGS = [
  'Python',
  'TypeScript',
  'JavaScript',
  'SQL',
  'FastAPI',
  'Vite',
  'scikit-learn',
  'Pandas',
  'Anthropic SDK',
  'React 18',
  'Render/Railway',
  'Vercel',
  'Tailwind CSS',
]

function TechTag({ children }) {
  return (
    <span className="rounded-[21px] border border-[#838283] bg-[#dadada] px-3 py-1 font-mona-sans text-sm text-[#838283]">
      {children}
    </span>
  )
}

function ProjectCardShell({ children }) {
  return (
    <div className="h-[721px] w-[620px] shrink-0 rounded-[10px] border-[1.5px] border-[#838283] bg-[#dadada] p-6">
      {children}
    </div>
  )
}

function OnTargetCard() {
  return (
    <a
    href="https://premier-league-xg-predictor.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
    className="block h-[721px] w-[620px] shrink-0">
      <GlareCard className="bg-[#dadada]">
        <div className="h-full w-full rounded-[10px] border-[1.5px] border-[#838283] bg-[#dadada] p-6">
          <div className="flex items-center gap-3">
            <img src={crosshairIcon} alt="" className="size-16" />

            <h3 className="font-ibm-plex-sans text-[30px] font-semibold text-[#18191a]">
              OnTarget
            </h3>
          </div>

          <p className="mt-3 font-ibm-plex-sans text-lg font-light text-black">
            Full-stack web app that predicts expected goals (xG) for any PL matchup using a
            scikit-learn model trained on 5 seasons of team form, venue splits, Elo ratings, and
            head-to-head data. Features a FastAPI backend, React/TypeScript frontend, and a
            Claude-powered chat analyst (via Anthropic tool-use) that calls the prediction model
            live and explains the numbers in plain football terms.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <TechTag key={tag}>{tag}</TechTag>
            ))}
          </div>

          <div className="mt-3 rounded-[4px] bg-[#68dca4] p-[6px]">
            <img
              src={ontargetDemo}
              alt="OnTarget app screenshot"
              className="h-[300px] w-full rounded-[4px] object-cover"
            />
          </div>
        </div>
      </GlareCard>
    </a>
  )
}

function ComingSoonCard() {
  return (
    <ProjectCardShell>
      <div className="flex h-full items-center justify-center">
        <p className="font-ibm-plex-sans text-[36px] font-semibold text-[#393c42]">COMING SOON</p>
      </div>
    </ProjectCardShell>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="h-screen snap-start snap-always">
      <div className="mx-auto flex h-full max-w-[1440px] flex-col overflow-y-auto pt-4 pb-2">
        <h2 className="text-center font-space-grotesk text-[64px] font-medium text-[#181a1d]">
          Projects
        </h2>
        <p className="mt-2 text-center font-ibm-plex-sans text-[26px] font-light text-[#393c42]">
          Here are some projects I&rsquo;ve worked on recently&hellip;
        </p>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex gap-[61px]">
            <OnTargetCard />
            <ComingSoonCard />
          </div>
        </div>
      </div>
    </section>
  )
}
