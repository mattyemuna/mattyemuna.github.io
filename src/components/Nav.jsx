export default function Nav() {
  return (
    <nav className="relative z-50 h-[60px] w-full shrink-0 border-b border-[#d8d8d8] bg-[#d3d3d3] font-ibm-plex-sans text-xl text-[#282828]">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-9">
        <ul className="flex items-center gap-10">
          <li>
            <a href="#hero">ABOUT</a>
          </li>
          <li>
            <a href="#projects">PROJECTS</a>
          </li>
          <li>
            <a href="#skills">SKILLS</a>
          </li>
        </ul>
        <div className="flex items-center gap-3">
          <span>MLE</span>
          <span>|</span>
          <span>SWE</span>
        </div>
      </div>
    </nav>
  )
}
