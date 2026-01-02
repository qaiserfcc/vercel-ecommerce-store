import { TrendingUp, Users, Gift, Shield } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-dark mb-4">Why Choose Namecheap?</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're not just another e-commerce store. We believe in sharing success with our customers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="card text-center hover:shadow-xl transition-shadow">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="text-primary" size={32} />
          </div>
          <h3 className="font-bold text-xl mb-2">Bulk Buying Benefits</h3>
          <p className="text-gray-600">
            Buy in bulk and enjoy wholesale prices. The more you buy, the more you save!
          </p>
        </div>

        <div className="card text-center hover:shadow-xl transition-shadow">
          <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="text-secondary" size={32} />
          </div>
          <h3 className="font-bold text-xl mb-2">Referral Rewards</h3>
          <p className="text-gray-600">
            Share with friends and earn discounts. Everyone wins when you refer!
          </p>
        </div>

        <div className="card text-center hover:shadow-xl transition-shadow">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="text-primary" size={32} />
          </div>
          <h3 className="font-bold text-xl mb-2">Profit Sharing</h3>
          <p className="text-gray-600">
            We share our profits through automatic discounts and exclusive deals.
          </p>
        </div>

        <div className="card text-center hover:shadow-xl transition-shadow">
          <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-secondary" size={32} />
          </div>
          <h3 className="font-bold text-xl mb-2">Quality Guaranteed</h3>
          <p className="text-gray-600">
            100% authentic products with warranty and hassle-free returns.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-dark mb-6">About Namecheap</h3>
          <div className="space-y-4 text-gray-700">
            <p className="text-lg">
              Namecheap is revolutionizing the e-commerce industry by putting customers first. 
              Founded on the principle that everyone deserves fair pricing and value, we've built 
              a platform that truly shares success with our community.
            </p>
            <p className="text-lg">
              Our unique business model allows us to offer competitive prices while giving back 
              to our customers through various profit-sharing mechanisms:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg ml-4">
              <li>Bulk buying discounts that increase with quantity</li>
              <li>Referral bonuses that benefit both you and your friends</li>
              <li>Automatic discounts on bundled products</li>
              <li>Loyalty rewards that grow with every purchase</li>
              <li>Seasonal promotions and flash sales</li>
            </ul>
            <p className="text-lg">
              We partner with trusted brands to bring you quality products at prices that make sense. 
              Our commitment to transparency means you always know exactly what you're getting and 
              what you're paying for. Join thousands of satisfied customers who have discovered a 
              better way to shop online.
            </p>
            <p className="text-lg font-semibold text-primary">
              Shop smart, save more, and be part of a community that values fairness and quality!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
