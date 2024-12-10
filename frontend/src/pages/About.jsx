import { assets } from "../data/Data";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xi pt-10 text-gray-500">
        ABOUT <span className="text-gray-700 font-medium">US</span>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_page}
          alt="about page"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p className="">
            Our college is a premier institution committed to academic
            excellence, innovation, and holistic development. With a rich
            history of fostering learning and leadership, we offer diverse
            programs in science, arts, technology, and business. Our faculty
            comprises highly qualified educators dedicated to inspiring students
            to reach their full potential.
          </p>
          <p>
            Equipped with state-of-the-art facilities, modern labs, and
            libraries, we create an environment that encourages curiosity and
            research. We emphasize practical learning through internships,
            workshops, and industry collaborations.
          </p>
          <p>
            Beyond academics, our vibrant campus life includes clubs, sports,
            and cultural activities, nurturing well-rounded individuals.
            Sustainability and community engagement are core to our values,
            promoting responsible global citizenship. We believe in empowering
            students with skills, ethics, and confidence to excel in their
            careers and life.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About