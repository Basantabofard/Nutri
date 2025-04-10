"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Footer } from "@/components/footer"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

// Recipe details for each meal with realistic reference images
const recipeDetails = {
  "greek-yogurt": {
    name: "Greek Yogurt with Berries and Honey",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop",
    calories: 350,
    protein: "15g",
    carbs: "45g",
    fat: "10g",
    prepTime: "5 minutes",
    ingredients: [
      "1 cup Greek yogurt",
      "1/2 cup mixed berries (strawberries, blueberries, raspberries)",
      "1 tablespoon honey",
      "1 tablespoon chia seeds",
      "1/4 cup granola",
    ],
    instructions: [
      "Add Greek yogurt to a bowl.",
      "Top with mixed berries.",
      "Drizzle honey over the top.",
      "Sprinkle with chia seeds and granola.",
      "Enjoy immediately or refrigerate for later.",
    ],
  },
  "avocado-toast": {
    name: "Avocado Toast with Eggs",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=600&auto=format&fit=crop",
    calories: 400,
    protein: "18g",
    carbs: "30g",
    fat: "22g",
    prepTime: "10 minutes",
    ingredients: [
      "2 slices whole grain bread",
      "1 ripe avocado",
      "2 eggs",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)",
      "1 tablespoon olive oil",
    ],
    instructions: [
      "Toast the bread until golden brown.",
      "While bread is toasting, heat olive oil in a pan over medium heat.",
      "Crack eggs into the pan and cook to your preference (sunny side up or over easy).",
      "Mash the avocado in a bowl and season with salt and pepper.",
      "Spread the mashed avocado on the toast.",
      "Top each slice with an egg.",
      "Sprinkle with additional salt, pepper, and red pepper flakes if desired.",
    ],
  },
  oatmeal: {
    name: "Oatmeal with Nuts and Fruit",
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=600&auto=format&fit=crop",
    calories: 320,
    protein: "10g",
    carbs: "50g",
    fat: "8g",
    prepTime: "10 minutes",
    ingredients: [
      "1 cup rolled oats",
      "2 cups water or milk",
      "1/4 cup mixed nuts (almonds, walnuts)",
      "1 banana, sliced",
      "1 tablespoon maple syrup or honey",
      "1/2 teaspoon cinnamon",
    ],
    instructions: [
      "Combine oats and liquid in a pot over medium heat.",
      "Bring to a simmer and cook for 5-7 minutes, stirring occasionally.",
      "Remove from heat when oats reach desired consistency.",
      "Transfer to a bowl and top with sliced banana and mixed nuts.",
      "Drizzle with maple syrup or honey and sprinkle with cinnamon.",
    ],
  },
  "smoothie-bowl": {
    name: "Protein Smoothie Bowl",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=600&auto=format&fit=crop",
    calories: 380,
    protein: "25g",
    carbs: "40g",
    fat: "12g",
    prepTime: "5 minutes",
    ingredients: [
      "1 frozen banana",
      "1 cup frozen berries",
      "1 scoop protein powder",
      "1/2 cup Greek yogurt",
      "1/4 cup milk or plant-based alternative",
      "Toppings: granola, fresh fruit, coconut flakes, chia seeds",
    ],
    instructions: [
      "Blend frozen banana, berries, protein powder, yogurt, and milk until smooth and thick.",
      "Pour into a bowl.",
      "Top with granola, fresh fruit, coconut flakes, and chia seeds.",
      "Serve immediately.",
    ],
  },
  "tofu-scramble": {
    name: "Tofu Scramble with Vegetables",
    image: "https://images.unsplash.com/photo-1648000101457-c816f8506349?q=80&w=600&auto=format&fit=crop",
    calories: 300,
    protein: "20g",
    carbs: "15g",
    fat: "18g",
    prepTime: "15 minutes",
    ingredients: [
      "1 block (14 oz) firm tofu, drained and crumbled",
      "1 bell pepper, diced",
      "1/2 onion, diced",
      "2 cups spinach",
      "2 tablespoons nutritional yeast",
      "1/2 teaspoon turmeric",
      "1 tablespoon olive oil",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Heat olive oil in a pan over medium heat.",
      "Add onion and bell pepper, sauté for 3-4 minutes until softened.",
      "Add crumbled tofu, turmeric, nutritional yeast, salt, and pepper.",
      "Cook for 5-7 minutes, stirring occasionally.",
      "Add spinach and cook until wilted.",
      "Serve hot with toast or roasted potatoes.",
    ],
  },
  "chicken-salad": {
    name: "Grilled Chicken Salad with Quinoa",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
    calories: 450,
    protein: "35g",
    carbs: "30g",
    fat: "15g",
    prepTime: "20 minutes",
    ingredients: [
      "4 oz grilled chicken breast, sliced",
      "2 cups mixed greens",
      "1/2 cup cooked quinoa",
      "1/4 cup cherry tomatoes, halved",
      "1/4 cucumber, sliced",
      "1/4 avocado, diced",
      "2 tbsp olive oil",
      "1 tbsp lemon juice",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Cook quinoa according to package instructions and let cool.",
      "Season chicken breast with salt and pepper, then grill until fully cooked.",
      "In a large bowl, combine mixed greens, quinoa, tomatoes, cucumber, and avocado.",
      "Slice the grilled chicken and add to the salad.",
      "Whisk together olive oil, lemon juice, salt, and pepper to make the dressing.",
      "Drizzle the dressing over the salad and toss to combine.",
    ],
  },
  "tuna-wrap": {
    name: "Tuna and Avocado Wrap",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=600&auto=format&fit=crop",
    calories: 420,
    protein: "28g",
    carbs: "35g",
    fat: "18g",
    prepTime: "10 minutes",
    ingredients: [
      "1 whole grain wrap",
      "1 can (5oz) tuna, drained",
      "1/2 avocado, sliced",
      "1/4 cup shredded lettuce",
      "1/4 cup diced tomatoes",
      "1 tbsp Greek yogurt",
      "1 tsp lemon juice",
      "Salt and pepper to taste",
    ],
    instructions: [
      "In a bowl, mix tuna with Greek yogurt, lemon juice, salt, and pepper.",
      "Lay the wrap flat and spread the tuna mixture in the center.",
      "Top with avocado slices, lettuce, and tomatoes.",
      "Fold the sides of the wrap inward, then roll from the bottom up to form a wrap.",
      "Cut in half and serve.",
    ],
  },
  "lentil-soup": {
    name: "Lentil Soup with Whole Grain Bread",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=600&auto=format&fit=crop",
    calories: 380,
    protein: "18g",
    carbs: "60g",
    fat: "6g",
    prepTime: "30 minutes",
    ingredients: [
      "1 cup dried lentils, rinsed",
      "1 onion, diced",
      "2 carrots, diced",
      "2 celery stalks, diced",
      "3 cloves garlic, minced",
      "1 tsp cumin",
      "1 tsp paprika",
      "4 cups vegetable broth",
      "1 slice whole grain bread",
      "2 tbsp olive oil",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Heat olive oil in a pot over medium heat.",
      "Add onion, carrots, and celery, sauté for 5 minutes.",
      "Add garlic, cumin, and paprika, cook for 1 minute.",
      "Add lentils and vegetable broth, bring to a boil.",
      "Reduce heat and simmer for 20-25 minutes until lentils are tender.",
      "Season with salt and pepper.",
      "Serve with a slice of whole grain bread.",
    ],
  },
  "beef-bowl": {
    name: "Beef and Vegetable Rice Bowl",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600&auto=format&fit=crop",
    calories: 520,
    protein: "30g",
    carbs: "55g",
    fat: "20g",
    prepTime: "25 minutes",
    ingredients: [
      "4 oz lean beef, thinly sliced",
      "1 cup cooked brown rice",
      "1 cup broccoli florets",
      "1 carrot, julienned",
      "1/2 bell pepper, sliced",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "1 tsp honey",
      "1 clove garlic, minced",
      "1 tsp ginger, grated",
      "Sesame seeds for garnish",
    ],
    instructions: [
      "Cook brown rice according to package instructions.",
      "In a small bowl, mix soy sauce, sesame oil, honey, garlic, and ginger.",
      "Heat a pan over medium-high heat and add beef, cook for 2-3 minutes.",
      "Add broccoli, carrot, and bell pepper, stir-fry for 3-4 minutes.",
      "Pour sauce over the beef and vegetables, cook for another minute.",
      "Serve over brown rice and garnish with sesame seeds.",
    ],
  },
  "mediterranean-bowl": {
    name: "Mediterranean Chickpea Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
    calories: 400,
    protein: "15g",
    carbs: "50g",
    fat: "16g",
    prepTime: "15 minutes",
    ingredients: [
      "1 cup chickpeas, drained and rinsed",
      "1/2 cup cucumber, diced",
      "1/2 cup cherry tomatoes, halved",
      "1/4 cup red onion, diced",
      "1/4 cup feta cheese, crumbled",
      "2 tbsp olive oil",
      "1 tbsp lemon juice",
      "1 tsp dried oregano",
      "1/4 cup kalamata olives",
      "2 tbsp fresh parsley, chopped",
      "Salt and pepper to taste",
    ],
    instructions: [
      "In a large bowl, combine chickpeas, cucumber, tomatoes, red onion, and olives.",
      "In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper.",
      "Pour dressing over the salad and toss to combine.",
      "Top with crumbled feta cheese and fresh parsley.",
      "Serve chilled or at room temperature.",
    ],
  },
  salmon: {
    name: "Baked Salmon with Sweet Potatoes and Broccoli",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop",
    calories: 520,
    protein: "40g",
    carbs: "35g",
    fat: "20g",
    prepTime: "35 minutes",
    ingredients: [
      "6 oz salmon fillet",
      "1 medium sweet potato",
      "1 cup broccoli florets",
      "2 tbsp olive oil",
      "1 lemon",
      "2 cloves garlic, minced",
      "1 tsp dried herbs (thyme, rosemary, or dill)",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Preheat oven to 400°F (200°C).",
      "Wash and cut sweet potato into 1-inch cubes. Toss with 1 tbsp olive oil, salt, and pepper.",
      "Spread sweet potatoes on a baking sheet and roast for 15 minutes.",
      "Season salmon with salt, pepper, and dried herbs.",
      "Add broccoli to the baking sheet with sweet potatoes, and place salmon on top.",
      "Drizzle remaining olive oil over broccoli and salmon, add minced garlic.",
      "Return to oven and bake for 15-20 minutes until salmon is cooked through.",
      "Squeeze fresh lemon juice over the salmon before serving.",
    ],
  },
  "chicken-stir-fry": {
    name: "Chicken and Vegetable Stir Fry",
    image: "https://images.unsplash.com/photo-1603356033288-acfcb54801e6?q=80&w=600&auto=format&fit=crop",
    calories: 480,
    protein: "35g",
    carbs: "40g",
    fat: "15g",
    prepTime: "20 minutes",
    ingredients: [
      "4 oz chicken breast, sliced",
      "1 cup mixed vegetables (bell peppers, snap peas, carrots)",
      "1 cup brown rice, cooked",
      "2 cloves garlic, minced",
      "1 tbsp ginger, grated",
      "2 tbsp low-sodium soy sauce",
      "1 tbsp sesame oil",
      "1 tsp honey",
      "1 tsp cornstarch",
      "2 tbsp water",
      "Green onions for garnish",
    ],
    instructions: [
      "Cook brown rice according to package instructions.",
      "In a small bowl, mix soy sauce, sesame oil, honey, cornstarch, and water.",
      "Heat a wok or large pan over high heat.",
      "Add chicken and cook for 3-4 minutes until nearly cooked through.",
      "Add garlic and ginger, stir for 30 seconds.",
      "Add vegetables and stir-fry for 2-3 minutes until crisp-tender.",
      "Pour sauce over the chicken and vegetables, cook for 1-2 minutes until thickened.",
      "Serve over brown rice and garnish with green onions.",
    ],
  },
  "beef-steak": {
    name: "Grass-fed Beef Steak with Roasted Vegetables",
    image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?q=80&w=600&auto=format&fit=crop",
    calories: 550,
    protein: "45g",
    carbs: "25g",
    fat: "25g",
    prepTime: "30 minutes",
    ingredients: [
      "6 oz grass-fed beef steak",
      "1 cup mixed vegetables (bell peppers, zucchini, onions)",
      "2 tbsp olive oil",
      "2 cloves garlic, minced",
      "1 tsp rosemary",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Preheat oven to 425°F (220°C).",
      "Season steak with salt, pepper, and half of the minced garlic. Let sit at room temperature for 15 minutes.",
      "Chop vegetables into similar-sized pieces and toss with 1 tbsp olive oil, remaining garlic, rosemary, salt, and pepper.",
      "Spread vegetables on a baking sheet and roast for 20 minutes, stirring halfway through.",
      "While vegetables are roasting, heat 1 tbsp olive oil in a skillet over high heat.",
      "Cook steak for 3-4 minutes per side for medium-rare, or to your preferred doneness.",
      "Let steak rest for 5 minutes before slicing.",
      "Serve steak with roasted vegetables.",
    ],
  },
  "vegetable-curry": {
    name: "Vegetable Curry with Brown Rice",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=600&auto=format&fit=crop",
    calories: 420,
    protein: "12g",
    carbs: "65g",
    fat: "14g",
    prepTime: "25 minutes",
    ingredients: [
      "1 cup mixed vegetables (cauliflower, carrots, peas)",
      "1/2 cup chickpeas, drained and rinsed",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "1 tbsp ginger, grated",
      "2 tbsp curry powder",
      "1 can (14 oz) coconut milk",
      "1 cup brown rice, cooked",
      "1 tbsp olive oil",
      "Fresh cilantro for garnish",
      "Salt to taste",
    ],
    instructions: [
      "Cook brown rice according to package instructions.",
      "Heat olive oil in a large pan over medium heat.",
      "Add onion and cook for 3-4 minutes until softened.",
      "Add garlic and ginger, cook for 1 minute.",
      "Add curry powder and stir for 30 seconds.",
      "Add vegetables and chickpeas, stir to coat with spices.",
      "Pour in coconut milk and bring to a simmer.",
      "Cook for 15 minutes until vegetables are tender.",
      "Season with salt to taste.",
      "Serve over brown rice and garnish with fresh cilantro.",
    ],
  },
  "mediterranean-fish": {
    name: "Mediterranean Fish with Olives and Tomatoes",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop",
    calories: 450,
    protein: "35g",
    carbs: "20g",
    fat: "25g",
    prepTime: "25 minutes",
    ingredients: [
      "6 oz white fish fillet (cod, tilapia, or sea bass)",
      "1 cup cherry tomatoes, halved",
      "1/4 cup kalamata olives, pitted",
      "2 tbsp capers",
      "2 cloves garlic, minced",
      "1 lemon",
      "2 tbsp olive oil",
      "1 tsp dried oregano",
      "Fresh parsley, chopped",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "Season fish with salt, pepper, and oregano.",
      "In a baking dish, combine tomatoes, olives, capers, and garlic.",
      "Drizzle with 1 tbsp olive oil and toss to combine.",
      "Place fish on top of the tomato mixture.",
      "Drizzle fish with remaining olive oil and squeeze half a lemon over it.",
      "Bake for 15-20 minutes until fish flakes easily with a fork.",
      "Garnish with fresh parsley and serve with remaining lemon wedges.",
    ],
  },
  "apple-almond": {
    name: "Apple with Almond Butter",
    image: "https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?q=80&w=600&auto=format&fit=crop",
    calories: 200,
    protein: "5g",
    carbs: "25g",
    fat: "10g",
    prepTime: "2 minutes",
    ingredients: ["1 medium apple", "2 tbsp almond butter"],
    instructions: ["Wash and slice the apple into wedges.", "Serve with almond butter for dipping."],
  },
  "greek-yogurt-snack": {
    name: "Greek Yogurt with Honey",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop",
    calories: 150,
    protein: "12g",
    carbs: "15g",
    fat: "5g",
    prepTime: "2 minutes",
    ingredients: ["3/4 cup Greek yogurt", "1 tbsp honey", "1/2 tsp cinnamon (optional)"],
    instructions: ["Add Greek yogurt to a bowl.", "Drizzle with honey.", "Sprinkle with cinnamon if desired."],
  },
  "hummus-veggies": {
    name: "Hummus with Vegetable Sticks",
    image: "https://images.unsplash.com/photo-1540914124281-342587941389?q=80&w=600&auto=format&fit=crop",
    calories: 180,
    protein: "6g",
    carbs: "20g",
    fat: "8g",
    prepTime: "5 minutes",
    ingredients: [
      "1/4 cup hummus",
      "1 carrot, cut into sticks",
      "1 bell pepper, sliced",
      "1 cucumber, sliced",
      "4 celery sticks",
    ],
    instructions: ["Wash and cut all vegetables into sticks or slices.", "Serve with hummus for dipping."],
  },
  "protein-bar": {
    name: "Homemade Protein Bar",
    image: "https://images.unsplash.com/photo-1622484212850-eb596d769edc?q=80&w=600&auto=format&fit=crop",
    calories: 220,
    protein: "15g",
    carbs: "22g",
    fat: "8g",
    prepTime: "15 minutes + 1 hour chilling",
    ingredients: [
      "1 cup rolled oats",
      "1/2 cup protein powder",
      "2 tbsp flaxseed, ground",
      "2 tbsp chia seeds",
      "1/3 cup honey or maple syrup",
      "1/2 cup nut butter",
      "1 tsp vanilla extract",
      "1/4 cup mini dark chocolate chips (optional)",
    ],
    instructions: [
      "Line a small baking dish with parchment paper.",
      "In a large bowl, mix oats, protein powder, flaxseed, and chia seeds.",
      "In a small saucepan, warm honey and nut butter until combined.",
      "Remove from heat and stir in vanilla extract.",
      "Pour wet ingredients over dry ingredients and mix well.",
      "Fold in chocolate chips if using.",
      "Press mixture firmly into the prepared baking dish.",
      "Refrigerate for at least 1 hour before cutting into bars.",
    ],
  },
  "mixed-nuts": {
    name: "Mixed Nuts and Dried Fruit",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=600&auto=format&fit=crop",
    calories: 210,
    protein: "6g",
    carbs: "15g",
    fat: "15g",
    prepTime: "1 minute",
    ingredients: [
      "1/4 cup mixed nuts (almonds, walnuts, cashews)",
      "2 tbsp dried fruit (raisins, cranberries, apricots)",
    ],
    instructions: ["Combine nuts and dried fruit in a small container.", "Enjoy as a quick, nutrient-dense snack."],
  },
}

