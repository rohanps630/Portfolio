import { resumeData } from "@/content/resume";
import { createMetadata } from "@/lib/seo";
import { PrintButton } from "@/components/ui/PrintButton";

export const metadata = createMetadata({
  title: "Resume — Rohan P. Suresh",
  description: "Rohan P. Suresh — Full Stack & AI Integration Engineer. Experience, skills, and résumé.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 print:py-0 print:px-0">
      <div className="bg-card border border-border p-8 sm:p-12 rounded-xl print:border-none print:shadow-none print:bg-transparent print:p-0">
        
        <header className="mb-8 border-b border-border pb-8 print:pb-4">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
            {resumeData.name}
          </h1>
          <p className="text-xl text-accent mb-4">{resumeData.title}</p>
          <div className="flex gap-4 text-sm text-muted-foreground mono-label">
            <span>{resumeData.email}</span>
            <span>•</span>
            <span>{resumeData.location}</span>
          </div>
        </header>

        <section className="mb-8">
          <p className="text-muted-foreground leading-relaxed">
            {resumeData.summary}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-heading font-bold mb-6 text-foreground print:mb-4">
            Experience
          </h2>
          <div className="flex flex-col gap-6">
            {resumeData.experience.map((job) => (
              <div key={job.company}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-bold text-foreground">
                    {job.company} — <span className="font-normal text-muted-foreground">{job.role}</span>
                  </h3>
                  <span className="text-sm mono-label text-muted-foreground">
                    {job.date}
                  </span>
                </div>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {job.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {resumeData.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-heading font-bold mb-6 text-foreground print:mb-4">
              Education
            </h2>
            <div className="flex flex-col gap-4">
              {resumeData.education.map((edu) => (
                <div key={edu.institution}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-bold text-foreground">
                      {edu.institution}
                    </h3>
                    <span className="text-sm mono-label text-muted-foreground">
                      {edu.date}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{edu.degree}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-heading font-bold mb-4 text-foreground">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-muted rounded-full text-sm font-medium text-foreground print:bg-transparent print:border print:border-border"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Print only button */}
        <div className="mt-12 text-center print:hidden">
          <PrintButton />
        </div>
      </div>
    </div>
  );
}
