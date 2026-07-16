import ArrowRightIcon from '../components/ArrowRightIcon'
import GithubCard from '../components/GithubCard'
import WireStrands from '../components/WireStrands'

function HeroButton({ href, width, children }) {
  return (
    <a
      href={href}
      style={{ width }}
      className="flex h-[52px] items-center justify-between rounded-[2px] border border-[#c8c7c7] bg-[#cdcdcd] px-4 font-ibm-plex-sans text-2xl text-[#292928]"
    >
      {children}
      <ArrowRightIcon className="size-5" />
    </a>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen snap-start snap-always">
      <WireStrands
        trigger="load"
        className="pointer-events-none absolute top-[-140px] left-0 z-0 aspect-[1440/1159] w-full"
      />
      <div className="relative z-10 mx-auto h-full max-w-[1440px] overflow-y-auto pb-16">
        <p className="pt-[43px] pl-[77px] font-space-grotesk text-[48px] leading-none font-light text-[#393c42]">
          Hi, I&rsquo;m...
        </p>
        <h1 className="mt-[6px] pl-[142px] font-space-grotesk text-[96px] leading-none font-medium whitespace-nowrap text-[#181a1d]">
          Matthew Emuna
        </h1>
        <div className="mt-[22px] flex gap-[34px] pl-[157px]">
          <HeroButton href="/resume.pdf" width="144px">
            Resume
          </HeroButton>
          <HeroButton href="https://linkedin.com" width="153px">
            LinkedIn
          </HeroButton>
          <HeroButton href="#contact" width="140px">
            Contact
          </HeroButton>
        </div>
        <div className="mt-12 pl-[95px]">
          <GithubCard />
        </div>
      </div>
    </section>
  )
}
