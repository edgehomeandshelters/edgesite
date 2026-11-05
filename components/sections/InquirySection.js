"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextReveal from "@/components/animations/TextReveal";
import { properties } from "@/data/properties";
const field =
  "w-full border-b border-ink/30 bg-transparent py-3 outline-none focus:border-gold";
export default function InquirySection({ defaultProperty = "" }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { property: defaultProperty } });
  const [state, setState] = useState("idle");
  // DEMO: no backend yet. Replace with a POST to app/api/inquiry/route.js; keep the honeypot and add server-side validation.
  const onSubmit = async (d) => {
    if (d.website) return;
    await new Promise((r) => setTimeout(r, 600));
    setState("demo");
    reset();
  };
  const Err = ({ n }) =>
    errors[n] ? (
      <p role="alert" className="mt-1 text-sm text-red-700">
        {errors[n].message}
      </p>
    ) : null;
  return (
    <section id="inquiry" className="px-6 py-28 md:px-16">
      <TextReveal
        text="Your Next Chapter Begins Here."
        className="mb-12 max-w-3xl font-display text-5xl md:text-7xl"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid max-w-3xl gap-8 md:grid-cols-2"
      >
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          {...register("website")}
        />
        <label>
          Full name
          <input
            className={field}
            {...register("name", { required: "Enter your full name" })}
          />
          <Err n="name" />
        </label>
        <label>
          Email address
          <input
            type="email"
            className={field}
            {...register("email", {
              required: "Enter your email",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          <Err n="email" />
        </label>
        <label>
          Phone number
          <input
            type="tel"
            className={field}
            {...register("phone", {
              required: "Enter your phone number",
              minLength: { value: 7, message: "Phone number is too short" },
            })}
          />
          <Err n="phone" />
        </label>
        <label>
          Preferred property
          <select className={field} {...register("property")}>
            <option value="">Any</option>
            {properties.map((p) => (
              <option key={p.slug}>{p.name}</option>
            ))}
          </select>
        </label>
        <label>
          Budget range
          <select className={field} {...register("budget")}>
            <option>Under ₦50m</option>
            <option>₦50m – ₦100m</option>
            <option>₦100m – ₦250m</option>
            <option>Above ₦250m</option>
          </select>
        </label>
        <label className="md:col-span-2">
          Message
          <textarea rows={3} className={field} {...register("message")} />
        </label>
        <div className="md:col-span-2">
          <button
            disabled={isSubmitting}
            className="bg-ink px-8 py-4 text-bone transition hover:bg-gold hover:text-ink disabled:opacity-50"
          >
            {isSubmitting ? "Sending…" : "Submit Inquiry"}
          </button>
          <p aria-live="polite" className="mt-4 text-sm">
            {state === "demo" &&
              "Demo mode: your inquiry was validated but not sent. A backend is required to receive it."}
          </p>
        </div>
      </form>
    </section>
  );
}
