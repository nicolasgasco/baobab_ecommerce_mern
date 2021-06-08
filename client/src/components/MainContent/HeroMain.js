import {
  HeartIcon,
  GlobeIcon,
  LightningBoltIcon,
  ScaleIcon,
} from "@heroicons/react/outline";

const features = [
  {
    name: "Conscious products",
    description:
      "Our products out hand-picked among the best companies offering the best environmentally and socially products on the market.",
    icon: ScaleIcon,
  },
  {
    name: "Carbon offset",
    description:
      "For every order we receive, we offset 50% of the carbon footprint. You can choose to add the remaining 50%.",
    icon: GlobeIcon,
  },
  {
    name: "Fast and sustainable shipping",
    description:
      "We partner with sustainable shipping companies to provide a shipping service which is both good for the environment and as fast a lightning",
    icon: LightningBoltIcon,
  },
  {
    name: "Ethical employer",
    description:
      "All our workers enjoy the best working conditions we can possibly offer them, both in the offices and warehouses.",
    icon: HeartIcon,
  },
];

export default function Example() {
  return (
    <div className="py-12 my-12 mx-10 rounded-xl shadow-xl bg-white h-2/3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-green-600 font-bold tracking-wide uppercase">
            Green, convenient, sustainable
          </h2>
          <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Start shopping on Bonsai
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-yellow-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}