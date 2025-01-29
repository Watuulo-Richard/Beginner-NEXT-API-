/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/prisma/db";
import { ProductType } from "@/types/types";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    const data:ProductType = await request.json()
    try {
        const createProduct = await db.product.create({
            data
        })
        return NextResponse.json({
            message: "product created successfully",
            data: createProduct,
            error: null
        },{
            status: 201
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "failed",
            data: null,
            error: "something went wrong"
        }, {
            status: 500
        })
    }
}

export async function GET(){
    try {
       const getAllProducts = await db.product.findMany()
       return NextResponse.json({
        message: "success",
        data: getAllProducts,
        error: null
       }, {
        status: 200
    })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "failed",
            data: null,
            error: "something went wrong"
        }, {
            status: 500
        })
    }
}