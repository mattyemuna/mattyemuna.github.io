export default function Nav() {
  return (
    <nav className="flex h-[60px] w-full items-center justify-between border-b border-[#d8d8d8] bg-[#d3d3d3] px-9 font-ibm-plex-sans text-xl text-[#282828]">
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
    </nav>
  )
}
