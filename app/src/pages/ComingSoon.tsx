import { Underlined } from '../components/Doodle.tsx'

export default function ComingSoon({ title }: { title: string }) {
  return (
    <main>
      <div className="section-head">
        <h1 className="display">{title}</h1>
        <p className="hand">
          <Underlined pen="amber">nothing here yet!</Underlined>
        </p>
      </div>
    </main>
  )
}
