import missionImage1 from '../assets/our-mission-image1.png'
import missionImage2 from '../assets/our-mission-image2.png'

export default function Mission() {
  return (
    <section className="flex flex-col gap-14">
      {/* Hero: title + image side by side */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 md:items-center">
        <div className="md:w-1/2 shrink-0">
          <h1 className="font-mono font-bold leading-[1.05] text-4xl sm:text-5xl md:text-6xl">
            We build a
            <br />
            community for CAD.
          </h1>
          <p className="mt-5 text-sm sm:text-base leading-relaxed text-white/90">
            We're a student group focused on furthering CAD design and applied engineering skills.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src={missionImage1}
            alt="MDL members hanging out on campus"
            className="w-full aspect-[4/3] object-cover rounded-xl border border-white/10"
          />
        </div>
      </div>

      {/* Body: image + text side by side (reversed) */}
      <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 md:items-center">
        <div className="md:w-1/2 flex flex-col gap-5 text-sm sm:text-base leading-relaxed text-white/90">
          <p>
            We're best known for Canada's one and only annual CAD Designathon, which brings students
            together to work on industry-sponsored design challenges. As a participant, you get to
            tackle real problems in a competitive and collaborative setting, for big prizes.
          </p>
          <p>
            We also run workshops to help people pick up practical tools like SolidWorks and other
            skills you don't always get in class.
          </p>
          <p>
            Beyond competitions and workshops, we're building a space where people can share personal
            projects, get feedback, and learn from each other by actually building things together.
          </p>
          <p>
            We hope to make your engineering experience a little better with us :)
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src={missionImage2}
            alt="MDL co-presidents at awards ceremony"
            className="w-full aspect-[4/3] object-cover rounded-xl border border-white/10"
          />
        </div>
      </div>
    </section>
  )
}
