import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1920&auto=format&fit=crop"
              alt="Healthy meal preparation"
              fill
              className="object-cover brightness-[0.7]"
              priority
            />
          </div>
          <div className="container relative z-10 mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">NutriPlan</h1>
            <p className="text-xl md:text-2xl mb-8">Your personalized meal planning companion</p>
            <Link href="/auth">
              <Button size="lg" className="text-lg px-8 py-6">
                Create Your Meal
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose NutriPlan?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 shadow-md">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-utensils"
                  >
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                    <path d="M7 2v20" />
                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Personalized Plans</h3>
                <p className="text-center text-muted-foreground">
                  Get meal plans tailored to your specific health needs and goals.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-md">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-heart"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Health-Focused</h3>
                <p className="text-center text-muted-foreground">
                  Nutritionally balanced meals designed by certified nutritionists.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-md">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-clock"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Time-Saving</h3>
                <p className="text-center text-muted-foreground">
                  Save hours on meal planning and grocery shopping with our smart system.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <TestimonialCarousel />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to transform your meal planning?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of users who have simplified their nutrition journey with NutriPlan.
            </p>
            <Link href="/auth">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-6">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
