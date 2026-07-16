import ArrowRightIcon from './ArrowRightIcon'

export default function AnimatedResumeButton() {
  return (
    <a
      href="/RESUME2copy.PDF"
      download="Matthew_Emuna_Resume.pdf"
      className="
        group flex h-[52px] w-[144px]
        items-center justify-between
        rounded-[2px]
        border border-[#c8c7c7]
        bg-[#cdcdcd]
        px-4
        font-ibm-plex-sans
        text-2xl
        text-[#292928]
      "
    >
      <span>Resume</span>

      <ArrowRightIcon
        className="
          size-5
          transition-all
          duration-200
          ease-out
          group-hover:-translate-y-[1px]
          group-hover:rotate-[-45deg]
        "
      />
    </a>
  )
}