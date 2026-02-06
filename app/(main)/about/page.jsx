import { Users, Truck, Leaf } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
          Freshness Delivered <br /> to <span className="text-teal-600">Your Doorstep.</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          HatBari wasn&apos;t built in a boardroom. It started in a kitchen, with a simple idea: 
          everyone deserves access to farm-fresh food without the hassle.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
          { icon: Leaf, title: "100% Organic", desc: "Sourced directly from local farmers." },
          { icon: Truck, title: "Fast Delivery", desc: "From farm to table in under 24 hours." },
          { icon: Users, title: "Community First", desc: "Supporting local growers and families." },
        ].map((item, i) => (
          <div key={i} className="p-8 bg-gray-50 rounded-3xl text-center">
            <item.icon className="w-10 h-10 text-teal-600 mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">{item.title}</h3>
            <p className="text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-teal-900 text-white rounded-[3rem] p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Fresh Revolution</h2>
        <p className="text-teal-100 mb-8 max-w-xl mx-auto">
          We are currently serving over 5,000+ families in Dhaka. Experience the difference today.
        </p>
      </div>
    </div>
  );
}