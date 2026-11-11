import Counter from "@/components/animations/Counter";
import { company } from "@/data/company";
export default function StatsSection() {
  return (
    <section
      className="bg-ink px-6 py-24 text-bone md:px-16"
      aria-label="Company statistics"
    >
      <dl className="grid gap-10 md:grid-cols-4">
        {company.stats.map((s) => (
          <div key={s.label}>
            <dd className="font-display text-7xl text-blue-500">
              <Counter to={s.value} />
            </dd>
            <dt className="mt-2 text-sm text-bone/70">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
