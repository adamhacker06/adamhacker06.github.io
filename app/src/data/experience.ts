// Everything here comes from the résumé, rewritten in plain first-person language.
// The summaries are first drafts and are meant to be rewritten.

export type Kind = 'work' | 'club' | 'fellowship' | 'research' | 'campus'

export const KIND_LABELS: Record<Kind, string> = {
  work: 'Work',
  // Client projects done through a student consulting club, not employment
  club: 'Club project',
  fellowship: 'Fellowship',
  research: 'Research',
  campus: 'Campus',
}

export type Entry = {
  id: string
  kind: Kind
  role: string
  org: string
  // Extra context after the org, such as the club the project ran through or the city
  detail?: string
  when: string
  ongoing?: boolean
  summary: string
  tags: string[]
  // Optional handwritten link under the entry: `to` for a page on this site, `href` for another site
  link?: { label: string; to?: string; href?: string }
}

// One photo per entry where there is one, named after the entry's id in assets/experience
const photos = import.meta.glob<string>('../assets/experience/*.webp', { eager: true, query: '?url', import: 'default' })

const PHOTO_ALTS: Record<string, string> = {
  disney: 'Adam standing with his arms crossed beside a Disney Experiences Technology banner in an office.',
  sony: 'Adam with a group of students wearing visitor lanyards on the lawn in front of a large PlayStation sign.',
  'jane-street': 'Adam giving two thumbs up beside a circular wall sculpture, wearing a name badge on a green lanyard.',
  'as-for-all': 'Adam and two collaborators standing by their research poster and a laptop demo at a conference.',
  k12: 'Adam with nine other ambassadors in matching navy polos on a terrace, with the Berkeley Campanile behind them.',
  edison: 'Adam with a dozen colleagues around a conference table, with cupcakes on the table.',
  globe: 'Adam taking a selfie in a crowded lift with other students on the Taiwan trip.',
}

export function photoFor(id: string) {
  const src = photos[`../assets/experience/${id}.webp`]
  return src ? { src, alt: PHOTO_ALTS[id] ?? '' } : null
}

export const HIGHLIGHTS = [
  { big: 'Disney', small: 'Product management intern, summer 2026' },
  { big: '1,500+', small: 'Berkeley students on the grading dashboard I help build' },
  { big: 'SIGCSE ’26', small: 'Co-author on an accepted research poster' },
]

