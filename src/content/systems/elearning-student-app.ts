import type { System } from "@/lib/schemas/system";

export const elearningStudentApp: System = {
  "slug": "elearning-student-app",
  "title": "E-Learning Student Mobile App",
  "thesis": "Mobile learning app for an education academy's students — phone-verified onboarding, course catalog, doubt-resolution chat, and protected course content",
  "tier": 3,
  "domain": "products",
  "context": "client",
  "status": {
    "kind": "archived"
  },
  "confidentiality": "Built for a client under confidentiality limits. Described at pattern level only — product name, backend endpoints, and API details are withheld.",
  "role": "Mobile Developer",
  "timeline": {
    "start": "2023-08",
    "end": "2023-10"
  },
  "year": "2023",
  "executiveSummary": "A student-facing mobile app for an education academy, built in React Native with TypeScript for iOS and Android from one codebase. Students onboard through a multi-step, phone-verified flow — email, phone number with country code, OTP verification, then program selection — and land in a course catalog with course details, a doubt-resolution chat, and notifications. Sessions are JWT-based with token management on-device, app state runs on Redux Toolkit, and paid course content is shielded from casual capture with native screenshot blocking on Android. The app was delivered to the client.",
  "businessContext": "An education academy selling structured course programs needed a mobile app for its students. Enrollment had to be gated behind verified identities — a phone-verified student, not just an email signup — and the paid course material the academy's business depended on needed at least baseline protection from being trivially captured and reshared. The client needed both platforms covered by a small team on a short timeline.",
  "problemStatement": "Students needed one app to enroll, browse their program's courses, study course details, and ask questions when stuck. The academy needed the opposite guarantees: that an account maps to a real, phone-verified person, and that paid content is not casually screenshotted and redistributed. That put most of the product's complexity into the entry flow — a staged onboarding covering email, phone, OTP verification, registration, and program selection, each with its own failure states — and into platform-level content protection, which iOS and Android support very differently.",
  "constraints": [
    {
      "kind": "platform",
      "text": "One React Native codebase had to ship both the iOS and Android apps."
    },
    {
      "kind": "compliance",
      "text": "Paid course content required protection from casual capture — screenshot blocking was a client requirement, not an optimization."
    },
    {
      "kind": "platform",
      "text": "Identity had to be phone-verified via OTP, adding an SMS dependency and country-code handling to onboarding."
    }
  ],
  "solutionOverview": "Built a single React Native + TypeScript codebase for iOS and Android. Onboarding is a staged navigation flow — email entry, phone number with a country-code picker, OTP entry and verification, registration, then program selection — backed by JWT sessions with on-device token management. App state lives in Redux Toolkit, split into Authentication and Course feature slices with typed hooks. The API layer is an Axios client with a central endpoint registry and environment-based configuration, so no backend URL is hardcoded. Course content screens are protected on Android with a native secure-window flag that blocks screenshots and screen recording. UI is built on the React Native Elements kit with a custom theme layer, plus a native bootsplash for startup.",
  "decisions": [
    {
      "id": "decision-1",
      "title": "Phone-OTP onboarding as a staged flow",
      "decision": "Split enrollment into discrete screens — email, phone number with country-code picker, OTP verification, registration, program selection — rather than one large signup form.",
      "alternatives": [
        {
          "option": "Single-form email/password signup",
          "whyNot": "The academy required phone-verified identities for enrollment; an unverified email signup did not meet that bar, and cramming phone + OTP + program choice into one form makes every failure state (wrong number, expired OTP, resend) harder to handle."
        }
      ],
      "rationale": "Each stage owns exactly one input and its failure states, which keeps OTP retry, resend, and validation logic local to a screen instead of tangled in one form.",
      "cost": "Onboarding became most of the app's surface area — nine of the app's fifteen screens are the authentication flow, and every one of them needed its own error and navigation handling."
    },
    {
      "id": "decision-2",
      "title": "Redux Toolkit for app state",
      "decision": "Centralized state in Redux Toolkit with Authentication and Course feature slices and typed hooks.",
      "alternatives": [
        {
          "option": "React Context + useReducer",
          "whyNot": "Auth state (tokens, verification progress) and the course catalog are read and written across the whole navigation tree; slice-based stores with devtools made that flow easier to reason about than nested context providers."
        }
      ],
      "rationale": "A staged onboarding flow is fundamentally a state machine spread across screens — a central store keeps its progress consistent no matter how the user navigates.",
      "cost": "Redux's boilerplate and indirection are a real tax on an app this size; a two-slice store is close to the break-even point where Context would have been simpler."
    },
    {
      "id": "decision-3",
      "title": "Native screenshot blocking for content protection",
      "decision": "Blocked screenshots and screen recording of course content at the OS level via the native secure-window flag on Android.",
      "alternatives": [
        {
          "option": "Watermarking or DRM-style content delivery",
          "whyNot": "Far heavier to build and operate; the client's requirement was raising the cost of casual capture, not defeating a determined attacker."
        }
      ],
      "rationale": "A platform-level flag is a few lines of native code and cannot be bypassed from JavaScript, making it the cheapest honest implementation of the requirement.",
      "cost": "It is Android-only — iOS offers no equivalent hard block — and it is blunt: the flag protects the whole window, not just paid content, so every screen loses screenshots."
    },
    {
      "id": "decision-4",
      "title": "Off-the-shelf UI kit with a theme layer",
      "decision": "Built the UI on React Native Elements (RNEUI) with a project theme layer on top, rather than writing a custom component library.",
      "alternatives": [
        {
          "option": "In-house component library",
          "whyNot": "A small team on a roughly ten-week build could not afford to hand-build form inputs, buttons, and lists before shipping any product value."
        }
      ],
      "rationale": "The kit covered the standard primitives immediately, and the theme layer kept the academy's look centralized so the kit's defaults never leaked into screens.",
      "cost": "The app's visual ceiling and upgrade path are tied to the kit — anything its primitives can't express requires either forking components or living with the compromise."
    }
  ],
  "techStack": [
    {
      "name": "React Native",
      "role": "iOS + Android client from one codebase"
    },
    {
      "name": "TypeScript",
      "role": "Typed app code end to end"
    },
    {
      "name": "Redux Toolkit",
      "role": "Authentication and course state slices"
    },
    {
      "name": "React Navigation",
      "role": "Staged onboarding and tab navigation"
    },
    {
      "name": "React Native Elements",
      "role": "UI kit under a custom theme layer"
    },
    {
      "name": "Axios",
      "role": "API client with central endpoint registry"
    }
  ],
  "outcomes": [
    {
      "value": "iOS · Android",
      "label": "Platforms",
      "description": "One React Native + TypeScript codebase shipping both platforms",
      "provenance": "scope-fact"
    },
    {
      "value": "Phone-OTP",
      "label": "Verified Onboarding",
      "description": "Staged enrollment flow with OTP phone verification and JWT sessions",
      "provenance": "scope-fact"
    },
    {
      "value": "OS-level",
      "label": "Content Protection",
      "description": "Native screenshot and screen-recording block guarding paid course content on Android",
      "provenance": "scope-fact"
    }
  ],
  "evidence": [],
  "screenshots": [],
  "lessons": [
    "Verified onboarding dominates a gated app's surface area: nine of the fifteen screens were the authentication flow, and OTP verification multiplied the failure states — SMS delivery, resend, expiry, country-code edge cases — far beyond what a simple signup would have cost. Budget for the entry flow as a feature, not a formality.",
    "\"Block screenshots\" sounds like one requirement but is two platforms' realities: Android supports a hard OS-level block, iOS does not. The honest deliverable was per-platform — a real block on Android, and accepting that iOS content protection of this kind cannot be promised."
  ],
  "featured": false,
  "sortOrder": 8,
  "coverImage": "/images/projects/elearning-student-app/cover.webp"
};

export default elearningStudentApp;