// Shopping list categories
const shoppingCategories = {
  Produce: [
    "Mixed berries (strawberries, blueberries, raspberries)",
    "Mixed greens",
    "Cherry tomatoes",
    "Cucumber",
    "Avocado",
    "Lemon",
    "Sweet potato",
    "Broccoli",
    "Apple",
    "Bell peppers",
    "Zucchini",
    "Onions",
    "Carrots",
    "Celery",
  ],
  Proteins: ["Greek yogurt", "Eggs", "Chicken breast", "Salmon fillet", "Tuna", "Grass-fed beef steak"],
  "Grains & Nuts": ["Quinoa", "Granola", "Chia seeds", "Almond butter", "Whole grain bread", "Whole grain wraps"],
  "Pantry Items": [
    "Honey",
    "Olive oil",
    "Garlic",
    "Dried herbs (thyme, rosemary, dill)",
    "Salt",
    "Pepper",
    "Red pepper flakes",
    "Hummus",
  ],
}

// Comment form schema
const commentSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  comment: z.string().min(10, { message: "Comment must be at least 10 characters" }),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to share your review",
  }),
})

export default function RecipesPage() {
  const [mealPlan, setMealPlan] = useState(null)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [shoppingItems, setShoppingItems] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  // Initialize form
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: "",
      consent: false,
    },
  })

  // Load meal plan from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMealPlan = localStorage.getItem("mealPlan")
      if (savedMealPlan) {
        const parsedMealPlan = JSON.parse(savedMealPlan)
        setMealPlan(parsedMealPlan)

        // Set the first meal as selected by default
        if (parsedMealPlan.breakfast) {
          setSelectedMeal(recipeDetails[parsedMealPlan.breakfast.id] || null)
        }
      }
    }
  }, [])

  // Toggle shopping item checked state
  const toggleShoppingItem = (item: string) => {
    setShoppingItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }))
  }

  // Handle comment submission
  function onSubmit(values: z.infer<typeof commentSchema>) {
    console.log(values)

    // In a real app, this would send the comment to a database
    // For now, we'll add it to the testimonials via the global function
    if (typeof window !== "undefined" && window.addTestimonial) {
      window.addTestimonial(values.name, values.email, values.comment)
    }

    toast({
      title: "Review Submitted",
      description: "Thank you for sharing your experience with NutriPlan!",
    })

    form.reset()
  }

  // Generate a list of meals from the meal plan
  const getMealsList = () => {
    if (!mealPlan) return []

    return [
      { id: mealPlan.breakfast.id, name: mealPlan.breakfast.name, type: "Breakfast" },
      { id: mealPlan.lunch.id, name: mealPlan.lunch.name, type: "Lunch" },
      { id: mealPlan.dinner.id, name: mealPlan.dinner.name, type: "Dinner" },
      { id: mealPlan.snack.id, name: mealPlan.snack.name, type: "Snack" },
    ]
  }

  // Select a meal to display its recipe
  const handleMealSelect = (mealId: string) => {
    const mealDetails = recipeDetails[mealId]
    if (mealDetails) {
      setSelectedMeal(mealDetails)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Personalized Meal Plan</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Explore detailed recipes and create your shopping list for a week of healthy eating.
              </p>
            </div>
          </div>
        </section>

        {/* Recipe and Shopping List Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Meal Selection Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-4 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Meals</CardTitle>
                      <CardDescription>Select a meal to view the recipe</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {getMealsList().map((meal) => (
                          <Button
                            key={meal.id}
                            variant={
                              selectedMeal && selectedMeal.name === recipeDetails[meal.id]?.name ? "default" : "outline"
                            }
                            className="w-full justify-start text-left"
                            onClick={() => handleMealSelect(meal.id)}
                          >
                            <span className="mr-2 text-xs text-muted-foreground">{meal.type}:</span> {meal.name}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {mealPlan && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Nutritional Summary</CardTitle>
                        <CardDescription>Daily totals for your meal plan</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Calories:</span>
                            <span className="font-medium">{mealPlan.totalCalories} kcal</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Goal:</span>
                            <span className="font-medium capitalize">{mealPlan.userData.goal.replace("-", " ")}</span>
                          </div>
                          <div className="h-px bg-muted my-2"></div>
                          <div className="text-xs text-muted-foreground">
                            Personalized for your profile: {mealPlan.userData.age} years, {mealPlan.userData.gender},{" "}
                            {mealPlan.userData.weight}kg
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="recipe" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="recipe">Recipe</TabsTrigger>
                    <TabsTrigger value="shopping">Shopping List</TabsTrigger>
                  </TabsList>

                  {/* Recipe Tab */}
                  <TabsContent value="recipe" className="mt-4">
                    {selectedMeal && (
                      <Card>
                        <CardHeader>
                          <CardTitle>{selectedMeal.name}</CardTitle>
                          <CardDescription>
                            {selectedMeal.calories} calories | Prep time: {selectedMeal.prepTime}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="relative h-[300px] rounded-md overflow-hidden">
                            <Image
                              src={selectedMeal.image || "/placeholder.svg"}
                              alt={selectedMeal.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="grid grid-cols-4 gap-4 py-2 border-y">
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Calories</p>
                              <p className="font-medium">{selectedMeal.calories}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Protein</p>
                              <p className="font-medium">{selectedMeal.protein}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Carbs</p>
                              <p className="font-medium">{selectedMeal.carbs}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Fat</p>
                              <p className="font-medium">{selectedMeal.fat}</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium mb-2">Ingredients</h3>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {selectedMeal.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium mb-2">Instructions</h3>
                            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                              {selectedMeal.instructions.map((instruction, index) => (
                                <li key={index} className="pl-1">
                                  <span className="text-foreground font-medium">{`Step ${index + 1}: `}</span>
                                  {instruction}
                                </li>
                              ))}
                            </ol>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  {/* Shopping List Tab */}
                  <TabsContent value="shopping" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Weekly Shopping List</CardTitle>
                        <CardDescription>All the ingredients you need for your meal plan</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {Object.entries(shoppingCategories).map(([category, items]) => (
                            <div key={category}>
                              <h3 className="text-lg font-medium mb-3">{category}</h3>
                              <div className="space-y-2">
                                {items.map((item) => (
                                  <div key={item} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`item-${item}`}
                                      checked={shoppingItems[item] || false}
                                      onCheckedChange={() => toggleShoppingItem(item)}
                                    />
                                    <label
                                      htmlFor={`item-${item}`}
                                      className={`text-sm ${shoppingItems[item] ? "line-through text-muted-foreground" : ""}`}
                                    >
                                      {item}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6">
                          <Button className="w-full">Print Shopping List</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Review Form */}
                <div className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Share Your Experience</CardTitle>
                      <CardDescription>Let us know how NutriPlan has helped you achieve your goals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input placeholder="your.email@example.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Your Review</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Share your experience with NutriPlan..."
                                    className="min-h-[120px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="consent"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                                <FormControl>
                                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>I agree to share my review on the NutriPlan website</FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="w-full">
                            Submit Review
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
            <TestimonialCarousel />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