// Newest first
export const ENTRIES: Entry[] = [
  {
    id: 'disney',
    kind: 'work',
    role: 'Product Management Intern',
    org: 'Disney Experiences Technology',
    detail: 'Glendale, CA',
    when: 'May – Aug 2026',
    summary:
      'I spent the summer on the Digital Product Optimization team, leading early work on AI agent tooling for the group that runs experimentation and testing. A lot of it was groundwork: archiving more than a thousand past experiments so they can be searched in plain language, and working out how the team’s records should link together in Airtable.',
    tags: ['Product', 'AI tooling', 'Experimentation'],
  },
  {
    id: 'sony',
    kind: 'club',
    role: 'Software Engineering Consultant',
    org: 'Sony Interactive Entertainment',
    detail: 'through Codebase',
    when: 'Jan – May 2026',
    summary:
      'I fine-tuned multilingual BERT models that detect profanity, for a system handling 90 to 220 million requests a day. I built a tagging pipeline that works across languages and proved it on Japanese, reaching an F1 score of 0.851, and automated the step that turns QA annotations into training data so new languages are quick to add.',
    tags: ['Machine learning', 'NLP', 'Python'],
  },
  {
    id: 'jane-street',
    kind: 'fellowship',
    role: 'IN FOCUS Fellow',
    org: 'Jane Street',
    detail: 'New York, NY',
    when: 'Jan 2026',
    summary:
      'Five days in New York as one of 24 fellows, learning from senior engineers how fast systems are designed and how market making works. I also wrote my first OCaml, which meant unlearning some object-oriented habits.',
    tags: ['Systems', 'OCaml'],
  },
  {
    id: 'google',
    kind: 'club',
    role: 'Site Reliability Engineering Consultant',
    org: 'Google',
    detail: 'through Codebase',
    when: 'Sep 2025 – Jan 2026',
    summary:
      'I built Grafana and Prometheus dashboards, written in Go, that show the health of database clusters using metrics from the Kubernetes APIs. The point was to let the people responsible see trouble early, before it turns into downtime.',
    tags: ['Go', 'Kubernetes', 'Observability'],
  },
  {
    id: 'as-for-all',
    kind: 'research',
    role: 'A’s for All Instructor Dashboard',
    org: 'UC Berkeley',
    detail: 'with Prof. Dan Garcia',
    when: 'Aug 2025 – now',
    ongoing: true,
    summary:
      'I help build a dashboard for mastery learning, where students are graded concept by concept. It supports more than 1,500 Berkeley students, and I’m a co-author on a poster accepted to ACM SIGCSE 2026 about its open-source design for large CS courses. Of everything here, this is the closest to what I want to keep doing.',
    tags: ['Education', 'Research', 'Open source'],
    link: { label: 'read the SIGCSE poster abstract', href: 'https://dl.acm.org/doi/10.1145/3770761.3777343' },
  },
  {
    id: 'k12',
    kind: 'campus',
    role: 'K-12 Engineering Ambassador',
    org: 'Berkeley College of Engineering',
    when: 'Aug 2025 – now',
    ongoing: true,
    summary:
      'One of 12 undergraduates who represent the College of Engineering to younger students, through college-prep events and visits to primary schools.',
    tags: ['Outreach', 'STEM education'],
  },
  {
    id: 'adobe',
    kind: 'club',
    role: 'Software Engineering & Applied AI Consultant',
    org: 'Adobe',
    detail: 'through Delta Consulting',
    when: 'Jun – Aug 2025',
    summary:
      'I built a tool that helps a social media team decide what to post next. It draws on more than 460 past posts to suggest ideas, and it can drop a live chart straight into the chat. Alongside it I set up four dashboards tracking 20-plus metrics.',
    tags: ['RAG', 'LLMs', 'Dashboards'],
  },
  {
    id: 'edison',
    kind: 'work',
    role: 'Computer Science Intern',
    org: 'Southern California Edison',
    detail: 'Pomona, CA',
    when: 'May – Aug 2025',
    summary:
      'I wrote a SAS and SQL pipeline that cleans more than 2,000 compliance notifications coming out of SAP, then built a Power BI dashboard on top of it so managers and executives can see which work orders are overdue.',
    tags: ['Data', 'SQL', 'Power BI'],
  },
  {
    id: 'globe',
    kind: 'campus',
    role: 'Peer Advisor & GLOBE Ambassador Lead',
    org: 'GLOBE Center, UC Berkeley',
    when: 'Jan 2025 – now',
    ongoing: true,
    summary:
      'I advise visiting international engineering students on finding their way around campus. It began as a semester programme for 19 students that ended with a week-long delegation trip to Taiwan.',
    tags: ['Advising', 'Leadership'],
    link: { label: 'see the photos from the Taiwan trip', to: '/scrapbook#taiwan' },
  },
]

export const EDUCATION = {
  school: 'University of California, Berkeley',
  when: 'Class of 2028',
  rows: [
    { label: 'Major', items: ['BS in Electrical Engineering and Computer Science'] },
    { label: 'Also', items: ['Minor in STEM Education', 'Jacobs Design Certificate'] },
    { label: 'Honors', items: ['Regents’ and Chancellor’s Scholar', 'Edison Scholar'] },
  ],
  clubs: ['Codebase', 'Delta Consulting', 'Pilipino Association of Scientists, Architects, and Engineers (PASAE)'],
}
