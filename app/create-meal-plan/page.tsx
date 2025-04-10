"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Footer } from "@/components/footer"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import Link from "next/link"

const formSchema = z.object({
  age: z.string().min(1, { message: "Age is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  weight: z.string().min(1, { message: "Weight is required" }),
  height: z.string().min(1, { message: "Height is required" }),
  activityLevel: z.string().min(1, { message: "Activity level is required" }),
  goal: z.string().min(1, { message: "Goal is required" }),
  allergies: z.array(z.string()).optional(),
  medicalConditions: z.string().optional(),
  preferredFoods: z.array(z.string()).optional(),
})

const allergiesList = [
  { id: "dairy", label: "Dairy" },
  { id: "gluten", label: "Gluten" },
  { id: "nuts", label: "Nuts" },
  { id: "eggs", label: "Eggs" },
  { id: "soy", label: "Soy" },
  { id: "shellfish", label: "Shellfish" },
]

const preferredFoodsList = [
  { id: "chicken", label: "Chicken" },
  { id: "beef", label: "Beef" },
  { id: "fish", label: "Fish" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "mediterranean", label: "Mediterranean" },
]

// Sample meal database
const mealDatabase = {
  breakfast: [
    {
      id: "greek-yogurt",
      name: "Greek Yogurt with Berries and Honey",
      calories: 350,
      protein: "15g",
      carbs: "45g",
      fat: "10g",
      allergies: ["dairy"],
      dietTypes: ["vegetarian"],
    },
    {
      id: "avocado-toast",
      name: "Avocado Toast with Eggs",
      calories: 400,
      protein: "18g",
      carbs: "30g",
      fat: "22g",
      allergies: ["eggs", "gluten"],
      dietTypes: ["vegetarian"],
    },
    {
      id: "oatmeal",
      name: "Oatmeal with Nuts and Fruit",
      calories: 320,
      protein: "10g",
      carbs: "50g",
      fat: "8g",
      allergies: ["nuts", "gluten"],
      dietTypes: ["vegan", "vegetarian"],
    },
    {
      id: "smoothie-bowl",
      name: "Protein Smoothie Bowl",
      calories: 380,
      protein: "25g",
      carbs: "40g",
      fat: "12g",
      allergies: ["dairy"],
      dietTypes: ["vegetarian"],
    },
    {
      id: "tofu-scramble",
      name: "Tofu Scramble with Vegetables",
      calories: 300,
      protein: "20g",
      carbs: "15g",
      fat: "18g",
      allergies: ["soy"],
      dietTypes: ["vegan", "vegetarian"],
    },
  ],
  lunch: [
    {
      id: "chicken-salad",
      name: "Grilled Chicken Salad with Quinoa",
      calories: 450,
      protein: "35g",
      carbs: "30g",
      fat: "15g",
      allergies: [],
      dietTypes: ["chicken"],
    },
    {
      id: "tuna-wrap",
      name: "Tuna and Avocado Wrap",
      calories: 420,
      protein: "28g",
      carbs: "35g",
      fat: "18g",
      allergies: ["gluten", "shellfish"],
      dietTypes: ["fish"],
    },
    {
      id: "lentil-soup",
      name: "Lentil Soup with Whole Grain Bread",
      calories: 380,
      protein: "18g",
      carbs: "60g",
      fat: "6g",
      allergies: ["gluten"],
      dietTypes: ["vegan", "vegetarian", "mediterranean"],
    },
    {
      id: "beef-bowl",
      name: "Beef and Vegetable Rice Bowl",
      calories: 520,
      protein: "30g",
      carbs: "55g",
      fat: "20g",
      allergies: [],
      dietTypes: ["beef"],
    },
    {
      id: "mediterranean-bowl",
      name: "Mediterranean Chickpea Bowl",
      calories: 400,
      protein: "15g",
      carbs: "50g",
      fat: "16g",
      allergies: [],
      dietTypes: ["vegan", "vegetarian", "mediterranean"],
    },
  ],
  dinner: [
    {
      id: "salmon",
      name: "Baked Salmon with Sweet Potatoes and Broccoli",
      calories: 520,
      protein: "40g",
      carbs: "35g",
      fat: "20g",
      allergies: [],
      dietTypes: ["fish", "mediterranean"],
    },
    {
      id: "chicken-stir-fry",
      name: "Chicken and Vegetable Stir Fry",
      calories: 480,
      protein: "35g",
      carbs: "40g",
      fat: "15g",
      allergies: ["soy"],
      dietTypes: ["chicken"],
    },
    {
      id: "beef-steak",
      name: "Grass-fed Beef Steak with Roasted Vegetables",
      calories: 550,
      protein: "45g",
      carbs: "25g",
      fat: "25g",
      allergies: [],
      dietTypes: ["beef"],
    },
    {
      id: "vegetable-curry",
      name: "Vegetable Curry with Brown Rice",
      calories: 420,
      protein: "12g",
      carbs: "65g",
      fat: "14g",
      allergies: ["dairy"],
      dietTypes: ["vegan", "vegetarian"],
    },
    {
      id: "mediterranean-fish",
      name: "Mediterranean Fish with Olives and Tomatoes",
      calories: 450,
      protein: "35g",
      carbs: "20g",
      fat: "25g",
      allergies: [],
      dietTypes: ["fish", "mediterranean"],
    },
  ],
  snacks: [
    {
      id: "apple-almond",
      name: "Apple with Almond Butter",
      calories: 200,
      protein: "5g",
      carbs: "25g",
      fat: "10g",
      allergies: ["nuts"],
      dietTypes: ["vegan", "vegetarian"],
    },
    {
      id: "greek-yogurt-snack",
      name: "Greek Yogurt with Honey",
      calories: 150,
      protein: "12g",
      carbs: "15g",
      fat: "5g",
      allergies: ["dairy"],
      dietTypes: ["vegetarian"],
    },
    {
      id: "hummus-veggies",
      name: "Hummus with Vegetable Sticks",
      calories: 180,
      protein: "6g",
      carbs: "20g",
      fat: "8g",
      allergies: [],
      dietTypes: ["vegan", "vegetarian", "mediterranean"],
    },
    {
      id: "protein-bar",
      name: "Homemade Protein Bar",
      calories: 220,
      protein: "15g",
      carbs: "22g",
      fat: "8g",
      allergies: ["nuts", "dairy"],
      dietTypes: ["vegetarian"],
    },
    {
      id: "mixed-nuts",
      name: "Mixed Nuts and Dried Fruit",
      calories: 210,
      protein: "6g",
      carbs: "15g",
      fat: "15g",
      allergies: ["nuts"],
      dietTypes: ["vegan", "vegetarian", "mediterranean"],
    },
  ],
}

export default function CreateMealPlanPage() {
  const [showResults, setShowResults] = useState(false)
  const [mealPlan, setMealPlan] = useState(null)
  const [calorieNeeds, setCalorieNeeds] = useState(0)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "",
      gender: "",
      weight: "",
      height: "",
      activityLevel: "",
      goal: "",
      allergies: [],
      medicalConditions: "",
      preferredFoods: [],
    },
  })

  // Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
  const calculateBMR = (age: number, gender: string, weight: number, height: number) => {
    if (gender === "male") {
      return 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161
    }
  }

  // Calculate Total Daily Energy Expenditure (TDEE)
  const calculateTDEE = (bmr: number, activityLevel: string) => {
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      "very-active": 1.9,
    }

    return Math.round(bmr * activityMultipliers[activityLevel])
  }

  // Adjust calories based on goal
  const adjustCaloriesForGoal = (tdee: number, goal: string) => {
    switch (goal) {
      case "lose-weight":
        return Math.round(tdee * 0.85) // 15% deficit
      case "gain-weight":
        return Math.round(tdee * 1.15) // 15% surplus
      case "maintain":
      default:
        return tdee
    }
  }

  // Replace the generateMealPlan function with this improved version
  const generateMealPlan = (data: z.infer<typeof formSchema>) => {
    // Calculate calorie needs
    const age = Number.parseInt(data.age)
    const weight = Number.parseInt(data.weight)
    const height = Number.parseInt(data.height)
    const bmr = calculateBMR(age, data.gender, weight, height)
    const tdee = calculateTDEE(bmr, data.activityLevel)
    const dailyCalories = adjustCaloriesForGoal(tdee, data.goal)

    setCalorieNeeds(dailyCalories)

    // Get all eligible meals based on allergies and preferences
    const eligibleBreakfasts = getEligibleMeals("breakfast", data.allergies || [], data.preferredFoods || [])
    const eligibleLunches = getEligibleMeals("lunch", data.allergies || [], data.preferredFoods || [])
    const eligibleDinners = getEligibleMeals("dinner", data.allergies || [], data.preferredFoods || [])
    const eligibleSnacks = getEligibleMeals("snacks", data.allergies || [], data.preferredFoods || [])

    // Find the best combination of meals to match the daily calorie target
    const mealCombination = findBestMealCombination(
      eligibleBreakfasts,
      eligibleLunches,
      eligibleDinners,
      eligibleSnacks,
      dailyCalories,
    )

    // Create the meal plan
    const plan = {
      breakfast: mealCombination.breakfast,
      lunch: mealCombination.lunch,
      dinner: mealCombination.dinner,
      snack: mealCombination.snack,
      totalCalories: mealCombination.totalCalories,
      calorieTarget: dailyCalories,
      userData: data,
    }

    setMealPlan(plan)

    // Store the meal plan in localStorage for use in the recipes page
    if (typeof window !== "undefined") {
      localStorage.setItem("mealPlan", JSON.stringify(plan))
    }

    return plan
  }

  // Add these new helper functions
  const getEligibleMeals = (mealType: string, allergies: string[], preferredFoods: string[]) => {
    let filteredMeals = mealDatabase[mealType]

    // Filter out meals with allergens
    if (allergies && allergies.length > 0) {
      filteredMeals = filteredMeals.filter((meal) => !meal.allergies.some((allergen) => allergies.includes(allergen)))
    }

    // Prioritize preferred foods if specified
    if (preferredFoods && preferredFoods.length > 0) {
      const preferredMeals = filteredMeals.filter((meal) =>
        meal.dietTypes.some((type) => preferredFoods.includes(type)),
      )

      // If we have preferred meals, use those; otherwise fall back to filtered meals
      if (preferredMeals.length > 0) {
        filteredMeals = preferredMeals
      }
    }

    // If no meals match the criteria, return all meals from this type
    if (filteredMeals.length === 0) {
      return mealDatabase[mealType]
    }

    return filteredMeals
  }

  const findBestMealCombination = (breakfasts, lunches, dinners, snacks, targetCalories) => {
    let bestCombination = null
    let smallestDifference = Number.MAX_SAFE_INTEGER

    // Try different combinations to find the one closest to the target calories
    for (const breakfast of breakfasts) {
      for (const lunch of lunches) {
        for (const dinner of dinners) {
          for (const snack of snacks) {
            const totalCalories = breakfast.calories + lunch.calories + dinner.calories + snack.calories
            const difference = Math.abs(totalCalories - targetCalories)

            if (difference < smallestDifference) {
              smallestDifference = difference
              bestCombination = {
                breakfast,
                lunch,
                dinner,
                snack,
                totalCalories,
                difference,
              }

              // If we find an exact match, return immediately
              if (difference === 0) {
                return bestCombination
              }
            }
          }
        }
      }
    }

    // If we have too many combinations to check, use a greedy approach
    if (!bestCombination) {
      // Sort meals by calories
      const sortedBreakfasts = [...breakfasts].sort((a, b) => a.calories - b.calories)
      const sortedLunches = [...lunches].sort((a, b) => a.calories - b.calories)
      const sortedDinners = [...dinners].sort((a, b) => a.calories - b.calories)
      const sortedSnacks = [...snacks].sort((a, b) => a.calories - b.calories)

      // Allocate calories proportionally
      const breakfastTarget = Math.round(targetCalories * 0.25) // 25% of daily calories
      const lunchTarget = Math.round(targetCalories * 0.35) // 35% of daily calories
      const dinnerTarget = Math.round(targetCalories * 0.3) // 30% of daily calories
      const snackTarget = Math.round(targetCalories * 0.1) // 10% of daily calories

      const breakfast = findClosestMeal(sortedBreakfasts, breakfastTarget)
      const lunch = findClosestMeal(sortedLunches, lunchTarget)
      const dinner = findClosestMeal(sortedDinners, dinnerTarget)
      const snack = findClosestMeal(sortedSnacks, snackTarget)

      const totalCalories = breakfast.calories + lunch.calories + dinner.calories + snack.calories
      bestCombination = {
        breakfast,
        lunch,
        dinner,
        snack,
        totalCalories,
        difference: Math.abs(totalCalories - targetCalories),
      }
    }

    return bestCombination
  }

  const findClosestMeal = (meals, targetCalories) => {
    return meals.reduce((closest, current) => {
      return Math.abs(current.calories - targetCalories) < Math.abs(closest.calories - targetCalories)
        ? current
        : closest
    }, meals[0])
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Generate personalized meal plan
    const plan = generateMealPlan(values)
    console.log("Generated meal plan:", plan)
    setShowResults(true)
  }

  function handleCreateMealClick() {
    // Navigate to recipes page with the meal plan
    router.push("/recipes")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24">
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary/20 to-primary/5"></div>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Create Your Personalized Meal Plan</h1>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">
              Tell us about yourself and your goals, and we'll create a customized nutrition plan that works for you.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            {!showResults ? (
              <Card className="max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                  <CardDescription>
                    Fill out the form below to help us create your personalized meal plan.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="30" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weight (kg)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="70" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="height"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Height (cm)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="175" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="activityLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Activity Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select activity level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                                <SelectItem value="light">Lightly active (light exercise 1-3 days/week)</SelectItem>
                                <SelectItem value="moderate">
                                  Moderately active (moderate exercise 3-5 days/week)
                                </SelectItem>
                                <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                                <SelectItem value="very-active">
                                  Very active (very hard exercise & physical job)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="goal"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Goal</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="lose-weight" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Lose Weight</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="gain-weight" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Gain Weight</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="maintain" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Maintain Healthy Lifestyle</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="allergies"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="text-base">Allergies</FormLabel>
                              <FormDescription>Select any food allergies or intolerances you have.</FormDescription>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {allergiesList.map((item) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="allergies"
                                  render={({ field }) => {
                                    return (
                                      <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...(field.value || []), item.id])
                                                : field.onChange(field.value?.filter((value) => value !== item.id))
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">{item.label}</FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="medicalConditions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Medical Conditions</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="List any medical conditions that may affect your diet (e.g., diabetes, hypertension)"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="preferredFoods"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="text-base">Preferred Foods</FormLabel>
                              <FormDescription>
                                Select your food preferences to customize your meal plan.
                              </FormDescription>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {preferredFoodsList.map((item) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="preferredFoods"
                                  render={({ field }) => {
                                    return (
                                      <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...(field.value || []), item.id])
                                                : field.onChange(field.value?.filter((value) => value !== item.id))
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">{item.label}</FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full">
                        Generate My Meal Plan
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            ) : (
              <div className="max-w-4xl mx-auto">
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Your Personalized Meal Plan</CardTitle>
                    <CardDescription>
                      Based on your information, we've created a customized meal plan to help you reach your goals.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="p-4 bg-muted rounded-lg">
                        <h3 className="font-semibold text-lg mb-2">Daily Caloric Needs</h3>
                        <p>
                          Based on your profile, your estimated daily caloric needs are{" "}
                          <span className="font-bold">{calorieNeeds} calories</span>.
                        </p>
                      </div>

                      {mealPlan && (
                        <div>
                          <h3 className="font-semibold text-lg mb-4">Your Personalized Daily Meal Plan</h3>
                          <div className="grid gap-4">
                            <div className="border rounded-lg p-4">
                              <h4 className="font-medium text-primary mb-2">
                                Breakfast ({mealPlan.breakfast.calories} calories)
                              </h4>
                              <p className="font-semibold mb-1">{mealPlan.breakfast.name}</p>
                              <div className="flex gap-4 text-sm text-muted-foreground mb-2">
                                <span>Protein: {mealPlan.breakfast.protein}</span>
                                <span>Carbs: {mealPlan.breakfast.carbs}</span>
                                <span>Fat: {mealPlan.breakfast.fat}</span>
                              </div>
                            </div>
                            <div className="border rounded-lg p-4">
                              <h4 className="font-medium text-primary mb-2">
                                Lunch ({mealPlan.lunch.calories} calories)
                              </h4>
                              <p className="font-semibold mb-1">{mealPlan.lunch.name}</p>
                              <div className="flex gap-4 text-sm text-muted-foreground mb-2">
                                <span>Protein: {mealPlan.lunch.protein}</span>
                                <span>Carbs: {mealPlan.lunch.carbs}</span>
                                <span>Fat: {mealPlan.lunch.fat}</span>
                              </div>
                            </div>
                            <div className="border rounded-lg p-4">
                              <h4 className="font-medium text-primary mb-2">
                                Dinner ({mealPlan.dinner.calories} calories)
                              </h4>
                              <p className="font-semibold mb-1">{mealPlan.dinner.name}</p>
                              <div className="flex gap-4 text-sm text-muted-foreground mb-2">
                                <span>Protein: {mealPlan.dinner.protein}</span>
                                <span>Carbs: {mealPlan.dinner.carbs}</span>
                                <span>Fat: {mealPlan.dinner.fat}</span>
                              </div>
                            </div>
                            <div className="border rounded-lg p-4">
                              <h4 className="font-medium text-primary mb-2">
                                Snack ({mealPlan.snack.calories} calories)
                              </h4>
                              <p className="font-semibold mb-1">{mealPlan.snack.name}</p>
                              <div className="flex gap-4 text-sm text-muted-foreground mb-2">
                                <span>Protein: {mealPlan.snack.protein}</span>
                                <span>Carbs: {mealPlan.snack.carbs}</span>
                                <span>Fat: {mealPlan.snack.fat}</span>
                              </div>
                            </div>
                            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                              <div className="flex justify-between items-center">
                                <span className="font-semibold">Total Daily Calories:</span>
                                <span className="font-bold">{mealPlan.totalCalories} calories</span>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <span className="font-semibold">Target Calories:</span>
                                <span className="font-bold">{mealPlan.calorieTarget} calories</span>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <span className="font-semibold">Accuracy:</span>
                                <span
                                  className={
                                    Math.abs(mealPlan.totalCalories - mealPlan.calorieTarget) < 50
                                      ? "text-green-500 font-bold"
                                      : Math.abs(mealPlan.totalCalories - mealPlan.calorieTarget) < 100
                                        ? "text-amber-500 font-bold"
                                        : "text-red-500 font-bold"
                                  }
                                >
                                  {Math.abs(mealPlan.totalCalories - mealPlan.calorieTarget) < 50
                                    ? "Excellent"
                                    : Math.abs(mealPlan.totalCalories - mealPlan.calorieTarget) < 100
                                      ? "Good"
                                      : "Fair"}{" "}
                                  ({Math.abs(mealPlan.totalCalories - mealPlan.calorieTarget)} calories{" "}
                                  {mealPlan.totalCalories > mealPlan.calorieTarget ? "over" : "under"})
                                </span>
                              </div>
                              <div className="mt-3 text-sm text-muted-foreground">
                                This meal plan has been optimized to match your calculated daily calorie needs as
                                closely as possible.
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 text-center">
                      <Link href="/recipes">
                        <Button size="lg" className="px-8" onClick={handleCreateMealClick}>
                          Help Me Create My Meal
                        </Button>
                      </Link>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Get detailed recipes and a shopping list for your personalized meal plan
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16">
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
