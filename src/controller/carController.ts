import { Request, Response } from "express";
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const createCar = async(req: Request, res : Response) => {
    try {
        const {nopol,merkmobil,hargaperhari} = req.body

    const car = await prisma.car.create({
        data : {
            nopol : nopol,
            merkmobil : merkmobil,
            hargaperhari : hargaperhari
        }
    })

    return res.status(200).json({
        data : {
            status : true,
            message : `Car has been created`,
            car
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

export const showCar = async (req: Request, res : Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const qty = Number(req.query.qty) || 5
        const keyword = req.query.keyword?.toString() || ""

        const car = await prisma.car.findMany({
            take : qty,
            skip : (page - 1) * qty,
            where : {
                OR : [
                    {nopol: {contains : keyword}},
                    {merkmobil: {contains : keyword}}
                ]
            },
            orderBy : {
                merkmobil : "asc"
            }
        })

        return res.status(200).json({
            status : true,
            message : `Berhasil`,
            car
        })
        
    } catch (error) {
        res.status(500).json({
            status : false,
            error
        })
    }
}

export const deleteCar = async (req : Request, res : Response) => {
    try {

        const carID = req.params.carID

        const findCar = await prisma.car.findFirst({
            where : {
                carID : Number(carID)
            },
        });

        if(!findCar){
            return res.status(400)
            .json({
                status : false,
                message : `Data ID not found`
            })
        }

        const carDelete = await prisma.car.delete({
            where : {
                carID : Number(carID)
            }
        })

        return res.status(200).json({
            status : false,
            message : `event with ID ${carDelete} has been deleted`,
            data : carDelete
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
        const {nopol,merkMobil} = req.body
        const carID = req.params.carID

        const findCar = await prisma.car.findFirst({
            where : {
                carID : Number(carID)
            },
        });

        if(!findCar){
            return res.status(400)
            .json({
                status : false,
                message : `Data event not found`
            })
        }
        
        const carUpdate = await prisma.car.update({
            where : {
                carID : Number(carID)
            },
            data : {
                nopol : nopol || findCar.nopol,
                merkmobil : merkMobil || findCar.merkmobil
            }
        })

        return res.status(200).json({
            status : true,
            message : `Data has been updated`,
            data : carID
        })

    } catch (error) {
        res.status(500).json({
            status : false,
            error
        })
    }
}