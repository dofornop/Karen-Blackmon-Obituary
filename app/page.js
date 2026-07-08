import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

const obituaryParagraphs = [
  "Karen Sue Blackmon (née Fagan Tolson), 80, of Marblehead, Ohio, passed away on July 6, 2026, in Vero Beach, Florida. She was born on August 15, 1945, and grew up in Irondale, Ohio.",
  "Karen was the daughter of Lola Fagan Tolson and Stanley Tolson, and the granddaughter of George and Helen Fagan. She graduated from Stanton High School in 1963 before attending Findlay College, where she studied Business Administration and earned her Bachelor of Science degree in 1969.",
  "A certified teacher in the state of Ohio, Karen taught business courses at Carey High School and later at Perrysburg High School, where she also served as a cheerleading advisor, mentoring generations of young people both in the classroom and beyond.",
  "In 1976, Karen began a career with Lutheran Family and Youth Services in the Toledo, Ohio area, where she would spend the next 34 years, retiring in 2010. Over the course of her tenure there, she worked as a childcare worker and a licensed social worker (LSW), eventually rising to Administrative Program Director — a career devoted to caring for children and families in need.",
  "Karen was a dedicated volunteer with the Marblehead Peninsula Lions Club in Ohio, giving generously of her time and energy in many capacities. Among her proudest contributions was helping the club formalize its 501(c)(3) nonprofit status with the government — an important milestone that strengthened the organization's ability to serve the community for years to come.",
  "Karen is survived by her husband, Harry Blackmon; her daughter, Heather Blackmon-do Forno, and son-in-law, Paul do Forno; and her sister, Donna Swartz.",
  "Karen will be remembered for her decades of dedication to education and social work, and for the love and care she brought to her family and to all those whose lives she touched.",
];

function heroPhotoExists() {
  return fs.existsSync(path.join(process.cwd(), "public/images/karen-hero.jpg"));
}

export default function Home() {
  const hasHero = heroPhotoExists();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-accent-soft bg-accent-soft shadow-sm flex items-center justify-center">
          {hasHero ? (
            <Image
              src="/images/karen-hero.jpg"
              alt="Karen Sue Blackmon"
              fill
              sizes="192px"
              className="object-cover"
              priority
            />
          ) : (
            <span className="font-serif text-5xl text-accent">KB</span>
          )}
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl text-accent mb-3">
          Karen Sue Blackmon
        </h1>
        <p className="text-muted text-lg">August 15, 1945 &ndash; July 6, 2026</p>
      </div>

      <article className="bg-surface border border-border rounded-2xl px-6 py-10 sm:px-12 sm:py-14 space-y-6 shadow-sm">
        {obituaryParagraphs.map((paragraph, i) => (
          <p key={i} className="leading-relaxed text-[1.05rem]">
            {paragraph}
          </p>
        ))}
      </article>
    </div>
  );
}
