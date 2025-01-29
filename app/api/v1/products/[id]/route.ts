import { db } from "@/prisma/db";
import { ProductType } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}:{params:Promise<{id: string}>}) {
    const {id} = await params
    try {
        const getSingleProduct = await db.product.findUnique({
            where : {
                id : id
            }
        })
        return NextResponse.json({
            message: "success",
            data: getSingleProduct,
            error: null
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "success",
            data: null,
            error: "something went wrong"
        }, {
            status: 500
        })
    }
}

export async function DELETE(request:NextRequest, {params}:{params:Promise<{id: string}>}){
    try {
        const {id} = await params
        const deleteProduct = await db.product.delete({
            where : {
                id : id
            }
        })
        return NextResponse.json({
            message: "delete successful",
            data: deleteProduct,
            error: null
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "delete successful",
            data: null,
            error: "something went wrong"
        }, {
            status: 500
        })
    }
}

export async function PUT(request:NextRequest, {params}:{params:Promise<{id:string}>}){
    try {
        const newData:ProductType = await request.json()
        const {id} = await params
        const updateProduct = await db.product.update({
            where : {
                id : id
            },
            data:newData
        })
        return NextResponse.json({
            message: "product updated successfully",
            data: updateProduct,
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