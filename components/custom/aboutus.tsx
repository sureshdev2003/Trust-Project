"use client";

import { Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <main id="about-us" className="min-h-screen bg-background mt-10 px-4">

      {/* ---------- HEADER ---------- */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 rounded-full mb-6">
          <Heart className="w-4 h-4 text-white" />
          <span className="text-white font-semibold">About Us</span>
        </div>

        <h2 className="text-4xl font-bold">
          Who We Are <br />
          <span className="text-orange-500">Our Story</span>
        </h2>
      </div>

      {/* ---------- PROFILE SECTION ---------- */}
      <section className="max-w-6xl mx-auto space-y">
 <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-12">
          {/* Our Origin */}
          <section className="space-y-2">
            <h3 className="text-3xl font-bold text-foreground text-orange-500">Our Origin</h3>
            <div className="space-y-3 text-lg text-foreground/80 leading-relaxed">
              <p>
                <strong className="font-semibold text-foreground">Need Foundation Trust</strong> was established in{" "}
                <strong className="font-semibold text-foreground">2005</strong> with the vision of creating a positive
                impact
              </p>
              <p>It is an inner-faith, Not for Profit Organization</p>
              <p>NEED believes in value implementation and consciousness approach in every activity it undertook</p>
            </div>
          </section>

          {/* Our Objectives */}
          <section className="space-y-4">
            <h3 className="text-3xl font-bold text-foreground text-orange-500">Our Objectives</h3>
            <ul className="space-y-3 text-lg text-foreground/80 leading-relaxed list-disc list-inside">
              <li>To develop Entrepreneurship among youth and women</li>
              <li>
                Enabling youth to acquire skills for employment and self employment. To conduct skill Development
                training programmes leading to self wage employment
              </li>
              <li>Give necessary Tuitions, Coaching etc to the students who are studying higher education</li>
              <li>Publishing Free Medical Camps/Free Eye Camps &amp; Blood Donation</li>
              <li>
                To Associate with Institution such as W.H.O (world Health Organization) in conducting Awareness
                Programmes in Health planning, Hygiene etc..
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>

        {/* ===== PROFILE 1 ===== */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* IMAGE 1 */}
          {/* <div className="order-1">
            <img
              src="https://res.cloudinary.com/dkbtx5r9v/image/upload/v1763547690/WhatsApp_Image_2025-11-17_at_10.06.48_ec861cb5-removebg-preview_v3smzw.png"
              alt="E.SA. Agilantam"
              className="  w-full 
    max-w-[260px] 
    md:max-w-[380px] 
    lg:max-w-[420px]
    rounded-lg 
    shadow-md 
    mx-auto 
    md:mx-0"
            />
          </div>  */}

          {/* TEXT 1 */}
          {/* <div className="order-2 space-y-4 text-left px-2 ml-[9rem] md:ml-0 md:px-0">


            <h3 className="text-2xl font-bold">E.SA. Agilantam</h3>
            <p className="text-gray-600">Managing Trustee</p>

            <div className="text-foreground/80">
              <h4 className="text-xl font-semibold mb-2">
                Academic Background
              </h4>
              <p><b>M.Phil</b> – Entrepreneurship</p>
              <p><b>FDP</b> – Entrepreneurship EDI Ahmedabad</p>
              <p><b>MBA </b>– Thiagarajar School of Management</p>
              <p><b>BBA </b>– Sourashtra College</p>
            </div>
            <div className="text-foreground/80">
              <h4 className="text-xl font-semibold mb-2">
                Skills
              </h4>
              <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                <li>Completed Mediation Training and Certified Mediator</li>
                <li>
                  Motivated professional with experience in Entrepreneurship Development,
                  Corporate
                </li>
                <li>Training, Employee Development, Customer Service, Sales, and New
                  Business Development across various industries.</li>
                <li>
                  Ability to make a positive impact in any business environment, demonstrated
                  through employment record.
                </li>
              </ul>


            </div>
          </div>
        </div> */}

        {/* ===== PROFILE 2 ===== */}
         {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"> */}

          {/* IMAGE 2 */}
          {/* <div className="order-1">
            <img
              src="https://res.cloudinary.com/dkbtx5r9v/image/upload/v1763547383/about_kq6w4v.jpg"
              alt="Team"
              className="  w-full 
    max-w-[260px] 
    md:max-w-[380px] 
    lg:max-w-[420px]
    rounded-lg 
    shadow-md 
    mx-auto 
    md:mx-0"
            />
          </div>  */}

          {/* TEXT 2 */}
          {/* <div className="order-2 space-y-4 text-left px-2 ml-[9rem] md:ml-0 md:px-0">


            <h3 className="text-2xl font-bold">Gomathy Akilandam</h3>
            <p className="text-gray-600">Trustee</p>

            <p className="text-foreground/80 leading-relaxed">
              We are a dedicated team committed to creating positive impact
              through meaningful service.
            </p>

          </div>

        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-7">
          {/* Mission Card */}
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              {/* <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">M</span>
                </div> */}
              <div className="border-b-2 border-orange-500">
                <h3 className="text-2xl font-bold text-foreground">
                  Mission
                </h3>
              </div>
            </div>

            <p className="text-foreground/80 leading-relaxed">
              Need Foundation Trust is an Inner Faith Organisation. All services should reach everyone.
              We strive to achieve the desired results by using resources properly both efficient
              and effective manner.
              Our work standard should meet the highest level by fulfilling the objectives
            </p>

          </div>

          {/* Vision Card */}
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              {/* <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">V</span>
                </div> */}
              <div className="border-b-2 border-orange-500">
                <h3 className="text-2xl font-bold text-foreground">Vision</h3>
              </div>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              Need Foundation Trust focus on social consciousness and developing an organised society.
              Our Vision is People Centric Charity Organisation and to build an outstanding social service
              to the society.We bring the best results in the society by implementing
              values in each stage of work.
            </p>

          </div>
          {/* Values */}
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              {/* <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">V</span>
                </div> */}
              <div className="border-b-2 border-orange-500">
                <h3 className="text-2xl font-bold text-foreground">Value</h3>
              </div>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              We Value rituals, which are the outer appearance. The inner value of us
              Spirituality is TRUTH. That truth expresses not as mantras or slokas but as
              values such as honesty, loyalty, reliability, etc.

            </p>

          </div>
        </div>

      </section>
    </main>
  );
}
