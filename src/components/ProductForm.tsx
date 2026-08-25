"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"



export default function ProductForm() {
    //Product name
    const [name, setName] = useState("");
    //Product description
    const [description, setDesciption] = useState("");
    //Product price
    const [price, setPrice] = useState("");


    //This is where submission handle form
    async function handleSumbit(event: FormEvent<HTMLFormElement>)
    {
        //Prevent the browser from refreshing page
       event.preventDefault(); 

       //send product imformation to out API which I created in the app/api/products
       const response = await fetch("/api/products",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                description,
                price: Number(price),
            }),
        });
        if (response.ok) {
            setName("");
            setDesciption("");
            setPrice("");

           toast.add({
            title: "success",
            description: "Product Created",
            });

        } else {
             toast.add({
            type: "error",
            description: "The product could not be created.",
            priority: "high",
          });
        }
    }

    return(
        <div className="max-w-xl">
            <h1 className="mb-6 text-3xl font-bold">
                Create Product
            </h1>

            {/* Product form */}
            <form onSubmit={handleSumbit} className="space-y-5 rounded-lg border p-6 shadow-sm">
                
                {/* ========================= */}
                {/* PRODUCT NAME */}
                {/* ========================= */}

                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">Product Name <span className="text-red-500">*</span></label>

    
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Enter a product name"
                    className="w-full rounded-md border border-gray-300 p-2"
                    required/>
                 </div>


                {/* ========================= */}
                {/* DESCRIPTION */}
                {/* ========================= */}

                <div className="space-y-2">
                    <label htmlFor="description"
                    className="block text-sm fornt-medium">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea id="desciptuion"
                    value={description}
                    onChange={(e) => setDesciption(e.target.value)}
                    placeholder="Enter a product description"
                    rows={4}
                    className="w-full rounded-md border border-gray-300 p-2"
                    required/>
                </div>

                {/* ========================= */}
                {/* PRICE */}
                {/* ========================= */} 
                  <div className="space-y-2">
                    <label
                        htmlFor="price"
                        className="block text-sm font-medium"
                    >
                        Price
                    </label>

                    <input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter product price"
                        className="w-full rounded-md border border-gray-300 p-2"
                        min="0"
                        step="0.01"
                        required
                    />
                    </div>
                {/* ========================= */}
                {/* SUBMIT BUTTON */}
                {/* ========================= */}

               <Button
                    type="submit"
                    variant="outline"
                    className="hover:text-gray-500"
                >
                    Create Product
                </Button>


            </form>
        </div>
    )

}