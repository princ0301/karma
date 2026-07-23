import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Karma",
  description: "Get in touch with Karma.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-marigold">
        Contact
      </p>
      <h1 className="mt-4 max-w-xl font-display text-4xl leading-tight text-paper md:text-5xl">
        We&apos;d like to hear from you.
      </h1>

      <div className="mt-14 grid gap-14 md:grid-cols-[1fr_1.3fr]">
        <div className="space-y-8">
          <div className="flex items-start gap-3">
            <Mail size={18} className="mt-1 text-marigold" />
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-muted">
                Email
              </p>
              <p className="mt-1 text-paper">hello@karma.org</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={18} className="mt-1 text-marigold" />
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-muted">
                Phone
              </p>
              <p className="mt-1 text-paper">+91 00000 00000</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-1 text-marigold" />
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-muted">
                Address
              </p>
              <p className="mt-1 text-paper">
                [Add your office address here]
                <br />
                New Delhi, India
              </p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
