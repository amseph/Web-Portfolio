"use client";

import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/8bit/toast";

type FormState = "idle" | "loading" | "success" | "error";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [step, setStep] = useState(0);
  const [stepError, setStepError] = useState("");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function updateField(field: keyof typeof fields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    setStepError("");
  }

  function validateIdentityStep() {
    const name = fields.name.trim();
    const email = fields.email.trim();

    if (!name || !email) {
      const message = "Enter your name and email first.";
      setStepError(message);
      toast.warning("Identity check", message);
      return false;
    }

    if (!isValidEmail(email)) {
      const message = "Use a valid email address to continue.";
      setStepError(message);
      toast.warning("Email check", message);
      return false;
    }

    setStepError("");
    return true;
  }

  function validateSubjectStep() {
    const subject = fields.subject.trim();

    if (!subject) {
      const message = "Add a subject first.";
      setStepError(message);
      toast.warning("Subject check", message);
      return false;
    }

    setStepError("");
    return true;
  }

  function validateCurrentStep() {
    if (step === 0) {
      return validateIdentityStep();
    }

    if (step === 1) {
      return validateSubjectStep();
    }

    return true;
  }

  function goToStep(nextStep: number) {
    if (nextStep > step && !validateCurrentStep()) {
      return;
    }

    setStep(nextStep);
  }

  function goToNextStep() {
    const nextStep = Math.min(steps.length - 1, step + 1);
    goToStep(nextStep);
  }

  function validateForm() {
    const name = fields.name.trim();
    const email = fields.email.trim();
    const subject = fields.subject.trim();
    const message = fields.message.trim();

    if (!name || !email) {
      return "Enter your name and email first.";
    }

    if (!isValidEmail(email)) {
      return "Use a valid email address before sending.";
    }

    if (!subject) {
      return "Add a subject first.";
    }

    if (!message) {
      return "Write your message before sending.";
    }

    return "";
  }

  async function handleSend() {
    const validationMessage = validateForm();

    if (validationMessage) {
      setState("error");
      toast.error("Message not ready", validationMessage);
      return;
    }

    setState("loading");
    const loadingToast = toast.loading("Sending message", "Delivering your note...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          subject: fields.subject.trim(),
          message: fields.message.trim(),
        }),
      });
      const result = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to send your message right now.");
      }

      toast.dismiss(loadingToast);
      toast.success("Message sent", "Your note has been delivered.");
      setState("success");
      setFields({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setStep(0);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(
        "Message failed",
        error instanceof Error ? error.message : "Unable to send your message right now.",
      );
      setState("error");
    }
  }

  const inputClass =
    "min-h-12 w-full border-[3px] border-[var(--border)] bg-[var(--surface-strong)] px-4 text-sm leading-6 text-[var(--foreground)] shadow-[3px_3px_0_color-mix(in_srgb,var(--border),transparent_72%)] transition placeholder:text-[color-mix(in_srgb,var(--muted),transparent_24%)] focus:bg-[var(--surface)] focus:outline-none";
  const steps = ["Identity", "Subject", "Message"];

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="dialogue-box p-5 sm:p-7"
      noValidate
    >
      <div className="mb-7 flex flex-wrap items-center gap-3" aria-label="Contact form steps">
        {steps.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => goToStep(index)}
            className={`stepper-dot ${step === index ? "is-active" : ""}`}
            aria-label={`Go to ${label} step`}
          >
            {index + 1}
          </button>
        ))}
        <span className="text-sm font-black leading-6 text-[var(--muted)]">{steps[step]}</span>
      </div>

      <div className="min-h-[17rem]">
        {step === 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold leading-6">
              Name
              <input
                name="name"
                className={inputClass}
                placeholder="Ivan Jaurigue"
                value={fields.name}
                onChange={(event) => updateField("name", event.target.value)}
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-bold leading-6">
              Email
              <input
                name="email"
                type="email"
                className={inputClass}
                placeholder="you@email.com"
                value={fields.email}
                onChange={(event) => updateField("email", event.target.value)}
                required
              />
            </label>
            <div className="border-[3px] border-[var(--border)] bg-[var(--surface-strong)] p-5 sm:col-span-2">
              <p className="font-pixel text-xl leading-[1.5]">Start with the basics.</p>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                A short, focused form keeps the contact flow fast and clean.
              </p>
              <p
                aria-live="polite"
                className={`mt-4 min-h-5 font-pixel text-[0.55rem] leading-5 text-[var(--accent)] transition-opacity ${
                  stepError ? "opacity-100" : "opacity-0"
                }`}
              >
                {stepError || "Identity ready."}
              </p>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm font-bold leading-6">
              Subject
              <input
                name="subject"
                className={inputClass}
                placeholder="Portfolio collaboration"
                value={fields.subject}
                onChange={(event) => updateField("subject", event.target.value)}
                required
              />
            </label>
            <div className="border-[3px] border-[var(--border)] bg-[var(--surface-strong)] p-5">
              <p className="font-pixel text-xl leading-[1.5]">What should we call it?</p>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                Keep it simple: collaboration, frontend build, UI direction, or anything close.
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <label className="grid gap-2 text-sm font-bold leading-6">
            Message
            <textarea
              name="message"
              className={`${inputClass} min-h-52 resize-y py-4`}
              placeholder="Tell me what you want to build."
              value={fields.message}
              onChange={(event) => updateField("message", event.target.value)}
              required
            />
          </label>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2 sm:justify-end">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((current) => Math.max(0, current - 1))}
              className="pixel-button secondary min-w-28 px-4"
            >
              <ArrowLeft aria-hidden size={16} /> Back
            </button>
          ) : null}
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={goToNextStep}
              className="pixel-button min-w-28 px-4"
            >
              Next <ArrowRight aria-hidden size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSend}
              disabled={state === "loading"}
              className="pixel-button min-w-28 px-4 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {state === "loading" ? "Sending..." : "Send"} <Send aria-hidden size={16} />
            </button>
          )}
        </div>
      </div>

      <div aria-live="polite" className="sr-only">
        {state === "success" ? "Message sent successfully." : null}
        {state === "error" ? "Something went wrong while sending your message." : null}
      </div>
    </form>
  );
}
