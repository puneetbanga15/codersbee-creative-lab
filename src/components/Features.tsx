interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

export const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
      <span className="text-4xl mb-4">{icon}</span>
      <h3 className="text-xl font-semibold mb-2 text-codersbee-dark">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export const Features = () => {
  const features = [
    {
      icon: "💻",
      title: "Generative AI Mastery",
      description: "Dive deep into the world of generative AI creative tools and unlock the secrets behind its cutting-edge technology.",
    },
    {
      icon: "🧙",
      title: "Become Coding Wizard",
      description: "Transform into a coding wizard by mastering essential programming skills and unleashing your kid's full potential.",
    },
    {
      icon: "🏆",
      title: "Kid's Hackathons",
      description: "Join exciting hackathons where creativity meets competition, and young minds collaborate to solve real-world challenges.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <Feature key={index} {...feature} />
      ))}
    </div>
  );
};