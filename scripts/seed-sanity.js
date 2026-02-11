/* Seed Sanity with the current site copy (text-only). Images are left empty so you can upload later. */

const { createClient } = require("@sanity/client")
const { nanoid } = require("nanoid")
const fs = require("fs")
const path = require("path")

// Load .env.local manually to handle non-export lines
const envPath = path.join(__dirname, "..", ".env.local")
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split("\n")
  lines.forEach((line) => {
    if (!line || line.trim().startsWith("#")) return
    const [key, ...rest] = line.split("=")
    const value = rest.join("=").trim().replace(/^"|"$/g, "")
    if (key && value && !process.env[key]) {
      process.env[key] = value
    }
  })
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.replace(/"/g, "")
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01"
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_READ_TOKEN

if (!projectId || !token) {
  console.error("Missing SANITY project/token env vars")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

const k = () => nanoid(8)

const blocks = (text) => [
  {
    _type: "block",
    _key: k(),
    style: "normal",
    children: [{ _type: "span", _key: k(), text }],
  },
]

async function run() {
  const mutations = [
    {
      _id: "homePage",
      _type: "homePage",
      slides: [
        {
          _type: "heroSlide",
          _key: k(),
          title: "Nurturing Leaders of Excellence",
          subtitle: "Mastery. Enlightenment. Empowerment. Dedication.",
          description:
            "A deserved reward earned through virtue, effort, and excellence -- cultivating masters in both Dunya and Akhirah.",
          primaryCta: { _type: "cta", _key: k(), label: "Apply Now", href: "/register" },
          secondaryCta: { _type: "cta", _key: k(), label: "Our Programs", href: "/programs" },
        },
      ],
      visionHeadline: "Our Vision",
      visionQuote:
        '"To nurture future leaders of excellence -- masters in both Dunya and Akhirah -- through Enlightenment, Empowerment and Dedication."',
      visionCards: [
        { _key: k(), title: "Enlighten", description: "Students gain both revealed (Islamic) and acquired (worldly) knowledge." },
        { _key: k(), title: "Empower", description: "Equip learners with 21st-century skills and rituals of mastery." },
        { _key: k(), title: "Dedicate", description: "Ground hearts in discipline, Ibadah, and sustained focus." },
        { _key: k(), title: "Master", description: "Achieve excellence in spiritual and worldly domains." },
      ],
      principles: [
        { _key: k(), title: "Vision", description: "Clarity of purpose guides every decision." },
        { _key: k(), title: "Sincerity", description: "Ikhlas and objectivity form our ethical backbone." },
        { _key: k(), title: "Depth", description: "Profound understanding over superficial coverage." },
        { _key: k(), title: "Ritual", description: "Consistent practices build sustainable excellence." },
        { _key: k(), title: "Perseverance", description: "Resilience transforms potential into achievement." },
      ],
      ecosystemHeadline: "A Full-Day Ecosystem of Growth",
      ecosystemBullets: [
        { _key: k(), title: "Academic MRIs (AMRI)", description: "MSP, MHCP, Assembly, and Day Open/Shutdown rituals." },
        { _key: k(), title: "Non-Academic MRIs (NMRI)", description: "Blitz windows, recreation, PowerNap, spiritual anchors." },
        { _key: k(), title: "17 Micro-Rituals, 7 Daily Blocks", description: "From pre-Fajr to lights-out, every block has purpose." },
      ],
      executionSteps: [
        { _key: k(), title: "Rooting", description: "Research-based methodologies" },
        { _key: k(), title: "Initiating", description: "Prepare and deliver materials" },
        { _key: k(), title: "Acting x 3", description: "Consistent action over talk" },
        { _key: k(), title: "Tracking", description: "Log evidence via AUP/APD" },
        { _key: k(), title: "Repeating", description: "Daily, weekly, monthly iteration" },
      ],
      assessmentCards: [
        {
          _key: k(),
          title: "Scholastic",
          description: "Subject mastery, TCS Cycle, Mid-Term and Term-End Exams",
        },
        {
          _key: k(),
          title: "Co-Scholastic",
          description: "Character, habits, spiritual formation",
        },
        {
          _key: k(),
          title: "TCS Cycle",
          description: "Test, Correction, Submission -- every chapter",
        },
        {
          _key: k(),
          title: "T1-T4 Bands",
          description: "Mastery to Foundation -- targeted guidance",
        },
      ],
      stats: [
        { _key: k(), value: "Nursery-8", label: "Grade Levels" },
        { _key: k(), value: "17", label: "Daily Micro-Rituals" },
        { _key: k(), value: "5", label: "Guiding Principles" },
        { _key: k(), value: "Dual", label: "Success Model" },
      ],
    },
    {
      _id: "aboutPage",
      _type: "aboutPage",
      heroTitle: "About Meed International School",
      heroSubtitle: "Where intellectual excellence meets moral and spiritual growth",
      nameMeaning: blocks(
        'An Old English term meaning "a deserved reward or just recompense" — success achieved through disciplined striving and dedication.'
      ),
      blueprintTitle: "The MEED Blueprint",
      blueprintCards: [
        {
          _key: k(),
          title: "Foundational Paper",
          body: 'Rooted in "Holistic Education for Dual Success" — a philosophy of life, discipline, and excellence.',
        },
        {
          _key: k(),
          title: "Cultivated Greatness",
          body: "Excellence grows from ritual, clarity, and patience — discipline over outcome.",
        },
      ],
      movements: [
        {
          _key: k(),
          title: "Mastery",
          description: "Excellence in both spiritual and worldly domains through intentional education and tracking proficiency.",
        },
        {
          _key: k(),
          title: "Enlightenment",
          description: "Students gain revealed and acquired knowledge that builds clarity, identity, and purpose.",
        },
        {
          _key: k(),
          title: "Empowerment",
          description: "Equipping learners with 21st-century skills and cognitive tools to excel in an age of noise.",
        },
        {
          _key: k(),
          title: "Dedication",
          description: "Grounding hearts in discipline, Ibadah, and sustained focus — sincerity and resilience.",
        },
      ],
    },
    {
      _id: "programPage",
      _type: "programPage",
      heroTitle: "Our Programs",
      heroSubtitle: "Pre-Primary through Class VIII with MSP & MHCP",
      programs: [
        { _key: k(), title: "Pre-Primary (Nursery, LKG, UKG)", description: "Foundational care, routines, and joyful learning." },
        { _key: k(), title: "Elementary (Classes I-VIII)", description: "Depth-first learning anchored in discipline and practice." },
        { _key: k(), title: "MSP & MHCP Programs", description: "Specialized mastery and holistic character programs." },
        { _key: k(), title: "Baseline & Banding (T1-T4)", description: "Targeted guidance from foundation to mastery." },
      ],
    },
    {
      _id: "admissionsPage",
      _type: "admissionsPage",
      heroTitle: "Give Your Child Both Success",
      heroSubtitle: "Holistic education for dual success",
      steps: [
        { _key: k(), title: "Submit Application", description: "Complete the online form with student and parent details." },
        { _key: k(), title: "Assessment & Baseline", description: "We review readiness and place within T1–T4 bands." },
        { _key: k(), title: "Confirmation", description: "Secure the seat and receive the onboarding kit." },
      ],
    },
    {
      _id: "pricingPage",
      _type: "pricingPage",
      heroTitle: "Transparent Pricing",
      heroSubtitle: "Invest in holistic growth with clear plans",
      plans: [
        {
          _key: k(),
          name: "Standard",
          price: "ETB —",
          features: ["Core academics", "Daily rituals", "Baseline assessments"],
        },
        {
          _key: k(),
          name: "Enrichment",
          price: "ETB —",
          features: ["Everything in Standard", "Clubs & enrichment", "Extra practice blocks"],
        },
        {
          _key: k(),
          name: "Mastery",
          price: "ETB —",
          features: ["All Enrichment features", "1:1 mentorship", "Advanced mastery tracking"],
        },
      ],
    },
    {
      _id: "contactPage",
      _type: "contactPage",
      headline: "Contact Us",
      subhead: "We’ll guide you through admissions and programs.",
      address: "Addis Ababa, Ethiopia",
      phone: "+251 123 456 78",
      email: "info@meedinternational.edu",
      mapEmbed: "",
    },
  ]

  const tx = mutations.map((doc) => ({ createOrReplace: doc }))
  await client.transaction(tx).commit()
  console.log("Seeded Sanity with initial copy.")
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
