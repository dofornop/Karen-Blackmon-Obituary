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

const donations = [
  {
    name: "Bistro 163",
    url: "https://bistrol63.networkforgood.com/",
    description: "alleviating food insecurity in Port Clinton, OH",
  },
  {
    name: "Missions International of America",
    url: "https://www.missionsinternationalofamerica.com/",
    description:
      "benefitting the education and welfare of the people of Savanette, Haiti",
  },
  {
    name: "Marblehead Peninsula Lion’s Club Foundation",
    url: "https://www.facebook.com/marbleheadpeninsulalions",
    description:
      "donations can also be mailed to Marblehead Peninsula Lion’s Club Foundation, c/o Tod Kelly, 6005 East Harbor Rd 3-C, Marblehead, OH 43440",
  },
];

function heroPhotoExists() {
  return fs.existsSync(path.join(process.cwd(), "public/images/karen-hero.jpg"));
}

export default function Home() {
  const hasHero = heroPhotoExists();

  return (
    <div>
      <div className="relative w-full h-[260px] sm:h-[400px] bg-accent overflow-hidden">
        <Image
          src="/images/LakeErieLighthouse.jpg"
          alt="Marblehead Lighthouse, Ohio"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        <div className="relative z-10 -mt-24 sm:-mt-40 text-center">
          <div className="relative w-48 h-48 sm:w-72 sm:h-72 mx-auto mb-6 rounded-2xl overflow-hidden border-4 border-background shadow-md bg-accent-soft flex items-center justify-center">
            {hasHero ? (
              <Image
                src="/images/karen-hero.jpg"
                alt="Karen Sue Blackmon"
                fill
                sizes="(max-width: 640px) 192px, 288px"
                className="object-cover"
              />
            ) : (
              <span className="font-serif text-4xl text-accent">KB</span>
            )}
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-accent mb-3">
            Karen Sue Blackmon
          </h1>
          <p className="text-muted text-lg">August 15, 1945 &ndash; July 6, 2026</p>
        </div>

        <article className="space-y-6 pt-12 pb-16">
          {obituaryParagraphs.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-[1.05rem]">
              {paragraph}
            </p>
          ))}
        </article>

        <section className="mb-16 bg-accent-soft/15 border border-accent-soft/40 rounded-2xl px-6 py-10 sm:px-12 sm:py-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-accent mb-6">
            Donations in Honor of Karen&rsquo;s Passing
          </h2>
          <p className="leading-relaxed text-[1.05rem] mb-4">
            Donations in memory of Karen may be made to the following
            organizations:
          </p>
          <ul className="space-y-4">
            {donations.map((org) => (
              <li key={org.name} className="leading-relaxed text-[1.05rem]">
                <a
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline decoration-accent-soft underline-offset-2 hover:decoration-accent"
                >
                  {org.name}
                </a>
                , {org.description}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
