import { company } from "@/data/company";
export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-16 text-bone/70 md:px-16">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl text-bone">{company.name}</p>
          <p className="mt-3 max-w-xs text-sm">Inestment Nig.Ltd.</p>
        </div>
        <address className="text-sm not-italic leading-7">
          {company.address}
          <br />
          {company.phone}
          <br />
          {company.email}
        </address>
        <ul className="text-sm leading-7">
          {company.socials.map((s) => (
            <li key={s.label}>
              <a className="hover:text-green-500" href={s.href}>
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#" className="hover:text-gold">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gold">
              Terms
            </a>
          </li>
        </ul>
      </div>
      <p className="mt-12 text-xs">
        © {new Date().getFullYear()} {company.name}investment Nig.Ltd. All
        rights reserved.
      </p>
    </footer>
  );
}
