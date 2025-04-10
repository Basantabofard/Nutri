"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Lost 15kg in 6 months",
    content:
      "NutriPlan completely transformed my relationship with food. The personalized meal plans made it easy to stay on track with my weight loss goals without feeling deprived.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Fitness Enthusiast",
    content:
      "As someone who's serious about fitness, I needed a nutrition plan that could keep up with my training. NutriPlan delivered exactly what I needed to fuel my workouts and recovery.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Busy Professional",
    content:
      "With my hectic schedule, meal planning was always a challenge. NutriPlan simplified everything with easy recipes and a shopping list. Now I eat healthier without the stress!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Managing Diabetes",
    content:
      "Finding meals that help manage my diabetes used to be difficult. NutriPlan's customized approach takes my medical condition into account and provides delicious options.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
  },
]

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [userTestimonials, setUserTestimonials] = useState([])
  const allTestimonials = [...testimonials, ...userTestimonials]
  const addTestimonialRef = useRef(null)

  useEffect(() => {
    addTestimonialRef.current = (name, role, content) => {
      // Determine likely gender based on name (this is a simple approach)
      // In a real app, you would collect gender information directly
      const firstLetter = name.trim().charAt(0).toLowerCase()
      const likelyFemale = ["a", "e", "i", "o", "u"].includes(firstLetter)

      const newTestimonial = {
        id: testimonials.length + userTestimonials.length + 1,
        name,
        role,
        content,
        avatar: likelyFemale
          ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop"
          : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop",
      }
      setUserTestimonials((prev) => [...prev, newTestimonial])
    }
  }, [userTestimonials])

  useEffect(() => {
    window.addTestimonial = (...args) => {
      if (addTestimonialRef.current) {
        addTestimonialRef.current(...args)
      }
    }

    return () => {
      delete window.addTestimonial
    }
  }, [])

  const prev = () => {
    setCurrent((current - 1 + allTestimonials.length) % allTestimonials.length)
    setAutoplay(false)
  }

  const next = () => {
    setCurrent((current + 1) % allTestimonials.length)
    setAutoplay(false)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((current + 1) % allTestimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [current, autoplay, allTestimonials.length])

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {allTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {allTestimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${current === index ? "bg-primary" : "bg-muted"}`}
            onClick={() => {
              setCurrent(index)
              setAutoplay(false)
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full hidden md:flex"
        onClick={prev}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full hidden md:flex"
        onClick={next}
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
