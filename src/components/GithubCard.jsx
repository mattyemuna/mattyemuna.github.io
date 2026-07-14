import GithubMarkIcon from './GithubMarkIcon'
import LocationPinIcon from './LocationPinIcon'
import profilePhoto from '../assets/profile-photo.png'

const REPOS = [
  {
    name: 'mancala-ai',
    description:
      'I made a Mancala bot using alphabeta pruning, reinforcement learning, and a neural net.',
    language: 'Python',
    languageColor: '#3572A5',
  },
  {
    name: 'mattyemuna.github.io',
    description: null,
    language: 'JavaScript',
    languageColor: '#f1e05a',
  },
  {
    name: 'patient-voice-bot',
    description: null,
    language: 'Python',
    languageColor: '#3572A5',
  },
  {
    name: 'premier-league-xg-predictor',
    description: 'PL xG Predictor....',
    language: 'Python',
    languageColor: '#3572A5',
  },
  {
    name: 'KAug',
    description: 'My novel data augmentation method, and brain tumor classifier',
    language: 'Python',
    languageColor: '#3572A5',
  },
]

function RepoCard({ name, description, language, languageColor }) {
  return (
    <div className="w-[376px] rounded-[7px] border-[1.5px] border-[#cecece] bg-[#ebeaea] p-4">
      <div className="flex items-start justify-between gap-2">
        <a
          href={`https://github.com/mattyemuna/${name}`}
          target="_blank"
          rel="noreferrer"
          className="font-mona-sans text-sm font-semibold text-[#2e69d3] hover:underline"
        >
          {name}
        </a>
        <span className="shrink-0 rounded-[10px] border border-[#cfcecf] bg-[#ebeaea] px-2 py-0.5 font-mona-sans text-xs font-semibold text-[#5b626d]">
          Public
        </span>
      </div>
      {description && (
        <p className="mt-2 font-mona-sans text-[10px] text-[#5a636d]">{description}</p>
      )}
      <div className="mt-3 flex items-center gap-1.5">
        <span
          className="size-[13px] shrink-0 rounded-full"
          style={{ backgroundColor: languageColor }}
        />
        <span className="font-mona-sans text-[11px] text-[#5a636d]">{language}</span>
      </div>
    </div>
  )
}

export default function GithubCard() {
  return (
    <div className="flex w-[1250px] gap-[54px] rounded-[10px] bg-[#ebebeb] p-8">
      <div className="flex w-[264px] shrink-0 flex-col">
        <div className="mb-4 flex items-center gap-2 text-black">
          <GithubMarkIcon className="size-4" />
          <span className="font-mona-sans text-sm font-semibold">GitHub</span>
        </div>

        <img
          src={profilePhoto}
          alt="Matthew Emuna"
          className="size-[264px] shrink-0 rounded-full border-[5px] border-[#252424] object-cover"
          style={{ objectPosition: '50% 20%' }}
        />

        <p className="mt-4 font-ibm-plex-sans text-xl font-semibold text-[#18191a]">
          Matthew Emuna
        </p>
        <p className="mt-0 font-mona-sans text-2xl text-[#5a5959]">mattyemuna</p>
        <p className="mt-3 font-mona-sans text-base text-[#5a636d]">
          Compiles feelings, mostly bugs
        </p>

        <div className="mt-8 flex items-center gap-1.5 text-[#6d6a6a]">
          <LocationPinIcon className="size-[18px]" />
          <span className="font-mona-sans text-xl">New York, NY</span>
        </div>
      </div>

      <div className="flex-1">
        <p className="mb-4 font-mona-sans text-sm text-black">Popular repositories</p>
        <div className="grid grid-cols-2 gap-x-[54px] gap-y-[38px]">
          {REPOS.map((repo) => (
            <RepoCard key={repo.name} {...repo} />
          ))}
        </div>
      </div>
    </div>
  )
}
