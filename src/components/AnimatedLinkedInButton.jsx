import ArrowRightIcon from './ArrowRightIcon'

export default function AnimatedLinkedInButton() {
  return (
    <a
      href="https://www.linkedin.com/in/matthew-emuna/"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-[52px] w-[153px] items-center justify-between
      overflow-hidden rounded-[2px] border border-[#c8c7c7]
      bg-[#cdcdcd] px-4 font-ibm-plex-sans text-2xl text-[#292928]"
    >
      <span
        className="
        transition-all duration-200 delay-75 ease-out
        group-hover:translate-x-[6px]
        group-hover:font-semibold
        group-hover:tracking-[0.02em]
        "
      >
        LinkedIn
      </span>

      <ArrowRightIcon
        className="
        size-5 transition-all duration-100 ease-out
        group-hover:translate-x-2
        group-hover:opacity-0
        "
      />
    </a>
  )
}