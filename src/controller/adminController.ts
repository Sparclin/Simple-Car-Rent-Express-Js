import e, { Request, Response } from "express";
import {PrismaClient} from '@prisma/client';
import md5 from "md5";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

export const createAdmin = async(req: Request, res : Response) => {
    try {
        const {namaAdmin,email } = req.body;
        const password = md5(req.body);

    const admin = await prisma.admin.create({
        data : {
            namaAdmin,
            email,
            password
        }
    })

    return res.status(200).json({
        data : {
            status : true,
            message : `Admin has been created`,
            admin
        }
    })

    } catch (error) {
        return res.status(500)
        .json({
            status : false,
            error
        })
    }
}

export const showAdmin = async (req: Request, res : Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const qty = Number(req.query.qty) || 5
        const keyword = req.query.keyword?.toString() || ""

        const admin = await prisma.admin.findMany({
            take : qty,
            skip : (page - 1) * qty,
            where : {
                OR : [
                    {namaAdmin: {contains : keyword}},
                    {email: {contains : keyword}}
                ]
            },
            orderBy : {
                namaAdmin : "asc"
            }
        })

        return res.status(200).json({
            status : true,
            message : `Berhasil`,
            admin
        })
        
    } catch (error) {
        res.status(500).json({
            status : false,
            error
        })
    }
}

export const deleteAdmin = async (req : Request, res : Response) => {
    try {

        const adminID = req.params.adminID

        const findAdmins = await prisma.admin.findFirst({
            where : {
                adminID : Number(adminID)
            },
        });

        if(!findAdmins){
            return res.status(400)
            .json({
                status : false,
                message : `Data ID not found`
            })
        }

        const adminDelete = await prisma.admin.delete({
            where : {
                adminID : Number(adminID)
            }
        })

        return res.status(200).json({
            status : false,
            message : `event with ID ${adminDelete} has been deleted`,
            data : adminDelete
        })

    } catch (error){
        res.status(500).json({
            status : false,
            error
        })
    }
}

export const updateAdmin = async  (req : Request, res : Response) => {
    try {

        const {namaAdmin, email} = req.body
        const password = md5(req.body.password);

        const adminID = req.params.adminID

        const findAdmins = await prisma.admin.findFirst({
            where : {
                adminID : Number(adminID)
            },
        });

        if(!findAdmins){
            return res.status(400)
            .json({
                status : false,
                message : `Data event not found`
            })
        }
        
        const adminUpdate = await prisma.admin.update({
            where : {
                adminID : Number(adminID)
            },
            data : {
                namaAdmin : namaAdmin || findAdmins.namaAdmin,
                email : email || findAdmins.email,
                password : password || findAdmins.email
            }
        })

        return res.status(200).json({
            status : true,
            message : `Data has been updated`,
            data : adminUpdate
        })

    } catch (error) {
        res.status(500).json({
            status : false,
            error
        })
    }
}

export const loginAdmin = async(req:Request, res:Response) => {
    try {
        const email = req.body.email
        const password = md5(req.body)

        const admin = await prisma.admin.findFirst({
            where : {
                email : email,
                password : password
            }
        })

        if(admin){
            const payload = admin
            const secretKey = "bakso"
            const token = sign(payload,secretKey)

            return res.status(200)
            .json({
                status : true,
                message : `Login success`,
                token : token
            })
            
        }else{
            return res.status(200)
            .json({
                status : false,
                message : `ID Not found`
            })  
        }

    } catch (error) {
        res.status(500).json({
            status : false,
            error
        })
    }
}