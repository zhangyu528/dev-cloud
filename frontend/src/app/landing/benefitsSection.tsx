import { FaCheckCircle } from 'react-icons/fa';

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-12 bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose DevCloud?</h2>
        <ul className="space-y-6">
          <li className="flex items-start space-x-4 p-4 bg-gray-700 rounded-lg shadow-md">
            <FaCheckCircle className="text-green-400 w-8 h-8" />
            <div>
              <h3 className="text-xl font-semibold">Increased Productivity</h3>
              <p>Dev Cloud provides a seamless development environment that allows developers to focus on coding without worrying about local setup.</p>
            </div>
          </li>
          <li className="flex items-start space-x-4 p-4 bg-gray-700 rounded-lg shadow-md">
            <FaCheckCircle className="text-green-400 w-8 h-8" />
            <div>
              <h3 className="text-xl font-semibold">Real-time Collaboration</h3>
              <p>Collaborate with team members in real-time, making it easier to share ideas and solve problems together.</p>
            </div>
          </li>
          <li className="flex items-start space-x-4 p-4 bg-gray-700 rounded-lg shadow-md">
            <FaCheckCircle className="text-green-400 w-8 h-8" />
            <div>
              <h3 className="text-xl font-semibold">Enhanced Security</h3>
              <p>With enterprise-grade security measures, Dev Cloud ensures that your code and data are protected.</p>
            </div>
          </li>
          <li className="flex items-start space-x-4 p-4 bg-gray-700 rounded-lg shadow-md">
            <FaCheckCircle className="text-green-400 w-8 h-8" />
            <div>
              <h3 className="text-xl font-semibold">Seamless Integration</h3>
              <p>Easily integrate with popular development tools and frameworks, allowing for a smooth workflow.</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default BenefitsSection;