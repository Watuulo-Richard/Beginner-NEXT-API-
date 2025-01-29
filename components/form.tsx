"use client"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { motion } from "framer-motion"
import { Loader} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ProductType } from "@/types/types"
import toast from "react-hot-toast"
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export default function ProductForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductType>()

  async function onSubmit(data:ProductType){
    data.price = Number(data.price)
    
    try {
        setIsLoading(true)
        await fetch(`${baseUrl}/api/v1/products`,{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body : JSON.stringify(data)
        })
        toast.success("product created successfully")
        setIsLoading(false)
        reset()
    } catch (error) {
        console.log(error)
        toast.error("failed to create product")
        setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen bg-gray-100 p-4"
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Add New Product</CardTitle>
          <CardDescription className="text-center">Fill in the details of your new product</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" placeholder="Enter product name" {...register("name", { required: true })}/>
              {errors.name && <span className="text-red-600/40">Product name field is required</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe your product" {...register("description", { required: true })} />
              {errors.name && <span className="text-red-600/40">Product description field is required</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" placeholder="0.00" step="0.01" min="0" {...register("price", { required: true })} />
              {errors.name && <span className="text-red-600/40">Product price field is required</span>}
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                  <SelectItem value="toys">Toys & Games</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Adding Product...
                </>
              ) : (
                "Add Product"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  )
}

